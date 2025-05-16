<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try {

            $categories = Category::where('status', 1)
            ->whereHas('blogs')
            ->orderBy('name', 'asc')
            ->select('id', 'name')
            ->get();

            $response = getResponse(200, $categories);

            return response()->json($response, 200);

        } catch (Exception $e) {
           
            $response = getResponse(500, [], ['Something went wrong']);
            return response()->json($response, 500);
        }
    }

  
}
