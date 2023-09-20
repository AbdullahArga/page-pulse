<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RoleController;
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

Route::post('login', [AuthenticatedSessionController::class, 'login']);
Route::post('register', [AuthenticatedSessionController::class, 'register']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('articles/{article}/show', [ArticleController::class, 'view']);
    Route::get('articles/active', [ArticleController::class, 'allActiveArticle']);
    Route::get('abilities', [UserController::class, 'abilities'])->middleware('auth:sanctum');
    Route::apiResource('users', UserController::class);
    Route::post('articles/{article}/comment', [CommentController::class, 'store']);
    Route::post('articles/{article}/active', [ArticleController::class, 'active'])->middleware('permission:active_article');
    Route::post('articles/{article}/inactive', [ArticleController::class, 'inactive'])->middleware('permission:active_article');
    Route::apiResource('articles', ArticleController::class);
});
Route::get('roles', [RoleController::class, 'index']);
