<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Collaboration;
use App\Models\Research;
use App\Models\User;
use Collator;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory(1)->create();
        // Research::factory(20)->create();
        // Collaboration::factory(5)->create();
        // Chat::factory(10)->create();
    }
}
