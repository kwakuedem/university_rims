<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
   
    public function index()
    {
        $publication=Publication::count();
         $statistics = [
            'months' => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'publications' => [5, 15, 15, 20, 10, 20, 35, 40, 30, 50, 55, 60],
    ];
        return Inertia::render('Admin/Dashboard',compact('statistics','publication'));
    }

    public function users()
    {
        // $users = User::with('roles')->get();
       $users = User::all();

        return Inertia::render('Admin/Users', compact('users'));
    }

    public function roles()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Roles', [
            'roles' => $roles,
        ]);
    }

    public function assignRole(Request $request)
    {
        $user = User::find($request->user_id);
        $user->assignRole($request->role);

        return redirect()->back()->with('success', 'Role assigned successfully.');
    }

    public function revokeRole(Request $request)
    {
        $user = User::find($request->user_id);
        $user->removeRole($request->role);

        return redirect()->back()->with('success', 'Role revoked successfully.');
    }


     public function publications()
{
    // Get the authenticated user
    $publications = Publication::all();
    return inertia('Publications/Index',compact('publications'));
     }
   
     
     // Get create publication form
    public function create(){
        return inertia('Admin/Publications/Create');
    }
    

     //Admin Store publications
    public function store(Request $request){
        // Validate the request
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp|max:2048'
        ]);

        // Handle file upload
        $file = null;
        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path')->store('research_files', 'public');
        }

        Publication::create([
            'title' => $data['title'],
            'abstract' => $data['abstract'],
            'file_path' => $file,
            'user_id' => Auth::user()->id
        ]);

        // Return response (for example, redirect or Inertia response)
        return redirect()->route('admin.publications.index')->with('success', 'Research submitted successfully!');
    }

    //admin edit
    public function edit(Publication $publication){
         return inertia('Admin/Publications/Edit',compact('publication'));
    }



        //admin update
    public function update(Request $request, Publication $publication){
  
    // Validate the request
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'abstract' => 'required|string',
        'file_path' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,odp,odt|max:2048',
    ]);

    // Handle file upload if a new file is provided
    if ($request->hasFile('file_path')) {
        // Delete old file if it exists
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }
        $file = $request->file('file_path')->store('research_files', 'public');
    } else {
        $file = $publication->file_path;
    }

    // Update the data
    $publication->update([
        'title' => $data['title'],
        'abstract' => $data['abstract'],
        'file_path' => $file,
    ]);
    return redirect()->route('publications.index')->with('success', 'Publication updated successfully.');
}

// admin show publication
    public function show(Publication $publication){
        dd($publication);
        return inertia('Admin/Publications/Show',compact('publication'));
    }


public function collaborations()
{  
    $collaborations = Collaboration::with(['publication', 'collaborator'])
        ->where('collaborator_id', Auth::user()->id)
        ->latest() // Order by 'created_at' in descending order
        ->get();

    return inertia('Collaborations/Index', ['collaborations' => $collaborations]);
}
    
}
