<?php

use App\Http\Controllers\Api\SalesController;
use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\ForgotPasswordAdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordAdminController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\UserController;



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
    
/*     Route::get('password/reset',[ForgotPasswordAdminController::class, 'showLinkRequestForm'])->name('password.request');
 */    Route::post('password/email', [ForgotPasswordAdminController::class, 'sendResetLinkEmail'])->name('password.email');
/*     Route::get('password/reset/{token}', [ResetPasswordAdminController::class, 'showResetForm'])->name('password.update');*/ 
       Route::post('password/reset/{token}', [ResetPasswordAdminController::class, 'reset'])->name('password.reset');
    
       Route::apiResource('sales', SalesController::class);
       Route::get('users/{user}/sales', [SalesController::class,'user_sales']);
       Route::middleware('auth:api')->get('/me', [AdminAuthController::class, 'me']);


});

Route::prefix('user')->group(function () {
    Route::post('register', [UserAuthController::class, 'createUser']);
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
});

// Crud operations
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // GET /api/users
    Route::post('/', [UserController::class, 'store']);        // POST /api/users
    Route::get('/{id}', [UserController::class, 'show']);      // GET /api/users/{id}
    Route::put('/{id}', [UserController::class, 'update']);    // PUT /api/users/{id}
    Route::delete('/{id}', [UserController::class, 'destroy']); // DELETE /api/users/{id}
});
