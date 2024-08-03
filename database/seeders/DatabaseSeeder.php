<?php

namespace Database\Seeders;

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

        // User::factory(4)->create();
        // Research::factory(20)->create();
        Collaboration::factory(5)->create();
    }
}
