<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\GeralController;
use App\Http\Controllers\ImagemController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\OrcamentoController;
use App\Http\Controllers\OrdemController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/ordercli/{customer}', [OrdemController::class, 'getOrderCli'])->name('ordercli');
Route::get('/allorder', [OrdemController::class, 'allOrder'])->name('allrder');
Route::get('/order/{order}', [OrdemController::class, 'getOrder'])->name('order');

Route::get('/clientes', [ClienteController::class, 'getClientes']);

Route::post('/orcamentos', [OrcamentoController::class, 'getOrcamentos']);

Route::post('/servicos', [ServicoController::class, 'getServicos']);

Route::get('/marcas', [MarcaController::class, 'getMarcas']);

Route::post('/modelos', [ModeloController::class, 'getModelos']);

Route::get('/empresa', [EmpresaController::class, 'getEmpresaInfo']);

Route::delete('/deleteimage/{image}', [ImagemController::class, 'deleteImageOrder'])->name('deleteimage');
Route::get('/images/{order}', [ImagemController::class, 'getImages'])->name('images');
Route::post('/upload', [ImagemController::class, 'upload'])->name('upload');

Route::post('/loginuser', [UserController::class, 'loginuser'])->name('loginuser');
Route::get('/logoutuser', [UserController::class, 'logoutuser'])->name('logoutuser');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
