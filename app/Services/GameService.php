<?php

namespace App\Services;

use App\DataTransferObjects\Game\GameDto;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class GameService
{

    public function searchGamesByTitle(string $title): Collection
    {
        $url = 'https://api.rawg.io/api/games';

        $searchQuery = [
            'search' => $title,
            'search_precise' => true,
            'page_size' => 40,
            'key' => config('services.rawg.api_key'),
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->get($url, $searchQuery);

        if ($response->failed()) {
            // Handle error or return an empty collection
            return collect();
        }

        $results = $response->json()['results'];

        return $this->processGames($results);
    }

    private function processGames(array $games): Collection
    {
        $filteredResults = array_filter($games, function($game) {
            return $game['added'] !== 0 && $game['rating'] !== 0.0;
        });

        usort($filteredResults, function($gameA, $gameB) {
            return $gameB['rating'] <=> $gameA['rating'];
        });

        $collection = collect();
        foreach ($filteredResults as $result) {
            $gameDto = GameDto::fromArray($result);
            $collection->push($gameDto);
        }

        return $collection;
    }
}
