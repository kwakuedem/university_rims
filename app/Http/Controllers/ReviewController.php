<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Submission;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
     public function create(Submission $submission)
    {
        return inertia('Reviews/Create', [
            'submission' => $submission,
        ]);
    }

    public function store(Request $request, Submission $submission)
    {
        $validRequest=$request->validate([
            'comments' => 'required|string|max:1000',
            'recommendation' => 'required|string|in:accept,reject,revise',
        ]);

        Review::create([
            'submission_id' => $submission->id,
            'reviewer_id' => auth()->id(),
            'comments' => $validRequest['comments'],
            'recommendation' => $validRequest['recommendation'],
        ]);

        return redirect()->route('submissions.index')->with('success', 'Review submitted successfully.');
    }
}
