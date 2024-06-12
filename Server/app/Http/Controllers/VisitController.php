<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function index()
    {
        // Retrieve all visits with related information
        $visits = Visit::with(['doctors', 'user', 'location'])->get();

        // Transform data to get the required fields
        $result = $visits->map(function ($visit) {
            return [
                'visit_date' => $visit->visit_date,
                'territory' => $visit->location->territory ?? null,
                'status' => $visit->status,
                'user_full_name' => $visit->user->first_name . ' ' . $visit->user->last_name,
                'doctors' => $visit->doctors->map(function ($doctor) {
                    return [
                        'doctor_name' => $doctor->first_name . ' ' . $doctor->last_name,
                    ];
                }),
                // Assuming you need to manually fetch tools related to doctors
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
}
