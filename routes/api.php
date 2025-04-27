<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::get('/blogs', [BlogController::class, 'index'])
    ->name('blogs.index');
Route::get('/blogs/{id}', [BlogController::class, 'show'])
    ->name('blogs.show');




Route::post('/generate-token', [AuthController::class, 'generateTokenForMe'])
    ->name('generate-token');

Route::middleware('auth:sanctum')->group(function () {

});

