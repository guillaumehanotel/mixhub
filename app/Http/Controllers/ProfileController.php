<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function uploadBackground(Request $request): RedirectResponse
    {
        $request->validate([
            'background' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:51200',
        ]);

        $user = $request->user();

        // Supprimez l'ancienne image s'il ne s'agit pas de l'image par défaut.
        if ($user->background_image_url != 'default-images/default-bg.png') {
            Storage::delete($user->background_image_url);
        }

        // Stockez l'image et récupérez le chemin.
        $path = $request->file('background')->store('user-backgrounds', 'public');

        // Mettez à jour le modèle utilisateur.
        $user->update([
            'background_image_url' => '/storage/' . $path,
        ]);

        return Redirect::route('profile.edit')->with('success', 'Image de fond mise à jour avec succès.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
