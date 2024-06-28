<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        $dbUser = User::searchByEmail($validatedData['email']);
        if (!$dbUser) {
            return response()->json("User sa ovom email adresom ne postoji", 201);
        }
        if (!Hash::check($validatedData['password'], $dbUser->password)) {
            return response()->json("incorect password", 201);
            // throw new Exception("incorect password", 1);
        } else {
            $token = $dbUser->createToken("auth_token")->plainTextToken;
            return response()->json($token, 201);
        }
    }
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password'])
        ]);

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json($token, 201);
    }

}
