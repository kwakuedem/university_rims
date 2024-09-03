<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PublicationController extends Controller
{
    public function dashboard()
{
    $publications = Publication::where('author_id',Auth::user()->id);
    
    $collaborations=Publication::whereHas('collaborations',function($query){
        $query->where('collaborator_id',Auth::User()->id);
    })->get();

    $numberOfResearch=$publications->count();
    $numberOfCollaborations=$collaborations->count();


   // Dynamic statistics for publications per month
     $statistics = [
        'years' => [],
        'publications' => [],
        'collaborations' => [],
    ];

    $years = Publication::selectRaw('YEAR(created_at) as year')->distinct()->orderBy('year')->pluck('year');

    foreach ($years as $year) {
        $statistics['years'][] = $year;
        $statistics['publications'][] = Publication::where('author_id', Auth::user()->id)
            ->whereYear('created_at', $year)
            ->count();

        $statistics['collaborations'][] = Publication::whereHas('collaborations', function($query){
            $query->where('collaborator_id', Auth::user()->id);
        })->whereYear('created_at', $year)
        ->count();
    }



    return inertia('Dashboard', compact('statistics','numberOfResearch','numberOfCollaborations'));
}

     // Get all research work
    public function index(){
        
        $user = Auth::user();

        // Get research works owned by the user or where the user is a collaborator
     $publications = Publication::with('author:id,name') // Load author relationship with only id and name columns
    ->where('author_id', Auth::user()->id) // Filter by the authenticated user's ID
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
        $publications = Publication::where('author_id', Auth::user()->id)
            ->get();
        $success= 'Publication Created Successfully.';

        // Return response (for example, redirect or Inertia response)
        return inertia('Publications/Index',compact('success', 'publications'));
    }


    //get publication edit page
    public function edit(Publication $publication){
        $collaborators=User::where('id', '!=', Auth::id())->where('name','!=','none')->get();
         return inertia('Publications/Edit',compact('publication','collaborators'));
    }



public function update(Request $request, Publication $publication)
{
    // Validate the request
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'abstract' => 'required|string',
        'status' => 'required|string|in:published,unpublished',
    ]);

    // Check if 'file_path' is present and it's a file, not a string
    if ($request->hasFile('file_path')) {
        // Handle file upload
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }
        $fileName = $request->file('file_path')->getClientOriginalName();
        $file = $request->file('file_path')->storeAs('research_files', $fileName, 'public');
        $data['file_path'] = $file;
    } else {
        // Keep the old file path if no new file is uploaded
        $data['file_path'] = $publication->file_path;
    }

    // Update the publication
    $publication->update($data);

    // Return response...

     $user = Auth::user();
        $success= 'Publication Updated Successfully.';
            // Get research works owned by the user or where the user is a collaborator
            $publications = Publication::where('author_id', $user->id)
                ->get();
        return inertia('Publications/Index',compact('success','publications'));
}


    // //update publication function
    // public function update(Request $request, Publication $publication){
    
    //     // Validate the request
    //     $data = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'abstract' => 'required|string',
    //         // 'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp,odt|max:2048',
    //         'status'=>'required|string|in:published,unpublished',
    //     ]);

    //     // Handle file upload if a new file is provided
    //     if ($request->hasFile('file_path')) {
    //     // Delete old file if it exists
    //         if ($publication->file_path) {
    //             Storage::disk('public')->delete($publication->file_path);
    //         }
    //         $fileName = $request->file('file_path')->getClientOriginalName();
    //         $file = $request->file('file_path')->storeAs('research_files', $fileName, 'public');
    //     } else {
    //         // Keep the old file path if no new file is uploaded
    //         $file = $publication->file_path;
    //     }

    //     // Update the data
    //     $publication->update([
    //         'title' => $data['title'],
    //         'abstract' => $data['abstract'],
    //         'file_path' => $file,
    //         'status'=>$data['status']
    //     ]);

    //     $user = Auth::user();
    //     $success= 'Publication Updated Successfully.';
    //         // Get research works owned by the user or where the user is a collaborator
    //         $publications = Publication::where('author_id', $user->id)
    //             ->get();
    //     return inertia('Publications/Index',compact('success','publications'));
    // }

//     public function update(Request $request, Publication $publication)
// {
//     // Validate the request
//     // dd($request->all());
//     $data = $request->validate([
//         'title' => 'required|string|max:255',
//         'abstract' => 'required|string',
//         'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp,odt|max:2048', // nullable makes this optional
//         'status' => 'required|string|in:published,unpublished',
//     ]);
//     // dd($data);
//     // Handle file upload if a new file is provided
//     if ($request->hasFile('file_path')) {
//         // Delete old file if it exists
//         if ($publication->file_path) {
//             Storage::disk('public')->delete($publication->file_path);
//         }
//         $fileName = $request->file('file_path')->getClientOriginalName();
//         $file = $request->file('file_path')->storeAs('research_files', $fileName, 'public');
//     } else {
//         // Keep the old file path if no new file is uploaded
//         $file = $publication->file_path;
//     }

//     // Update the data
//     $publication->update([
//         'title' => $data['title'],
//         'abstract' => $data['abstract'],
//         'file_path' => $file,
//         'status' => $data['status'],
//     ]);

//     $user = Auth::user();
//     $success = 'Publication Updated Successfully.';

//     // Get research works owned by the user or where the user is a collaborator
//     $publications = Publication::where('author_id', $user->id)->get();

//     return inertia('Publications/Index', compact('success', 'publications'));
// }


    //show particular publication
    public function show(Publication $publication){
        return inertia('Publications/Show',compact('publication'));
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
        return inertia('Publications/Index',compact('success', 'publications'));
    }


// function that handles document download
public function download($publicationName)
{
    $publicationName=Publication::where('title', 'LIKE', "%{$publicationName}%")->firstOrFail();

   

    if ($publicationName->file_path && Storage::disk('public')->exists($publicationName->file_path)) {
         $publicationName->increamentDownloads();
        return Storage::disk('public')->download($publicationName->file_path);
    }
    return redirect()->back()->with('error', 'File not found.');
}


}
