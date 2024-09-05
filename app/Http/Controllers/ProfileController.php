<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Department;
use App\Models\Qualification;
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
        $userr=User::with('department')->find($request->user()->id);
        $qualifications=Qualification::where('user_id',$request->user()->id)->get();
        $departments=Department::where('name','!=','administrator')->get();
      
        // $user_department=Department::where('user_id',$request->user()->id)->get();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'qualifications'=>$qualifications,
            'departments'=>$departments,
            'userr'=>$userr
            // 'user_department'=>$user_department
        ]);
    }

    public function editadmin(Request $request): Response
    {
        $qualifications=Qualification::where('user_id',$request->user()->id)->get();
        return Inertia::render('Admin/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'qualifications'=>$qualifications,
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
        'whatsapp'=>'nullable|string|max:15',
        'facebook'=>'nullable|string',
        'linkedin'=>'nullable|string',
        'department_id'=>'required|exists:departments,id',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $request->user()->id,
        // 'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'bio' => 'nullable|string|max:2000',
        'research_area'=>'nullable|string|max:400',
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
        $validUserDate['profile_photo'] = $photo;
    } else {
        // Keep the old file path if no new file is uploaded
        $validUserDate['profile_photo'] = $user->file_path;
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
    $user->update($validUserDate);

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
