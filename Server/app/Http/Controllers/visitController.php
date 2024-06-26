<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VisitController extends Controller
{
  
    public function index()
{
    // Get the logged-in admin
    $admin = Auth::guard('sanctum')->user();
    
    // Get all users that belong to this admin
    $users = User::where('admin_id', $admin->id)->pluck('id');

    // Get all visits related to these users
    $visits = Visit::with(['doctor', 'user', 'location', 'tools'])
        ->whereIn('user_id', $users)
        ->get();

    $result = $visits->map(function ($visit) {
        return [
            'id' => $visit->id,
            'visit_date' => $visit->visit_date,
            'status' => $visit->status,
            'medical_rep_fullname' => $visit->user->first_name . ' ' . $visit->user->last_name,
            'doctor' => $visit->doctor ? $visit->doctor->first_name . ' ' . $visit->doctor->last_name : null,
            'tools' => $visit->tools->map(function ($tool) {
                return [
                    'tool_name' => $tool->name,
                ];
            }),
            'location' => $visit->location ? [
                'latitude' => $visit->location->latitude,
                'longitude' => $visit->location->longitude,
                'timestamp' => $visit->location->timestamp,
                'altitude' => $visit->location->altitude,
                'accuracy' => $visit->location->accuracy,
                'speed' => $visit->location->speed,
                'direction' => $visit->location->direction,
            ] : null
        ];
    });

    return response()->json($result);
}
    

    public function getVisitInformationById($id) {
        $visit = Visit::with(['doctor', 'location', 'user','tools'])->find($id);
    
        if (!$visit) {
            return response()->json(['message' => 'Visit not found'], 404);
        }
    
        $doctor = $visit->doctor;
        if (!$doctor) {
            return response()->json(['message' => 'No doctor associated with this visit'], 404);
        }
    
        $visitInformation = [
            'id' => $visit->id,
            'status' => $visit->status,
            'doctor_name' => $doctor->first_name . ' ' . $doctor->last_name,
            'territory' => $doctor->territory,
            'city' => $doctor->city,
            'state' => $doctor->state,
            'location_info' => $visit->location,
            'user_full_name' => $visit->user->first_name . ' ' . $visit->user->last_name,
            'tools' => $visit->tools->map(function ($tool) {
                return [
                    'tool_name' => $tool->name,
                ];
            }),
        ];
    
        return response()->json($visitInformation);
    }
    public function searchByUsername(Request $request, $username)
{
    $query = Visit::with(['doctor', 'user', 'location']);

    if ($username) {
        // Concatenate first_name and last_name with a space and then search
        $query->whereHas('user', function ($query) use ($username) {
            $fullName = str_replace('-', ' ', $username); // Handle potential dashes
            $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$fullName%"]);
        });
    }

    $visits = $query->get();

    if ($visits->isEmpty()) {
        return response()->json(['message' => 'No visits found for the specified username'], 404);
    }

    // Transform data as per your needs
    $result = $visits->map(function ($visit) {
        $userFullName = $visit->user->first_name . ' ' . $visit->user->last_name;

        return [
            'medical_rep_fullname' => $userFullName,
            'id' => $visit->id,
            'visit_date' => $visit->visit_date,
            'territory' => $visit->location->territory ?? null,
            'status' => $visit->status,
            'doctor' => [
                'doctor_name' => $visit->doctor->first_name . ' ' . $visit->doctor->last_name,
            ],
            'tools' => $visit->doctor->tools->map(function ($tool) {
                return [
                    'tool_name' => $tool->name,
                ];
            }),
        ];
    });

    return response()->json($result);
}
        
    
public function searchByDateRange(Request $request, $startDate, $endDate)
{
    $startDate = \Carbon\Carbon::parse($startDate);
    $endDate = \Carbon\Carbon::parse($endDate)->endOfDay();

    $query = Visit::with(['doctor', 'user', 'location'])
                  ->whereBetween('visit_date', [$startDate, $endDate]);

    $visits = $query->get();
    if ($visits->isEmpty()) {
        return response()->json(['message' => 'No visits found for the specified date range'], 404);
    }

    $result = $visits->map(function ($visit) {
        $userFullName = $visit->user->first_name . ' ' . $visit->user->last_name;

        return [
            'medical_rep_fullname' => $userFullName,
            'id' => $visit->id,
            'visit_date' => $visit->visit_date,
            'territory' => $visit->location->territory ?? null,
            'status' => $visit->status,
            'doctor' => [
                'doctor_name' => $visit->doctor->first_name . ' ' . $visit->doctor->last_name,
            ],
            'tools' => $visit->doctor->tools->map(function ($tool) {
                return [
                    'tool_name' => $tool->name,
                ];
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
public function recent()
{
    $recentVisits = Visit::orderBy('created_at', 'desc')->take(5)->get();
    return response()->json($recentVisits);
}
    


 /**
     * Get the latest 6 visits.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latestVisits()
{
    $user = Auth::user();
    
    $latestVisits = Visit::where('user_id', $user->id)
                         ->orderBy('created_at', 'desc')
                         ->take(6)
                         ->with(['doctor', 'user', 'location']) 
                         ->get();

    $result = $latestVisits->map(function ($visit) {
        return [
            'id' => $visit->id,
            'visit_date' => $visit->visit_date,
            'visit_time' => $visit->visit_time,
            'status' => $visit->status,
            'medical_rep_fullname' => $visit->user->first_name . ' ' . $visit->user->last_name,
            'doctor' => [
                'doctor_name' => $visit->doctor->first_name . ' ' . $visit->doctor->last_name,
                'specialization' => $visit->doctor->specialization,
                'class_rate' => $visit->doctor->class_rate,
            ],
            'tools' => $visit->tools->map(function ($tool) {
                return [
                    'tool_name' => $tool->name,
                ];
            }),
        ];
    });

    return response()->json($result);
}


}
