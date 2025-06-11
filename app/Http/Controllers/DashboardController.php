<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Message;
use App\Models\Order;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $endDate = Carbon::now()->subDays(30)->endOfDay();
        $startDate = Carbon::now()->subDays(32)->startOfDay();
        // $ordensDeServico = Order::where('service_status', 8)
        //     ->whereBetween('delivery_date', [$startDate, $endDate])
        //     ->get();

        $acount = [
            'numuser' => count(User::get()),
            'numcust' => count(Customer::get()),
            'numorde' => count(Order::get()),
            'numshed' => count(Schedule::get()),
            'nummess' => count(Message::get()),
        ];
        $orders = [
            'agendados' => Schedule::where('status', 1)->get('id'),
            'gerados'    => Order::where('service_status', 3)->get('id'),
            'aprovados'  => Order::where('service_status', 4)->get('id'),
            'concluidosca' => Order::where('service_status', 6)->get('id'),
            'concluidoscn' => Order::where('service_status', 7)->get('id'),
            'trintadias' => Order::where('service_status', 8)
                ->whereBetween('delivery_date', [$startDate, $endDate])
                ->get('id')
        ];
        $dailyCounts = DB::table('orders')->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(CASE WHEN equipment_id =\'1\' THEN 1 ELSE 0 END) as mobile_count'), DB::raw('SUM(CASE WHEN equipment_id =\'3\' THEN 1 ELSE 0 END) as desktop_count'))->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year)->groupBy(DB::raw('DATE(created_at)'))->orderBy(DB::raw('DATE(created_at)'), 'ASC')->get();
        $datajson = response()->json($dailyCounts);
        return Inertia::render('dashboard/index', ['orders' => $orders, 'acount' => $acount, 'datajson' => $datajson]);
    }
}
