<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\DoctorReauest;
use App\Http\Requests\request as RequestsRequest;
use App\Http\Requests\updateDoctor;
use App\Models\Doctor;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\JsonResponse;


class doctorController extends Controller
{
     /**
     * Create a new doctor instance.
     *
     * @param  \App\Http\Requests\DoctorRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function AddDoctor(DoctorReauest  $request):JsonResponse{
        $validatedData = $request-> validated();
        $doctor = Doctor::create($validatedData);
        return response() ->json([
            'status'=>true,
            'massage' =>'Doctor created successfully',
            "data" => $doctor

        ],201);

     }


     /**
      * update doctor
      *@param  \App\Http\Requests\DoctorRequest  $request
     * @return \Illuminate\Http\JsonResponse  
     * @param  int  $id
     *     
      */
      public function update(updateDoctor $request,$id){
        $validatedData = $request-> validated();
        $doctor = Doctor::find($id);
        if(!$doctor){
            return response()->json(['massage'=>'Doctor not found'],200);
        }else{
            $doctor->update($validatedData);
            $updateddoctor = Doctor::findOrFail($id);
        }
        return response()->json($updateddoctor, 200);



      }




     /**
      * get all doctors
      *
     * @return \Illuminate\Http\JsonResponse
      */
      public function gettAllDoctors(): JsonResponse{
        $allDoctors = Doctor::all();
        return response()->json($allDoctors);
      }


      /**
       * get doctor by id
       * 
       * @param  int  $id
       * @return \Illuminate\Http\JsonResponse
       */
      public function show($id): JsonResponse{
        $doctor = Doctor::find($id);
        if(!$doctor){
            return response()->json(['massage'=>'Doctor not found'],200);
        }else{
            return response()-> json($doctor);
        }
      }

      /**
       * delete doctor 
       * 
       * @param  int  $id
       * @return \Illuminate\Http\JsonResponse
       */  
      public function destroy($id):JsonResponse{
        $doctor = Doctor::find($id);
        if(!$doctor){
            return response()->json(['message' => 'Doctor has already been deleted'], 200);
        }
            // Delete the user
            $doctor->delete();
            // Return a JSON response with a success message
            return response()->json(['message' => 'Doctor has been deleted successfully'], 200);
    
}
}
