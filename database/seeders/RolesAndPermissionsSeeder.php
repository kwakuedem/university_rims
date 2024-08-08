<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'manage users',
            'manage roles',
            'manage permissions',
            'create submissions',
            'view submissions',
            'edit submissions',
            'delete submissions',
            'assign reviewers',
            'review submissions',
            'approve submissions',
            'reject submissions',
            'publish submissions',
            'create reviews',
            'view reviews',
            'edit reviews',
            'delete reviews',
            'approve reviews',
            'reject reviews',
            'create own submissions',
            'view own submissions',
            'edit own submissions',
            'delete own submissions',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign created permissions

        // Admin role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Reviewer role
        $reviewerRole = Role::create(['name' => 'reviewer']);
        $reviewerRole->givePermissionTo([
            'view submissions',
            'review submissions',
            'create reviews',
            'view reviews',
            'edit reviews',
            'delete reviews',
            'approve reviews',
            'reject reviews',
        ]);

        // Author role
        $authorRole = Role::create(['name' => 'author']);
        $authorRole->givePermissionTo([
            'create own submissions',
            'view own submissions',
            'edit own submissions',
            'delete own submissions',
        ]);

        // Editor role
        $editorRole = Role::create(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view submissions',
            'edit submissions',
            'assign reviewers',
            'approve submissions',
            'reject submissions',
            'publish submissions',
        ]);
    }
}
