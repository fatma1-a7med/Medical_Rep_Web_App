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
use App\Http\Controllers\Api\LoctionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\Users_Controllers\UserVisitController;
use App\Http\Controllers\VisitReportingController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\Users_Controllers\LocationController;

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





Route::prefix('admin')->group(function () {
    Route::post('register', [AdminAuthController::class, 'createAdmin']);
    Route::post('login', [AdminAuthController::class, 'loginAdmin'])->name('loginAdmin');
    Route::post('password/email', [ForgotPasswordAdminController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('password/reset/{token}', [ResetPasswordAdminController::class, 'reset'])->name('password.reset');
    
    Route::apiResource('sales', SalesController::class);
    Route::get('users/{user}/sales', [SalesController::class,'user_sales']);
    Route::get('me', [AdminAuthController::class, 'me']);
      
    Route::middleware('auth:sanctum')->post('logout', [AdminAuthController::class, 'logout']);

    //admin visit routes
    Route::get('visits', [VisitController::class, 'index']);
    Route::get('/visit/{id}', [VisitController::class, 'getVisitInformationById']);
    Route::get('visits/searchByUsername/{username}', [VisitController :: class, 'searchByUsername' ]);
    Route::get('visits/searchByDateRange/{startDate}/{endDate}', [VisitController::class, 'searchByDateRange']);

    //admin location tracking
    Route::get('/location',[LoctionController::class,'index']);
    Route::get('visits/history/{user_id}', [VisitController::class, 'getVisitHistory']);
    Route::get('visits/planned/{user_id}', [VisitController::class, 'getPlannedVisits']);
    Route::get('/visits/recent', [VisitController::class, 'recent']);
});

Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::apiResource('sales', SalesController::class);
    
    Route::get('visits', [UserVisitController::class, 'index']);
    Route::get('visits/{id}', [UserVisitController::class, 'show']);
    Route::post('visits', [UserVisitController::class, 'store']);
    Route::put('visits/{id}', [UserVisitController::class, 'update']);
    Route::delete('visits/{id}', [UserVisitController::class, 'delete']);
    Route::get('locations' , [LocationController::class ,'index']);
    
});

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // GET /api/users
    Route::post('/', [UserController::class, 'store']);        // POST /api/users
    Route::get('/{id}', [UserController::class, 'show']);      // GET /api/users/{id}
    Route::put('/{id}', [UserController::class, 'update']);    // PUT /api/users/{id}
    Route::delete('/{id}', [UserController::class, 'destroy']); // DELETE /api/users/{id}

   
});

// visit reporting
Route::get('/visit-reports', [VisitReportingController::class, 'getVisitReports']);

Route::get('/doctors', [DoctorController::class, 'index']);


