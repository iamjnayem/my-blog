<?php

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;



// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::get('/blogs', [BlogController::class, 'index'])
    ->name('blogs.index');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])
    ->name('blogs.show');


Route::get('/categories', [CategoryController::class, 'index'])
    ->name('categories.index');
Route::get('/projects', [ProjectController::class, 'index'])
    ->name('projects.index');   
Route::get('/projects/{id}', [ProjectController::class, 'show'])
    ->name('projects.show');



Route::post('/generate-token', [AuthController::class, 'generateTokenForMe'])
    ->name('generate-token');

Route::middleware('auth:sanctum')->group(function () {

});

