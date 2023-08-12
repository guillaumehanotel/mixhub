<?php

namespace App\Http\Controllers;

use App\Models\BookmarkCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        $category = BookmarkCategory::forUser(Auth::user())->first();
        return to_route('bookmarks.show', ['bookmarkCategory' => $category]);
    }

    public function show(BookmarkCategory $bookmarkCategory)
    {
        $bookmarks = $bookmarkCategory->bookmarks()->get();
        return Inertia::render('Bookmark', [
            'bookmarks' => $bookmarks
        ]);
    }
}
