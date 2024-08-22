<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    //

    public function attachRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        $user->roles()->attach($role);

        return inertia("Admin/Users",['message' => 'Role attached successfully.']);
    }

    public function detachRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        $user->roles()->detach($role);

        return inertia("Admin/Users",['message' => 'Role detached successfully.']);
    }

    public function syncRoles(Request $request, $userId)
    {
        $request->validate([
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        $user = User::findOrFail($userId);
        $user->roles()->sync($request->role_ids);

        return inertia("Admin/Users",['message' => 'Roles synced successfully.']);
    }
}
