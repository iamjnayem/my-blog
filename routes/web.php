<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
	return view('react');
});

Route::get('/test-env', function () {
    dd(env('APP_URL'), config('app.url'));
});

Route::fallback(function () {
    return view('react'); // Ensure this points to your React app's entry point
});
