<?php

namespace Database\Factories;

use App\Models\BookmarkCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookmark>
 */
class BookmarkFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->word,
            'url' => $this->faker->url,
            'icon' => $this->faker->imageUrl(16, 16),
            // Les champs suivants seront déterminés dans le seeder
            'bookmark_category_id' => null,
            'user_id' => null,
        ];
    }
}
