<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collaboration>
 */
class CollaborationFactory extends Factory
{
    public static ? string $status='pending';
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'research_id'=>rand(1,15),
        'user_id'=>rand(2,4),
        'collaborator_id'=>rand(2,4),
        'status'=>static::$status
        ];
    }
}
