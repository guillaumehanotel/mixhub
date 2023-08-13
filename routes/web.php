<?php

use App\Http\Controllers\BookmarkCategoryController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/upload-background', [ProfileController::class, 'uploadBackground'])->name('profile.upload-background');


    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');


    Route::group(['prefix' => 'favoris', 'as' => 'bookmarks.'], function () {
        Route::get('/', [BookmarkController::class, 'index'])->name('index');
        Route::get('{bookmarkCategory}', [BookmarkController::class, 'show'])->name('show');
    });

    Route::group(['prefix' => 'bookmark-categories', 'as' => 'bookmark-categories.'], function () {
        Route::post('/', [BookmarkCategoryController::class, 'store'])->name('store');
        Route::put('{id}', [BookmarkCategoryController::class, 'update'])->name('update');
        Route::delete('{id}', [BookmarkCategoryController::class, 'destroy'])->name('destroy');

    });




});

require __DIR__.'/auth.php';
