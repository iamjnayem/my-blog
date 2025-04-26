<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        // Fetch all blogs from the database
        $blogs = Blog::all();

        // Return the blogs as a JSON response
        return response()->json($blogs);
    }

    public function show($id)
    {
        // Fetch a single blog by its ID
        $blog = Blog::findOrFail($id);

        // Return the blog as a JSON response
        return response()->json($blog);
    }
}
