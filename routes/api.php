<?php

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;



// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::get('/blogs', [BlogController::class, 'index'])
    ->name('blogs.index');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])
    ->name('blogs.show');


Route::get('/categories', [CategoryController::class, 'index'])
    ->name('categories.index');




Route::post('/generate-token', [AuthController::class, 'generateTokenForMe'])
    ->name('generate-token');

Route::middleware('auth:sanctum')->group(function () {

});

