<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminPublicationController extends Controller
{
     public function dashboard()
{

    $numberOfResearch=Publication::count();
    $numberOfpublicationsWithoutCollaborations=Publication::doesntHave('collaborations')->count();
    $numberOfpublicationsWithCollaborations=Publication::whereHas('collaborations')->count();


    // Dynamic statistics for publications per month
     $statistics = [
        'years' => [],
        'publications' => [],
        'collaborations' => [],
        'notcollaborations' => [],
    ];

    $years = Publication::selectRaw('YEAR(created_at) as year')->distinct()->orderBy('year')->pluck('year');

    foreach ($years as $year) {
        $statistics['years'][] = $year;
        $statistics['publications'][] = Publication::whereYear('created_at', $year)
        ->count();

        $statistics['collaborations'][] = Publication::whereHas('collaborations')->whereYear('created_at', $year)
        ->count();


        $statistics['notcollaborations'][] = Publication::doesntHave('collaborations')->whereYear('created_at', $year)
        ->count();
    }

    return inertia('Admin/Dashboard', compact('statistics','numberOfResearch','numberOfpublicationsWithCollaborations','numberOfpublicationsWithoutCollaborations'));
}

     // Get all research work
    public function index(){

        // Get research works owned by the user or where the user is a collaborator
        $publications = Publication::with('author:id,name')->get();
        return inertia('Admin/Publications/Index',compact('publications'));
    }

    // Get create publication form
    public function create(){
        return inertia('Admin/Publications/Create');
    }
    
    // Store publications
    public function store(Request $request)
    {
        // Validate the request
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp|max:2048'
        ]);

        // Handle file upload
        $file = null;
        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $fileName = $file->getClientOriginalName(); // Get the original file name
            $file = $file->storeAs('research_files', $fileName, 'public'); // Save the file with its original name
        }

        Publication::create([
            'title' => $data['title'],
            'abstract' => $data['abstract'],
            'file_path' => $file,
            'author_id' => Auth::user()->id
        ]);

        // Get research works owned by the user or where the user is a collaborator
        $publications = Publication::all()->latest();
        $success= 'Publication Created Successfully.';

        // Return response (for example, redirect or Inertia response)
        return inertia('Admin/Publications/Index',compact('success', 'publications'));
    }


    //get publication edit page
    public function edit(Publication $publication){
        $collaborators=User::all();
         return inertia('Admin/Publications/Edit',compact('publication','collaborators'));
    }



    //update publication function
    public function update(Request $request, Publication $publication){
    
        // Validate the request
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp,odt|max:2048',
            'status'=>'required|string|in:published,unpublished',
        ]);

        // Handle file upload if a new file is provided
        if ($request->hasFile('file_path')) {
        // Delete old file if it exists
            if ($publication->file_path) {
                Storage::disk('public')->delete($publication->file_path);
            }
            $fileName = $request->file('file_path')->getClientOriginalName();
            $file = $request->file('file_path')->storeAs('research_files', $fileName, 'public');
        } else {
            // Keep the old file path if no new file is uploaded
            $file = $publication->file_path;
        }

        // Update the data
        $publication->update([
            'title' => $data['title'],
            'abstract' => $data['abstract'],
            'file_path' => $file,
            'status'=>$data['status']
        ]);

        $user = Auth::user();
        $success= 'Publication Updated Successfully.';
            // Get research works owned by the user or where the user is a collaborator
        $publications = Publication::all()->latest();
              
        return inertia('Admin/Publications/Index',compact('success','publications'));
    }

    //show particular publication
    public function show(Publication $publication){
        return inertia('Admin/Publications/Show',compact('publication'));
    }

    //delete a publication
    public function destroy(Publication $publication)
    {
        // Delete the file from storage if it exists
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }

        $publication->delete();
        $user = Auth::user();
        $success= 'Publication Updated Successfully.';
        // Get research works owned by the user or where the user is a collaborator
        $publications = Publication::where('author_id', $user->id)
            ->get();
        return inertia('Admin/Publications/Index',compact('success', 'publications'));
    }
}
