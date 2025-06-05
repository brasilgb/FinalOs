<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Receipt $receipt)
    {
        if (Receipt::get()->isEmpty()) {
            Receipt::create();
        }
        $query = Receipt::orderBy("id", "DESC")->first();
        $receipt = Receipt::where("id", $query->id)->first();

        return Inertia::render('receipts/index', ["receipt" => $receipt]);
    }

    public function update(Request $request, Receipt $receipt): RedirectResponse
    {
        $data = $request->all();
        $receipt->update($data);
        return redirect()->route('receipts.index', ['receipts' => $receipt->id])->with('success', 'Recibos editadas com sucesso');
    }
}
