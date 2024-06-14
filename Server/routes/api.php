<?php

use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\ForgotPasswordAdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordAdminController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;

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
    Route::get('visits', [VisitController::class, 'index']);
    Route::get('/visit/{id}', [VisitController::class, 'getVisitInformationById']);
    Route::get('visits/searchByUsername/{firstName}/{lastName}', [VisitController::class, 'searchByUserName']);
    Route::get('visits/searchByDateRange/{startDate}/{endDate}', [VisitController::class, 'searchByDateRange']);
});

Route::prefix('user')->group(function () {
    Route::post('register', [UserAuthController::class, 'createUser']);
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
});

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // GET /api/users
    Route::post('/', [UserController::class, 'store']);        // POST /api/users
    Route::get('/{id}', [UserController::class, 'show']);      // GET /api/users/{id}
    Route::put('/{id}', [UserController::class, 'update']);    // PUT /api/users/{id}
    Route::delete('/{id}', [UserController::class, 'destroy']); // DELETE /api/users/{id}
});

//activity track


Route::get('visits/history/{med_id}', [VisitController::class, 'getVisitHistory']);
Route::get('visits/planned/{med_id}', [VisitController::class, 'getPlannedVisits']);
Route::get('/visits', [VisitController::class, 'index']);
Route::get('/visits/recent', [VisitController::class, 'recent']);