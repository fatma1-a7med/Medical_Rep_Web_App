<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;


class LocationController extends Controller
{
    public function index()
    {
        // Fetch all locations
        $locations = Location::all();
    
        // Return the view with the location data
        return response()->json($locations);
    }
    
    }
    

