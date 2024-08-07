<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Api\AdminProfileController;
use App\Http\Controllers\Api\SalesController;
use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\ForgotPasswordAdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordAdminController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ToolController;
use App\Http\Controllers\Users_Controllers\UserVisitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\LoctionController;
use App\Http\Controllers\doctorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\VisitReportingController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\MailController;
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
Route::middleware('auth:api')->get('/admin', function (Request $request) {
    return $request->user(); // This will return the authenticated admin details
});

// Route::get('/admin/visits', [VisitController::class, 'index']);

Route::prefix('admin')->group(function () {
    Route::post('register', [AdminAuthController::class, 'createAdmin']);
    Route::post('login', [AdminAuthController::class, 'loginAdmin'])->name('loginAdmin');
    Route::post('password/email', [ForgotPasswordAdminController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('password/reset/{token}', [ResetPasswordAdminController::class, 'reset'])->name('password.reset');
    
      //visits
    //   Route::get('visits', [VisitController::class, 'index']);
      Route::get('/visit/{id}', [VisitController::class, 'getVisitInformationById']);
      Route::get('visits/searchByUsername/{username}', [VisitController :: class, 'searchByUsername' ]);
      Route::get('visits/searchByDateRange/{startDate}/{endDate}', [VisitController::class, 'searchByDateRange']); 
      Route::get('/states', [AddressController::class, 'getStates']);
      Route::get('/cities/{stateId}', [AddressController::class, 'getCities']);
  
  
  
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::post('logout', [AdminAuthController::class, 'logout']);
        Route::get('logged-in-admin', [AdminAuthController::class, 'getLoggedInAdmin']);

        //sales
        Route::apiResource('sales', SalesController::class);
        Route::get('sales/user-info/{userId}', [SalesController::class,'getUserInfo']);
        Route::get('users/{user}/sales', [SalesController::class,'user_sales']);
        Route::get('{adminId}/users', [SalesController::class,'getUsers']);

        Route::get('visits', [VisitController::class, 'index']);

        

    });

    
    //tools
    Route::get('tools' , [ToolController::class , 'index']);
    Route::post('addTool' , [ToolController::class , 'store']);
    Route::put('updateTool/{id}' , [ToolController::class , 'update']);
    Route::delete('deleteTool/{id}' , [ToolController::class , 'destroy']);
   
   

    //admin location tracking
    Route::get('/location',[LoctionController::class,'index']);
    Route::post('/location', [LoctionController::class, 'store']);



    
    Route::get('visits/history/{user_id}', [VisitController::class, 'getVisitHistory']);
    Route::get('visits/planned/{user_id}', [VisitController::class, 'getPlannedVisits']);
   
    Route::get('/visits/recent', [VisitController::class, 'recent']);



           // Admin profile
    Route::middleware('auth:sanctum')->group(function () {
            // Route::get('/profile', [AdminProfileController::class, 'index']);
     Route::get('/profile/show', [AdminProfileController::class, 'show']);
     Route::post('/profile/update', [AdminProfileController::class, 'update']);
        });

    // Route::get('/profile/check-email', 'AdminProfileController@checkEmail');

   
});

Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'loginUser']);
    Route::middleware('auth:sanctum')->get('info',[UserAuthController::class, 'getUserId']);
    Route::middleware('auth:sanctum')->get('UserInfo',[UserAuthController::class, 'getUser']);
    Route::middleware('auth:sanctum')->post('/logout', [UserAuthController::class, 'logoutUser']);
    Route::middleware('auth:sanctum')->get('/sales', [\App\Http\Controllers\Users_Controllers\salesController::class, 'index']);
    Route::middleware('auth:sanctum')->get('/sales/{id}', [\App\Http\Controllers\Users_Controllers\salesController::class, 'show']);
 

    //doctor Routes
    Route::post('add-doctor', [doctorController:: class, 'AddDoctor']);
    Route::middleware('auth:sanctum')->get('get-all-doctors', [doctorController:: class, 'gettAllDoctors']);
    Route::get('get-doctors', [doctorController:: class, 'getDoctors']);
    Route::get('get-doctor-byId/{id}', [doctorController:: class, 'show']);
    Route::delete('delete-doctor-byId/{id}', [doctorController:: class, 'destroy']);
    Route::put('update-doctor-byId/{id}', [doctorController:: class, 'update']);
    Route::get('search/{username}', [doctorController:: class, 'search']);

    Route::middleware('auth:sanctum')->get('visits/latest-visits', [VisitController::class, 'latestVisits']); 


    Route::middleware('auth:sanctum')->get('visits', [UserVisitController::class, 'index']);
    Route::middleware('auth:sanctum')->get('visits/{id}', [UserVisitController::class, 'show']);
    Route::middleware('auth:sanctum')->post('visits', [UserVisitController::class, 'store']);
    Route::middleware('auth:sanctum')->put('visits/{id}', [UserVisitController::class, 'update']);
    Route::middleware('auth:sanctum')->delete('visits/{id}', [UserVisitController::class, 'delete']);
    

    Route::get('tools' , [ToolsController::class , 'index']);
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // GET /api/users
    Route::post('/', [UserController::class, 'store']);        // POST /api/users
    Route::get('/{id}', [UserController::class, 'show']);      // GET /api/users/{id}
    Route::put('/{id}', [UserController::class, 'update']);    // PUT /api/users/{id}
    Route::delete('/{id}', [UserController::class, 'destroy']); // DELETE /api/users/{id}
});

// visit reporting
Route::get('/visit-reports', [VisitReportingController::class, 'getVisitReports']);


    //    // Admin profile
    //    Route::middleware('auth:sanctum')->group(function () {
    //     // Route::get('/profile', [AdminProfileController::class, 'index']);
    //     Route::get('/profile/show', [AdminProfileController::class, 'show']);
    //     Route::post('/profile/update', [AdminProfileController::class, 'update']);
    // });


Route::prefix('user')->group(function () {
    Route::post('register', [UserAuthController::class, 'createUser']);
    Route::post('login', [UserAuthController::class, 'loginUser']);

     // User Password Reset Routes
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('user.password.email');
    Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('user.password.reset');
     
    Route::middleware('auth:sanctum')->group(function () {
        // Route::get('/user/profile', [UserProfileController::class, 'index']);
        Route::get('/profile/show', [UserProfileController::class, 'show']);
        Route::post('/profile/update', [UserProfileController::class, 'update']);
    });
    Route::post('/send-email', [MailController::class, 'sendEmail']);

});



