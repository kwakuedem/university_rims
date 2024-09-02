<?php

namespace App\Http\Controllers;

use App\Models\Qualification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QualificationController extends Controller
{
     public function store(Request $request)
    {
        
        // Validate the request
        $request->validate([
            'qualifications' => 'required|array',
            'qualifications.*.degree' => 'required|string|max:255',
            'qualifications.*.institution' => 'required|string|max:255',
            'qualifications.*.year' => 'required|digits:4',
        ]);

        // Save each qualification
       foreach ($request->qualifications as $qualification) {
            Qualification::create([
                'user_id' => Auth::id(),
                'degree' => $qualification['degree'],
                'institution' => $qualification['institution'],
                'year' => $qualification['year'],
            ]);
        }

        return redirect()->route('profile.edit')->with('success', 'Qualifications saved successfully!');
    }

     // Delete function
    public function destroy(Qualification $qualification)
    {
        $qualification->delete();

        return redirect()->route('profile.edit')->with('success', 'Qualification deleted successfully!');
    }
}
