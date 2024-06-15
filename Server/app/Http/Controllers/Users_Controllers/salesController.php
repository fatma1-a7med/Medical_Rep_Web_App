<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class salesController extends Controller
{
    public function index()
    {
        $sales = Sale::orderBy('created_at', 'desc')->get();
        return response()->json(['sales' => $sales], 200);
    }

    public function show($id)
    {
        $sale = Sale::find($id);
        if (!$sale) {
            return response()->json(['error' => 'Sale not found'], 404);
        }
        return response()->json(['sale' => $sale], 200);
    }
}
