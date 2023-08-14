<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Services\GameService;
use Inertia\Inertia;

class HobbyController extends Controller
{

    public function __construct(
        private readonly GameService $gameService
    )
    {
    }

    public function index()
    {
//        $games = $this->gameService->searchGamesByTitle('the witcher');
        $games = $this->gameService->searchGamesByTitle('zelda');

        $games = Game::all();
        $gamesToPlay = Game::where('status', 'to_play')->get();
        $gamesPlaying = Game::where('status', 'playing')->get();

        return Inertia::render('Hobby', [
            'games' => $games,
            'gamesToPlay' => $gamesToPlay,
            'gamesPlaying' => $gamesPlaying,
        ]);
    }
}
