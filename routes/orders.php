<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('orders/feedback', [OrderController::class, 'getFeedback'])->name('orders.feedback');
    Route::resource('orders', OrderController::class);
});
