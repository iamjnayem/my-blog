<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        try {

            // $categoryId = $request->query('category_id');
            $sortByTabs = $request->query('tab');
            $page = $request->query('page', 1);
            $limit = $request->query('limit', 10);


            // Build the query
            $query = Blog::query();

            if ($request->has('search') && !empty($request->query('search'))) {
                // Trim and sanitize the search input
                $searchTerm = trim($request->query('search'));

                // Search by title or content, and related category name
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'like', '%' . $searchTerm . '%')
                        ->orWhere('content', 'like', '%' . $searchTerm . '%')
                        ->orWhereHas('category', function ($q) use ($searchTerm) {
                            $q->where('name', 'like', '%' . $searchTerm . '%');
                        });
                });
            }

            // Apply sorting
            if ($sortByTabs === 'latest') {
                $query->orderByDesc('created_at');
            } else if ($sortByTabs === 'popular') {
                $query->orderByDesc('view_count');
            } else {
                $query->orderBy('created_at');
            }

            
            if($request->has('category') && $request->query('category') != "null") {
                // Check if the category ID is valid
                $categoryId = $request->query('category');
                $query->where('category_id', $categoryId);
            }

            // Paginate the results
            // Eager load relationships
            $blogs = $query->with(['author:id,name', 'category:id,name'])->paginate($limit, ['*'], 'page', $page);

            $updatedBlogs = array_map(function ($blog) {
                if (!empty($blog['image'])) {
                    $blog['image_url'] = asset('storage/' . $blog['image']);
                } else {
                    $blog['image_url'] = null;
                }

                unset($blog['image']);

                return $blog;
            }, $blogs->items());

            $blogs = [
                'blogs' => $updatedBlogs,
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'total' => $blogs->total(),
                'per_page' => $blogs->perPage(),
            ];

            $response = getResponse(200, $blogs);

            return response()->json($response, 200);

        } catch (Exception $e) {
            dd($e->getMessage());
            $response = getResponse(500, [], ['Something went wrong']);
            return response()->json($response, 500);
        }
    }

    public function show($slug)
    {
        try {
            // Find the blog by ID
            $blog = Blog::with(['author:id,name', 'category:id,name'])->where('slug', $slug)->first();

            if (!$blog) {
                $response = getResponse(404, [], ['Blog not found']);
                return response()->json($response, 404);
            }

            // Increment the view count
            $blog->increment('view_count');

            $response = getResponse(200, $blog);

            return response()->json($response, 200);

        } catch (Exception $e) {
            $response = getResponse(500, [], ['Something went wrong']);
            return response()->json($response, 500);
        }
    }
}
