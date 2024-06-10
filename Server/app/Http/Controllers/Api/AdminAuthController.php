<?php

namespace App\Http\Controllers\Api;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
                'phone_number' => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
                'territory' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
                'email' => ['required',
                          'email',
                          'unique:admins',
                          'email',
                          'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
                'password' => 'required|min:8'
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
            // Validate the request data
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string|min:8'
            ]);
    
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
    
            // Find the admin user
            $admin = Admin::where('email', $request->email)->first();
    
            if (!$admin || !Hash::check($request->password, $admin->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }
    
            // Retrieve API token from the database
            $token = $admin->api_token;
    
            return response()->json([
                'status' => true,
                'message' => 'Admin Logged in Successfully',
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
    
}
