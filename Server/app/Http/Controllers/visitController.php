<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function getVisitHistory($med_id)
    {
        $visitHistory = Visit::where('med_id', $med_id)
                             ->whereIn('status', ['completed', 'canceled'])
                             ->get();
        return response()->json($visitHistory);
    }

    public function getPlannedVisits($med_id)
    {
        $visits = Visit::where('med_id', $med_id)
                       ->where('status', 'planned')
                       ->get();
        return response()->json($visits);
    }
}
