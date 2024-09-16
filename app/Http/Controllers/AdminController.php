<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
   
    public function users()
    {
        // $users = User::with('roles')->get();
       $users = User::with('roles')->where('name','!=','Developer')->latest()->get();
      $roles = Role::where('name', '!=', 'developer')->pluck('name');

        return Inertia::render('Admin/Users', compact('users','roles'));
    }

    public function roles()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Roles', [
            'roles' => $roles,
        ]);
    }


//assign user a role
   public function assignRole(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'role' => 'required|string'
    ]);

    $user = User::find($request->user_id);

    if ($user === null) {
        Log::error("Attempt to assign role failed: User not found.", ['user_id' => $request->user_id]);
        return redirect()->back()->with('error', 'User not found.');
    }

    if (Auth::user()->id === $user->id) {
        Log::warning("Admin tried to update their own roles.", ['admin_id' => Auth::user()->id]);
        return redirect()->back()->with('error', 'You cannot update your own roles.');
    }

    $user->syncRoles([]);
    $user->assignRole($request->role);

    Log::info("Role assigned successfully.", ['user_id' => $user->id, 'role' => $request->role]);
    return redirect()->back()->with('success', 'Role assigned successfully.');
}


//revoke user role
 public function revokeRole(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'role' => 'required|string'
    ]);

    $user = User::find($request->user_id);

    if ($user === null) {
        Log::error("Attempt to revoke role failed: User not found.", ['user_id' => $request->user_id]);
        return redirect()->back()->with('error', 'User not found.');
    }

    if (Auth::user()->id === $user->id) {
        Log::warning("Admin tried to revoke their own roles.", ['admin_id' => Auth::user()->id]);
        return redirect()->back()->with('error', 'You cannot revoke your own roles.');
    }

    $user->removeRole($request->role);

    Log::info("Role revoked successfully.", ['user_id' => $user->id, 'role' => $request->role]);
    return redirect()->back()->with('success', 'Role revoked successfully.');
}

public function create(){
    return inertia('Admin/UserCreate');
}

public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->assignRole('author'); 

        event(new Registered($user));

        return redirect()->route('admin.users');
    }


}
