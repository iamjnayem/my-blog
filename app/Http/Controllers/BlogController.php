<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
       try{
            // Get query parameters
            $categoryId = $request->query('category_id'); // Filter by category
            $isPopular = $request->query('is_popular'); // Filter by popular blogs
            $sortByLatest = $request->query('latest'); // Sort by latest blogs
            $page = $request->query('page', 1); // Current page (default: 1)
            $limit = $request->query('limit', 10); // Number of items per page (default: 10)

            // Build the query
            $query = Blog::query();

            // Apply filters
            if ($categoryId) {
                $query->where('category_id', $categoryId);
            }

            if ($isPopular !== null) {
                $query->where('is_popular', $isPopular);
            }

            // Apply sorting
            if ($sortByLatest) {
                $query->orderByDesc('created_at'); // Sort by latest blogs
            } else {
                $query->orderBy('created_at'); // Default sorting (oldest first)
            }

            // Paginate the results
            // Eager load relationships
            $blogs = $query->with(['author:id,name', 'category:id,name'])->paginate($limit, ['*'], 'page', $page);


            $blogs = [
                'blogs' => $blogs->items(), // The current page's items
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'total' => $blogs->total(),
                'per_page' => $blogs->perPage(),
            ];

            $response = getResponse(200, $blogs);

            return response()->json($response, 200);

       }catch(Exception $e)
       {

            $response = getResponse(500, [], ['Something went wrong']);
            return $response;
       }
    }

    public function show($id)
    {
        // Fetch a single blog by its ID
        $blog = Blog::findOrFail($id);

        // Return the blog as a JSON response
        return response()->json($blog);
    }
}
