<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run()
    {
       
        // Developer role
        Role::create(['name' => 'developer']);

        // Admin role
        Role::create(['name' => 'admin']);
  
        // Author role
        Role::create(['name' => 'author']);
        

      
    }
}
