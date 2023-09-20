<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\StoreUserRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::with('permissions', 'roles')->filter()->latest()->paginate($request->input('limit', 10));
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'name' => $request['name'],
        ]);
        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //is_validated

        //udpate
        $user->name = $request->input('name');
        if ($request->input('password'))
            $user->password = $request->input('password');

        //save
        $user->save();

        //response
        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (auth()->id() != $user->id && auth()->user() && auth()->user()->hasPermission('delete_user')) {
            $user->delete();
        }
    }
    public function abilities()
    {
        if ($user = auth('api')->user())
            return $user->allPermissions();
        return [];
    }
}
