<?php

use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\ForgotPasswordAdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordAdminController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// routes/api.php



Route::prefix('admin')->group(function () {
    Route::post('register', [AdminAuthController::class, 'createAdmin']);
    Route::post('login', [AdminAuthController::class, 'loginAdmin']);
    
    Route::get('password/reset',[ForgotPasswordAdminController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('password/email', [ForgotPasswordAdminController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('password/reset/{token}', [ResetPasswordAdminController::class, 'showResetForm'])->name('password.update');
    Route::post('password/reset', [ResetPasswordAdminController::class, 'reset'])->name('password.reset');

});

Route::prefix('user')->group(function () {
    Route::post('register', [UserAuthController::class, 'createUser']);
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
});
