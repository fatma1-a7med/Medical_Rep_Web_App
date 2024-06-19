<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
class DoctorController extends Controller
{
    public function index()
{
    // Fetch all doctors
    $doctors = Doctor::all();

    // Return the view with the doctors data
    return response()->json($doctors);
}

}
