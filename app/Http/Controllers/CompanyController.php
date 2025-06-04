<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Company $empresa)
    {
        if (Company::get()->isEmpty()) {
            Company::create();
        }
        $query = Company::orderBy("id", "DESC")->first();
        $empresa = Company::where("id", $query->id)->first();

        return Inertia::render('company/index', ["empresa" => $empresa]);
    }

    /**
     * Display the specified resource.
     */
    public function update(Request $request, Company $empresa): RedirectResponse
    {
        $data = $request->all();
        $storePath = public_path('storage/images');
        if ($request->hasfile('logo')) {
            $fileName = time() . '.' . $request->logo->extension();
            $request->logo->move($storePath, $fileName);
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $empresa->logo && $empresa->logo)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $empresa->logo);
            }
        }
        $data['logo'] = $request->hasfile('logo') ? $fileName : $empresa->logo;
        $empresa->update($data);
        return redirect()->route('company.index')->with('success', 'Dados da empresa alterados com sucesso!');
    }
}
