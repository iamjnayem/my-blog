<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function generateTokenForMe(Request $request){
        // Validate the incoming request data
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // Authentication passed, get the authenticated user
            $user = Auth::user();

            // Generate a new API token for the user
            $token = $user->createToken('auth-token')->plainTextToken;

            // Return the token in the response
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        // If authentication fails, return an error response
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }
}
