<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{         //Display all user api
    public function index()
    {
        $users = User::all();

        return response()->json(['users' => $users], 200);
    }

    public function store(Request $request)
    {
        // Example validation:
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'user_number' => 'required|string',
            'higher_university' => 'nullable|string',
            'higher_degree' => 'nullable|string',
            'higher_major' => 'nullable|string',
            'higher_graduation' => 'nullable|string',
        ]);

        

        // Create a new user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'user_number' => $validatedData['user_number'],
            'higher_university' => $validatedData['higher_university'],
            'higher_degree' => $validatedData['higher_degree'],
            'higher_major' => $validatedData['higher_major'],
            'higher_graduation' => $validatedData['higher_graduation'],
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user->toArray()], 201);

    }
            //    Login api
            public function login(Request $request)
            {
                try {
                    $validatedData = $request->validate([
                        'email' => 'required|email',
                        'password' => 'required|string',
                    ]);
            
                    $user = User::where('email', $validatedData['email'])->first();
            
                    if (!$user || !Hash::check($validatedData['password'], $user->password)) {
                        return response()->json(['message' => 'Invalid credentials'], 401);
                    }
            
                    $token = $user->createToken('auth_token')->plainTextToken;
            
                    return response()->json([
                        'status' => 'success',
                        'message' => 'Login successful',
                        'access_token' => $token,
                        'token_type' => 'Bearer'
                    ], 200);
                } catch (\Exception $e) {
                    return response()->json(['message' => 'Error during login'], 500);
                }
            }

                //    update api
                public function update(Request $request, $id)
                {
                    try {
                        $user = User::find($id);
                
                        if (!$user) {
                            return response()->json(['message' => 'User not found'], 404);
                        }
                
                        $validatedData = $request->validate([
                            'name' => 'string',
                            'email' => 'email|unique:users,email,' . $id,
                            'password' => 'string|min:8',
                            'user_number' => 'string',
                            'higher_university' => 'string',
                            'higher_degree' => 'string',
                            'higher_major' => 'string',
                            'higher_graduation' => 'string'
                        ]);
                
                        // Update only the fields that are present in the request data
                        foreach ($validatedData as $key => $value) {
                            if (!empty($value)) {
                                $user->$key = $value;
                            }
                        }
                
                        $user->save();
                
                        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
                    } catch (\Exception $e) {
                        return response()->json(['message' => 'Error updating user'], 500);
                    }
                }
                // Delete api
public function delete($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}

}
