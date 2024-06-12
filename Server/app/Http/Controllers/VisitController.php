<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Visit as GlobalVisit;

class VisitController extends Controller
{
    public function index()
    {
        // Retrieve all visits with related information
        $visits = Visit ::with('doctors', 'user', 'location')->get();

        return $visits;
    }
}
