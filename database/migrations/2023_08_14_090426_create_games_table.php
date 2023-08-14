<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();

            $table->enum('status', ['to_play', 'playing', 'played'])->default('to_play');

            $table->integer('rawg_id');
            $table->string('slug')->unique();
            $table->string('name')->unique();
            $table->integer('playtime'); // durée de vie en minutes
            $table->json('platforms');
            $table->json('stores')->nullable();
            $table->string('released'); // date de sortie au format Y-m-d
            $table->boolean('tba'); // to be announced
            $table->string('background_image');
            $table->float('rating'); // note moyenne
            $table->integer('ratings_count')->nullable(); // nombre de notes
            $table->integer('added'); // nombre de fois ajouté à une liste
            $table->integer('metacritic')->nullable(); // note metacritic
            $table->json('tags');
            $table->string('esrb_rating')->nullable();
            $table->json('short_screenshots')->nullable(); // captures d'écran
            $table->json('genres')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
