<?php

namespace App\Http\Controllers;

use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResearchController extends Controller
{
     // Get all research work
    public function index()
    {
        $user = auth()->user();

        // Get research works owned by the user or where the user is a collaborator
        $publications = Research::where('user_id', $user->id)
            ->orWhereHas('collaborators', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return inertia('Publications/Index', compact('publications'));
    }

    // Get create publication form
    public function create(){
        return inertia('Publications/Create');
    }
    
    // Store publications
    public function store(Request $request)
    {
        // Validate the request
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'file_path' => 'required|file|mimes:pdf,txt,odt,doc,docx|max:2048',
        ]);

        // Handle file upload
        $filePath = null;
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('research_files', 'public');

        }

        Research::create([
            'title' => $data['title'],
            'abstract' => $data['abstract'],
            'file_path' => $filePath,
            'user_id' => auth()->user()->id
        ]);

        // Return response (for example, redirect or Inertia response)
        return redirect()->route('publications.index')->with('success', 'Research submitted successfully!');
    }


    public function edit(Research $publication){
         return inertia('Publications/Edit',compact('publication'));
    }


    public function update(Request $request, Research $publication)
{
    // dd($publication);
    sleep(5);
    // Validate the request
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'abstract' => 'required|string',
        'file_path' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
    ]);

    // Handle file upload if a new file is provided
    if ($request->hasFile('file_path')) {
        // Delete old file if it exists
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }

        // Store new file
        $filePath = $request->file('file_path')->store('research_files', 'public');
    } else {
        // Retain the old file path if no new file is provided
        $filePath = $publication->file_path;
    }

    // Update the data
    $publication->update([
        'title' => $data['title'],
        'abstract' => $data['abstract'],
        'file_path' => $filePath,
    ]);

    // Return response (e.g., redirect or Inertia response)
    return redirect()->route('publications.index')->with('success', 'Publication updated successfully.');
}

}
