<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Other;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OtherController extends Controller
{
    public function index()
    {
        if (Other::get()->isEmpty()) {
            Other::create(['id' => '1']);
        }
        $query = Other::orderBy("id", "DESC")->first();
        $othersettings = Other::where("id", $query->id)->first();
        $customers = Customer::get(["id", "name", "cpf", "email"]);
        $orders = Order::get();
        $company = Company::first();
        return Inertia::render('others/index', ['othersettings' => $othersettings, 'company' => $company, 'customers' => $customers, 'orders' => $orders]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Other $other): RedirectResponse
    {
        $data = $request->all();
        $other->update($data);
        return redirect()->route('other-settings.index', ['other' => $other->id])->with('success', 'Configurações alteradas com sucesso');
    }
}
