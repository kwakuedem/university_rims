<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Collaboration;
use App\Models\Department;
use App\Models\Research;
use App\Models\User;
use Collator;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Department::create([
            'name'=>'administrator',
            'description'=>'department for administrating the system',
        ]);

        $user=User::create([
            'name' => 'Admin',
            'email' => 'admin@hturims.com',
            'department_id'=>1,
            'email_verified_at' => now(),
            'password' => Hash::make('Admin@123'),
            'facebook'=>'facebook.com/edemkwaku',
            'linkedin'=>'linkedin.com/edem-kwaku-98',
            'whatsapp'=>'0540908248',
            'remember_token' => Str::random(10),
        ]);
        $user->assignRole('admin');

        //  $user=User::create([
        //     'name' => 'none',
        //     'email' => 'none@hturims.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('Admin@123'),
        // ]);

       $user=User::create([
            'name' => 'Developer',
            'email' => 'dev@hturims.com',
            'department_id'=>1,
            'email_verified_at' => now(),
            'password' => Hash::make('dev@@123'),
            'facebook'=>'facebook.com/edemkwaku',
            'linkedin'=>'linkedin.com/edem-kwaku-98',
            'whatsapp'=>'0540908248',
            'remember_token' => Str::random(10),
        ]);
        $user->assignRole('developer');
    }
}
