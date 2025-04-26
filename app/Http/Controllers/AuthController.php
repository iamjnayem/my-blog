<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function generateTokenForMe(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if ($validator->fails()) {
                $response = getResponse(422, [], $validator->errors()->all());
                return response()->json($response, 422);
            }

            $credentials = $request->only('email', 'password');

            // Attempt to authenticate the user
            if (Auth::attempt($credentials)) {
                // Authentication passed, get the authenticated user
                $user = Auth::user()->select('id', 'name', 'email')->first();

                // Generate a new API token for the user
                $token = $user->createToken('auth-token')->plainTextToken;
                $response = getResponse(200, [
                    'user' => $user,
                    'token' => $token,
                ]);
                return response()->json($response, 200);
            }

            $respon = getResponse(401, [], ['Invalid credentials']);
            return response()->json($respon, 401);

        }catch(Exception $e){
            $response =getResponse(500, [],['Something went wrong']);
            return response()->json($response, 500);
        }
    }
}
