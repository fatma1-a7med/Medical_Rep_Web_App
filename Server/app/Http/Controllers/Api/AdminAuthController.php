<?php

namespace App\Http\Controllers\Api;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    /**
     * Create Admin User
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createAdmin(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'first_name' => 'required',
                'last_name' => 'required',
                'state' => 'required',
                'city' => 'required',
                'street' => 'required',
                'phone_number' => 'required',
                'territory' => 'required',
                'image' => 'required',
                'email' => 'required|email|unique:admins,email',
                'password' => 'required|min:3'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $imagePath = $request->file('image')->store('public/images');

            $admin = Admin::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'state' => $request->state,
                'city' => $request->city,
                'street' => $request->street,
                'phone_number' => $request->phone_number,
                'territory' => $request->territory,
                'image' => $imagePath,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $admin->createToken("API TOKEN")->plainTextToken;
            $admin->remember_token = $token;
            $admin->save();

            return response()->json([
                'status' => true,
                'message' => 'Admin User Created Successfully',
                'admin' => $admin,
                'token' => $token
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Admin User Login
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function loginAdmin(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
    
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
    
            $admin = Admin::where('email', $request->email)->first();
    
            if (!$admin || !Hash::check($request->password, $admin->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password do not match with our records.'
                ], 401);
            }
    
            // Retrieve the token from the database
            $token = $admin->remember_token;
    
            return response()->json([
                'status' => true,
                'message' => 'Admin User Logged In Successfully',
                'token' => $token,
                'admin' => $admin
            ], 200);
    
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function me(Request $request)
{
  // Retrieve the authenticated admin
  $admin = $request->user();

  // Return the admin data in the response
  return response()->json([
      'status' => true,
      'admin' => $admin
  ], 200);
  }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function getLoggedInAdmin(Request $request)
    {
        return $request->user(); // Returns the authenticated admin details
    }
    
}
