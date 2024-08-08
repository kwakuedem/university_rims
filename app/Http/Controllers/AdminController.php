<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
   
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function users()
    {
        $users = User::with('roles')->get();

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function roles()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Roles', [
            'roles' => $roles,
        ]);
    }

    public function permissions()
    {
        $permissions = Permission::all();

        return Inertia::render('Admin/Permissions', [
            'permissions' => $permissions,
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
