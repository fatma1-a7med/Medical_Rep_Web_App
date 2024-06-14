<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;

class LoctionController extends Controller
{
    public function index()
    {
        $locations = Location::latest()->get(); 
        $users = User::all()->keyBy('id'); 
        // Map locations to include user name
        $locations = $locations->map(function ($location) use ($users) {
            $location['first_name'] = $users[$location->user_id]->first_name;
            return $location;
        });
        return response()->json($locations);
    }
}
