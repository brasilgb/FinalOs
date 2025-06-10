<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Image; // Assuming you have an Image model
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('or');

        $images = Image::where("order_id", $query)->get();

        return Inertia::render('images/index', ['savedimages' => $images, 'orderid' => $query]);
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);

        $uploadedImages = [];

        try {
            $storePath = public_path('storage/orders/' . $request->order_id);
            if (!file_exists($storePath)) {
                mkdir($storePath, 0777, true);
            };
            if ($request->images) {
                foreach ($request->images as $imageFile) {
                    $filename = uniqid() . '.' . $imageFile->getClientOriginalExtension();
                    $imageFile->move($storePath, $filename);
                    $image = Image::create([
                        'order_id' => $request->order_id, // If images belong to a product
                        'filename' => $filename,
                        'path' => 'storage/orders/' . $request->order_id
                    ]);
                    // dd($image);
                    $uploadedImages[] = $image;
                }
            }
            return redirect()->back()->with('message', 'Imagens enviadas com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao enviar imagens: ' . $e->getMessage());
        }
    }

    public function destroy(Image $image)
    {
        $storePath = public_path('storage/orders/' . $image->order_id);
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $image->filename)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $image->filename);
        }
        $image->delete();
        return redirect()->back()->with('success', 'Imagem excluida com sucesso!');
    }
}
