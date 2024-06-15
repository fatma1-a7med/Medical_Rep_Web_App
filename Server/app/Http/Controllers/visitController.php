<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function index()
    {
        $visits = Visit::with(['doctors', 'user', 'location'])->get();

        $result = $visits->map(function ($visit) {
            return [
                'visit_date' => $visit->visit_date,
                'territory' => $visit->location->territory ?? null,
                'status' => $visit->status,
                'medical_rep_fulname' => $visit->user->first_name . ' ' . $visit->user->last_name,
                'doctor' => $visit->doctors->map(function ($doctor) {
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

    function getVisitInformationById($id) {
        $visit = Visit::with(['doctors', 'location', 'user'])->find($id);
    
        if (!$visit) {
            return response()->json(['message' => 'Visit not found'], 404);
        }
        if ($visit->doctors->isEmpty()) {
            return response()->json(['message' => 'No doctors associated with this visit'], 404);
        }
        $doctorName = $visit->doctors->first()->first_name . ' ' . $visit->doctors->first()->last_name;
        $territory = $visit->doctors->first()->territory;
        $city = $visit->doctors->first()->city;
        $state = $visit->doctors->first()->state;
        $locationInfo = $visit->location;
        $userFullName = $visit->user->first_name . ' ' . $visit->user->last_name;
    
        $visitInformation = [
            'doctor_name' => $doctorName,
            'territory' => $territory,
            'city' => $city,
            'state' => $state,
            'location_info' => $locationInfo,
            'user_full_name' => $userFullName,
        ];
    
        return $visitInformation;
    }

    public function searchByUserName(Request $request, $firstName, $lastName)
    {

        $query = Visit::with(['doctors', 'user', 'location']);



        if ($firstName) {
            $query->whereHas('user', function ($query) use ($firstName) {
                $query->where('first_name', 'like', '%' . $firstName . '%');
            });
        }
        
        if ($lastName) {
            $query->whereHas('user', function ($query) use ($lastName) {
                $query->where('last_name', 'like', '%' . $lastName . '%');
            });
        }
        

                
   
        $visits = $query->get();
        if ($visits->isEmpty()) {
            return response()->json(['message' => 'No visits found for the specified date range'], 404);
        }

        // Transform data to get the required fields
        $result = $visits->map(function ($visit) {
            return [
                'visit_date' => $visit->visit_date,
                'territory' => $visit->location->territory ?? null,
                'status' => $visit->status,
                'medical_rep_full_name' => $visit->user->first_name . ' ' . $visit->user->last_name,
                'doctor' => $visit->doctors->map(function ($doctor) {
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

    public function searchByDateRange(Request $request, $startDate, $endDate)
{
    $startDate = \Carbon\Carbon::parse($startDate);
    $endDate = \Carbon\Carbon::parse($endDate)->endOfDay();

    $query = Visit::with(['doctors', 'user', 'location'])
                    ->whereBetween('visit_date', [$startDate, $endDate]);

    $visits = $query->get();
    if ($visits->isEmpty()) {
        return response()->json(['message' => 'No visits found for the specified date range'], 404);
    }

    $result = $visits->map(function ($visit) {
        return [
            'visit_date' => $visit->visit_date,
            'territory' => $visit->location->territory ?? null,
            'status' => $visit->status,
            'medical_rep_full_name' => $visit->user->first_name . ' ' . $visit->user->last_name,
            'doctor' => $visit->doctors->map(function ($doctor) {
                return [
                    'doctor_name' => $doctor->first_name . ' ' . $doctor->last_name,
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


public function getVisitHistory($user_id)
{
    $visitHistory = Visit::where('user_id', $user_id)
                         ->whereIn('status', ['closed', 'done'])
                         ->get();
    return response()->json($visitHistory);
}

public function getPlannedVisits($user_id)
{
    $visits = Visit::where('user_id', $user_id)
                   ->where('status', 'ongoing')
                   ->get();
    return response()->json($visits);
}

}

    



