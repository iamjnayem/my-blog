<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
	dd("home");
	return view('react');
});

Route::fallback(function () {
    return view('react'); // Ensure this points to your React app's entry point
});
