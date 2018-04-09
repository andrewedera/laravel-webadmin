<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$users = factory(User::class, 500)->create();
        $users = User::All();

        return view('users', [ 'users' => $users]);
    }

    public function getUsersAjax()
    {
        if(request()->ajax())
        {
            $user = User::get(['id','username','name','email','isActive']);
            return response()->json($user);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        // if(request()->ajax())
        // {
        //     return User::findOrFail($user->id);
        // }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        if(request()->ajax())
        {
            return User::findOrFail($user->id);
        }
        //
        //return User::findOrFail($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if(request()->ajax()) {
            $user = User::findOrFail($user->id);
            if($request->_status == 'true') {
                $user->isActive = ($user->isActive) ? false : true;
                $user->update();
                $user->touch();
            }
            else {
                Validator::make($request->all(), [
                    'name' => 'required|string|max:255',
                    'username' => 'required|string|max:25|unique:users,' . $user->id,
                    'email' => 'required|string|email|max:255|unique:users,' . $user->id,
                    'password' => 'sometimes|required|string|min:6|confirmed',
                ]);

                $user->name = $request->name;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->isActive = ($request->status == 'Active') ? true : false;
                if ($request->password) {
                    $user->password = Hash::make($request->password);
                }             
                $user->update();
                $user->touch();
            }
        }
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        User::destroy($user->id);
    }
}
