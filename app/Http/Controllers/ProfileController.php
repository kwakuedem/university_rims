<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

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
    public function update(Request $request): RedirectResponse
    {
        // Validate the incoming request data
    $request->validate([
        'title' => 'nullable|string|max:255',
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $request->user()->id,
        'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'bio' => 'nullable|string|max:1000',
        'password' => 'nullable|string|min:8|confirmed',
    ]);

    $user = $request->user();

    // Handle profile photo upload
    if ($request->hasFile('profile_photo')) {
        if ($user->profile_photo_path) {
            Storage::delete($user->profile_photo_path);
        }

        $path = $request->file('profile_photo')->store('profile_photos');
        $user->profile_photo_path = $path;
    }

    // Check if email is changed and reset email verification if necessary
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    // Update user details
    $user->name = $request->name;
    $user->email = $request->email;
    $user->bio = $request->bio;
    $user->title = $request->title;

    // Update password if provided
    if ($request->password) {
        $user->password = Hash::make($request->password);
    }

    // Save the updated user information
    $user->save();

    return redirect()->back()->with('success', 'Profile updated successfully!');
        
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
