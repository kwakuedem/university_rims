<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
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
    public function update(Request $request, User $user): RedirectResponse
    {
       
        // Validate the incoming request data
    $validUserDate=$request->validate([
        'title' => 'nullable|string|max:255',
        'name' => 'required|string|max:255',
        'whatsapp'=>'string|max:15',
        'facebook'=>'string',
        'linkedin'=>'string',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $request->user()->id,
        'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'bio' => 'nullable|string|max:2000',
        'research_area'=>'string|max:400',
        'password' => 'nullable|string|min:8|confirmed',
    ]);

    // Handle file upload if a new file is provided
    if ($request->hasFile('profile_photo')) {
    // Delete old file if it exists
    if ($user->profile_photo) {
        Storage::disk('public')->delete($user->profile_photo);
    }
    $fileName = $request->file('profile_photo')->getClientOriginalName();
    $photo = $request->file('profile_photo')->storeAs('profile_photos', $fileName, 'public');
    } else {
        // Keep the old file path if no new file is uploaded
        $photo = $request->profile_photo;
    }

    // Check if email is changed and reset email verification if necessary
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    // Update user details
   

    // Update password if provided
    if ($request->password) {
        $user->password = Hash::make($request->password);
    }

    // Save the updated user information
    $user->update([
        'title'=>$validUserDate['title'],
        'name'=> $validUserDate['name'],
        'email' => $validUserDate['email'],
        'bio' => $validUserDate['bio'],
        'title' => $validUserDate['title'],
        'research_area'=>$validUserDate['research_area'],
        'whatsapp'=>$validUserDate['whatsapp'],
        'facebook'=>$validUserDate['facebook'],
        'linkedin'=>$validUserDate['linkedin'],
        'profile_photo'=>$photo,
    ]);

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
