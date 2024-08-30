<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Collaboration;
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
        // $user=User::create([
        //     'name' => 'Admin',
        //     'email' => 'admin@hturims.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('Admin@123'),
        //     'facebook'=>'facebook.com/edemkwaku',
        //     'linkedin'=>'linkedin.com/edem-kwaku-98',
        //     'whatsapp'=>'0540908248',
        //     'remember_token' => Str::random(10),
        // ]);
        // $user->assignRole('admin');

         $user=User::create([
            'name' => 'none',
            'email' => 'none@hturims.com',
            'email_verified_at' => now(),
            'password' => Hash::make('Admin@123'),
        ]);

        // User::factory(1)->create();
        // Research::factory(20)->create();
        // Collaboration::factory(5)->create();
        // Chat::factory(10)->create();
    }
}
