<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ToolController extends Controller
{
    /**
     * Display a listing of the tools.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tools = Tool::all();
        return response()->json($tools);
     }

    
    public function getadmintools()
    {
       // Get all tools
       $admin = Auth::guard('sanctum')->user();       
       $tools = Tool::where('admin_id', $admin->id)->get();
       return response()->json($tools);
    }


    /**
     * Store a newly created tool in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:255',
        ]);
    
        
        $admin = Auth::guard('sanctum')->user();
    
        // Create the tool record
        $tool = Tool::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'type' => $validatedData['type'],
        ]);
    
        return response()->json([
            'status' => true,
            'message' => 'Tool Created Successfully',
            'tool' => $tool,
        ], 200);
    }
    
    /**
     * Update the specified tool in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|string|max:255',
        ]);
    
        // Retrieve the authenticated admin user
        $admin = Auth::guard('sanctum')->user();
    
        // Find the tool by ID and admin_id
        $tool = Tool::where('id', $id);
    
        // Update the tool with validated data
        $tool->update($validatedData);
    
        // Return success response
        return response()->json([
            'status' => true,
            'message' => 'Tool updated successfully',
            'tool' => $tool,
        ], 200);
    }
       
    
    /**
     * Remove the specified tool from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {


        $admin = Auth::guard('sanctum')->user();
        $tool = Tool::where('id', $id);

        // $tool = Tool::where('id', $id)->where('admin_id', $admin->id)->first();
        $tool = Tool::where('id', $id);

        // Check if the user exists
        if (!$tool) {
        // Return a JSON response indicating the tool has already been deleted
        return response()->json(['message' => 'tool has already been deleted'], 200);
    }
        // Delete the user
        $tool->delete();
        // Return a JSON response with a success message
        return response()->json(['message' => 'tool has been deleted successfully'], 200);
    
    




    }
}

