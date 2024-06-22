<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\Doctor;
use App\Models\Tool;

class UserVisitController extends Controller
{
    public function index()
    {
        $visits = Visit::with(['doctor', 'tools', 'user'])->get();
        return response()->json($visits);
    }

    public function show($id)
    {
        $visit = Visit::with(['doctor', 'tools', 'user'])->find($id);
        if ($visit) {
            return response()->json($visit);
        } else {
            return response()->json(['message' => 'Visit not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'doctor_id' => 'required|integer',
            'tools' => 'required|array',
            'tools.*' => 'integer', // Assuming tools are sent as an array of tool IDs
        ]);

        $visit = Visit::create($validatedData);
        $visit->tools()->attach($request->tools);
        return response()->json($visit->load('doctor', 'tools', 'user'), 201);
    }

    public function update(Request $request, $id)
    {
        $visit = Visit::findOrFail($id);
        $validatedData = $request->validate([
            'user_id' => 'integer',
            'doctor_id' => 'integer',
            'tools' => 'array',
            'tools.*' => 'integer',
        ]);

        $visit->update($validatedData);
        if ($request->has('tools')) {
            $visit->tools()->sync($request->tools);
        }
        return response()->json($visit->load('doctor', 'tools', 'user'), 200);
    }

    public function delete($id)
    {
        $visit = Visit::findOrFail($id);
        $visit->delete();

        return response()->json(null, 204);
    }
}
