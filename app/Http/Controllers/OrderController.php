<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $sdate = $request->get('dt');
        $status = $request->get('st');

        $query = Order::orderBy('id', 'DESC');
        if ($sdate) {
            $query->whereDate('schedules', $sdate);
        }
        if ($status) {
            $query->where('service_status', 'like', "%$status%");
        }
        if ($search) {
            $query = Order::where(function ($query) use ($search) {
                $query->where('id', 'like', '%' . $search . '%');
            })
                ->orWhereHas('customer', function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('cpf', 'like', '%' . $search . '%');
                });
        }
        $orders = $query->with('customer')->paginate(12);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::get();
        return Inertia::render('orders/create-order', ['customers' => $customers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['id'] = Order::exists() ? Order::latest()->first()->id + 1 : 1;
        Order::create($data);
        return redirect()->route('orders.index')->with('success',  'Ordem cadastrada com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $technicals = User::where('roles', 'tech')->orWhere('roles', 'admin')->where('is_active', 1)->get();
        return Inertia::render('orders/edit-order', ['order' => $order]);
     }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return redirect()->route('orders.show', ['order' => $order->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, Order $order): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $order->update($data);
        return redirect()->route('orders.index')->with('success', 'Ordem atualizada com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Order $order)
    {
        $data = $request->all();
        $order->delete($data);
        return redirect()->route('orders.index')->with('success', 'Ordem excluída com sucesso');
    }
}
