<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Show the user profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User profile not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Show the user profile by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $user = Auth::user(); // Get the authenticated admin

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'user profile not found'
            ], 404);
        }

        return response()->json($user);
    }


    /**
     * Update the user profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        // Fetch the authenticated user
        $user = Auth::user();

        // Check if user exists
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User profile not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'state' => 'string|max:255',
            'city' => 'string|max:255',
            'street' => 'string|max:255',
            'phone_number' => 'string|max:255',
            'territory' => 'string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender' => 'string|max:255',
            'birthDate' => 'date',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
        ]);

        // If validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 400);
        }

        // Initialize validated data
        $validatedData = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Get the uploaded image file
            $image = $request->file('image');

            // Generate a unique name for the image
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Store the image file in the public/images directory
            $image->move(public_path('images'), $imageName);

            // Store the image path in the validated data array
            $validatedData['image'] = $imageName;

            // Delete the old image if it exists
            if ($user->image) {
                $oldImagePath = public_path('images/' . $user->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
        }

        // Update the user profile with the validated data
        $user->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }
}
