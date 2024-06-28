<?php
// AdminProfileController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;

class AdminProfileController extends Controller
{
    public function __construct()
    {
        // Apply the auth:sanctum middleware to all routes in this controller
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $admin = Auth::user(); // Get the authenticated admin

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }

    public function show()
    {
        $admin = Auth::user(); // Get the authenticated admin

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        return response()->json($admin);
    }

    public function update(Request $request)
    {
        $admin = Auth::user(); // Get the authenticated admin

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        // Validation rules
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'territory' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 400);
        }

        $validatedData = $request->all();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $validatedData['image'] = $imageName;

            if ($admin->image) {
                $oldImagePath = public_path($admin->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
        }

        $admin->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }

//     public function checkEmail(Request $request)
// {
//     $email = $request->query('email');
//     $exists = Admin::where('email', $email)->exists();

//     return response()->json(['exists' => $exists]);
// }

}
