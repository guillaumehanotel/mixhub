<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\BookmarkCategory;
use App\Rules\DomainOrUrl;
use Illuminate\Http\Request;
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
            'bookmarkCategory' => $bookmarkCategory,
            'bookmarks' => $bookmarks
        ]);
    }

    public function store(Request $request)
    {
        // 1. Valider les données reçues
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'url' => ['required', new DomainOrUrl],
            'bookmark_category_id' => 'required|integer|exists:bookmark_categories,id', // s'assure que l'ID de la catégorie existe
        ]);

        // Si l'URL est un simple domaine, ajoutez "https://" devant
        $prefixes = ['http://', 'https://'];
        $hasPrefix = false;
        foreach ($prefixes as $prefix) {
            if (str_starts_with($validatedData['url'], $prefix)) {
                $hasPrefix = true;
                break;
            }
        }
        if (!$hasPrefix) {
            $validatedData['url'] = 'https://' . $validatedData['url'];
        }
        $category = BookmarkCategory::findOrFail($validatedData['bookmark_category_id']);

        // 2. Associer le bookmark à l'utilisateur actuellement connecté
        $validatedData['user_id'] = auth()->id();

        // 3. Créer le bookmark
        $bookmark = Bookmark::create($validatedData);

        // 4. Répondre avec le nouveau bookmark
        return redirect()->route('bookmarks.show', $category->slug);
    }

    public function update(Request $request, $bookmarkId)
    {
        // Trouver le bookmark par son ID.
        $bookmark = Bookmark::findOrFail($bookmarkId);

        // Valider les données entrantes.
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'url' => ['sometimes', 'required', new DomainOrUrl],
            'bookmark_category_id' => 'sometimes|required|integer|exists:bookmark_categories,id'
        ]);

        // Mettre à jour le bookmark avec les nouvelles données.
        $bookmark->update($validatedData);

        return redirect()->back();
    }


    public function destroy($bookmarkId)
    {
        // Trouver le bookmark par son ID.
        $bookmark = Bookmark::findOrFail($bookmarkId);

        // Supprimer le bookmark.
        $bookmark->delete();

        return redirect()->back();
    }

}
