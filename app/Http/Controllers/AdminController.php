<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
   
    public function users()
    {
        // $users = User::with('roles')->get();
       $users = User::with('roles')->get();

        return Inertia::render('Admin/Users', compact('users'));
    }

    public function roles()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Roles', [
            'roles' => $roles,
        ]);
    }

    public function assignRole(Request $request)
    {
        $user = User::find($request->user_id);
        $user->assignRole($request->role);

        return redirect()->back()->with('success', 'Role assigned successfully.');
    }

    public function revokeRole(Request $request)
    {
        $user = User::find($request->user_id);
        $user->removeRole($request->role);

        return redirect()->back()->with('success', 'Role revoked successfully.');
    }

}
