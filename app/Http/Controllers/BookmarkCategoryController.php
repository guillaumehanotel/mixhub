<?php

namespace App\Http\Controllers;

use App\Models\BookmarkCategory;
use Illuminate\Http\Request;

class BookmarkCategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $validated['user_id'] = auth()->id();

        $category = BookmarkCategory::create($validated);

        return redirect()->route('bookmarks.show', $category->slug)->with('success', 'Catégorie créée avec succès');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category = BookmarkCategory::findOrFail($id);

        // Vérifier si l'utilisateur actuel est le propriétaire de la catégorie
        if ($category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Action non autorisée'], 403);
        }

        $category->name = $validated['name'];
        $category->save();

        return redirect()->route('bookmarks.show', $category->slug)->with('success', 'Catégorie mise à jour avec succès');
    }


    public function destroy($id)
    {
        $category = BookmarkCategory::findOrFail($id);

        // Vérifier si l'utilisateur actuel est le propriétaire de la catégorie
        if ($category->user_id !== auth()->id()) {
            return response()->json(['error' => 'Action non autorisée'], 403);
        }

        $category->delete();

        return redirect()->route('bookmarks.index')->with('success', 'Catégorie supprimée avec succès');
    }

}
