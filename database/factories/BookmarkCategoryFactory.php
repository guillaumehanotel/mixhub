<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookmarkCategoryFactory extends Factory
{

    public function definition(): array
    {
        $name = $this->faker->word;
        $slug = Str::slug($name);
        return [
            'name' => $name,
            'slug' => $slug,
            // Le champ suivant sera déterminé dans le seeder
            'user_id' => null,
        ];
    }
}
