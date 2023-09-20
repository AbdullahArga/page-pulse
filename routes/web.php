<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::post('login', [AuthenticatedSessionController::class, 'login']);
// Route::post('register', [AuthenticatedSessionController::class, 'register']);
// Route::post('logout', [AuthenticatedSessionController::class, 'logout']);
Route::get('{any?}', function () {
    return view('application');
})->where('any', '.*');

// Auth::routes();
