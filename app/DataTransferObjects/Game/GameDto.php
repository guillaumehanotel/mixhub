<?php

namespace App\DataTransferObjects\Game;

use Spatie\LaravelData\Data;

class GameDto extends Data
{
    public function __construct(
        public int     $id,
        public string  $slug,
        public string  $name,
        public int     $playtime,
        public ?array   $platforms,
        public ?array  $stores = null,
        public ?string $released,
        public bool    $tba,
        public ?string $background_image,
        public float   $rating,
        public ?int    $ratings_count = null,
        public int     $added,
        public ?int    $metacritic = null,
        public array   $tags,
        public ?string $esrb_rating = null,
        public ?array  $short_screenshots = null,
        public ?array  $genres = null,
    )
    {
    }

    public static function fromArray(array $data): self
    {
        $getProperties = function (?array $array, string $property, ?string $key = null): ?array {
            if ($array === null)
                return null;

            return array_values(array_filter(array_map(function (array $item) use ($array, $property, $key) {
                $value = ($key !== null) ? $item[$key][$property] : $item[$property];

                // Check for Cyrillic characters
                if (preg_match('/[\p{Cyrillic}]/u', $value)) {
                    return null; // Return null if Cyrillic characters are found
                }

                return $value;
            }, $array), function ($item) {
                return $item !== null; // Remove null values from the result
            }));
        };


        return new self(
            $data['id'],
            $data['slug'],
            $data['name'],
            $data['playtime'],
            $getProperties($data['platforms'], 'name', 'platform') ?? null,
            $getProperties($data['stores'], 'name', 'store') ?? null, // Assuming optional with default null
            $data['released'] ?? null,
            $data['tba'],
            $data['background_image'] ?? null,
            $data['rating'],
            $data['ratings_count'] ?? null, // Assuming optional with default null
            $data['added'],
            $data['metacritic'] ?? null, // Assuming optional with default null
            $getProperties($data['tags'], 'name'),
            $data['esrb_rating']['name'] ?? null, // Assuming optional and it's an array with a 'name' key
            $getProperties($data['short_screenshots'], 'image') ?? null, // Assuming optional with default null
            $getProperties($data['genres'], 'name') ?? null // Assuming optional with default null
        );
    }


}
