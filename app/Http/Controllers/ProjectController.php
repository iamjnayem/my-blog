<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Exception;

class ProjectController extends Controller
{
    public function index(){
        try {

            $projects = Project::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();
          

            $response = getResponse(200, $projects);

            return response()->json($response, 200);

        } catch (Exception $e) {
        
            $response = getResponse(500, [], ['Something went wrong']);
            return response()->json($response, 500);
        }
    }


    public function show($id){
        try {
            $project = Project::findOrFail($id);
            $response = getResponse(200, $project);
            return response()->json($response, 200);
        } catch (Exception $e) {
            $response = getResponse(500, [], ['Something went wrong']);
            return response()->json($response, 500);
        }
    }
}
