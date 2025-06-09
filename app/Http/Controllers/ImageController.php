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

        return Inertia::render('images/index', ['images' => $images, 'orderid' => $query]);
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
                    $path = public_path('storage/uploads');
                    // $path = $imageFile->storeAs('public/uploads', $filename); // Store in storage/app/public/uploads
                    $imageFile->move($storePath, $filename);
                    $image = Image::create([
                        'order_id' => $request->order_id, // If images belong to a product
                        'filename' => $filename,
                        'path' => 'storage/ordens/'
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
}
