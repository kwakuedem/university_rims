<?php

namespace App\Http\Controllers;

use App\Models\Research;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    //
    public function index()
    {
        $submissions = Submission::with('research')->where('author_id', auth()->id())->get();

        return inertia('Submissions/Index', [
            'submissions' => $submissions,
        ]);
    }

    public function create()
    {
        $researches = Research::where('author_id', auth()->id())->orWhereHas('collaborators', function($query) {
            $query->where('user_id', auth()->id());
        })->get();

        return inertia('Submissions/Create', [
            'researches' => $researches,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'research_id' => 'required|exists:researches,id',
            'status' => 'required|string|in:' . implode(',', Submission::$statuses),
        ]);

        Submission::create([
            'research_id' => $request->input('research_id'),
            'status' => $request->input('status'),
        ]);

        return redirect()->route('submissions.index')->with('success', 'Submission created successfully.');
    }

    public function edit(Submission $submission)
    {
        $this->authorize('update', $submission);

        return inertia('Submissions/Edit', [
            'submission' => $submission->load('research'),
        ]);
    }

    public function update(Request $request, Submission $submission)
    {
        $this->authorize('update', $submission);

        $request->validate([
            'status' => 'required|string|in:' . implode(',', Submission::$statuses),
        ]);

        $submission->update([
            'status' => $request->input('status'),
        ]);

        return redirect()->route('submissions.index')->with('success', 'Submission updated successfully.');
    }

    public function destroy(Submission $submission)
    {
        $this->authorize('delete', $submission);

        $submission->delete();

        return redirect()->route('submissions.index')->with('success', 'Submission deleted successfully.');
    }

}
