<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visit; 
class UserVisitController extends Controller
{
    public function index()
{
    $visits = Visit::with(['doctors.tools', 'user'])->get();

    $result = $visits->map(function ($visit) {
        return [
            'id' => $visit->id,
            'visit_date' => $visit->visit_date,
            'status' => $visit->status,
            'doctor' => $visit->doctors->map(function ($doctor) {
                return [
                    'doctor_name' => $doctor->first_name . ' ' . $doctor->last_name,
                    'city' => $doctor->city,
                    'state' => $doctor->state,
                    'street' => $doctor->street,
                ];
            }),
            'tools' => $visit->doctors->flatMap(function ($doctor) {
                return $doctor->tools->map(function ($tool) {
                    return [
                        'tool_name' => $tool->name,
                    ];
                });
            }),
        ];
    });

    return response()->json($result);
}

    public function show($id)
    {
        return Visit::find($id);
    }

    public function store(Request $request)
    {
        $visit = Visit::create($request->all());
        return response()->json($visit, 201);
    }

    public function update(Request $request, $id)
    {
        $visit = Visit::findOrFail($id);
        $visit->update($request->all());
        return response()->json($visit, 200);
    }

    public function delete($id)
    {
        Visit::findOrFail($id)->delete();
        
        return response()->json(null, 204);
    }
}
