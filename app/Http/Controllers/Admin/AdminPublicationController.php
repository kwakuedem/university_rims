<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class AdminPublicationController extends Controller
{
     public function dashboard()
{
    
    $excludedRoles = ['admin', 'developer'];
    $excludedRoleIds = Role::whereIn('name', $excludedRoles)->pluck('id');

    // Exclude users with the "admin" role
    $excludedRoles = ['admin'];

    $departmentCounts = User::select('department_id', DB::raw('count(*) as total'))
        ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
        ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
        ->whereNotIn('roles.name', $excludedRoles)
        ->groupBy('department_id')
        ->get()
        ->mapWithKeys(function ($item) {
            $departmentName = Department::find($item->department_id)->name ?? 'Unknown';
            return [
                $departmentName => $item->total
            ];
        });

    // Exclude departments with the name "Administrator"
    $excludedDepartmentIds = Department::where('name', 'Administrator')->pluck('id');

    $filteredDepartmentCounts = $departmentCounts->filter(function ($total, $departmentName) use ($excludedDepartmentIds) {
        $departmentId = Department::where('name', $departmentName)->pluck('id')->first();
        return !in_array($departmentId, $excludedDepartmentIds->toArray());
    });

    
    $numberOfUsers = User::whereDoesntHave('roles', function ($query) use ($excludedRoleIds) {
        $query->whereIn('id', $excludedRoleIds);
    })->count();
    $numberOfDepartments=Department::where('name','!=','administrator')->count();
    $numberOfResearch=Publication::count();
    $numberOfpublicationsWithoutCollaborations=Publication::doesntHave('collaborations')->count();
    $numberOfpublicationsWithCollaborations=Publication::whereHas('collaborations')->count();
    $numberOfPublished=Publication::where('status','published')->count();
    $numberOfUnpublished=Publication::where('status','unpublished')->count();

    // Dynamic statistics for publications per month
     $statistics = [
        'years' => [],
        'publications' => [],
        'collaborations' => [],
        'notcollaborations' => [],
        'departments'=>[],
        'users'=>[],
        'published'=>[],
        'unpublished'=>[]
    ];

    $statusstatistics = [
        'published' => Publication::where('status', 'published')->count(),
        'unpublished' => Publication::where('status', 'unpublished')->count(),
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

        // Fetch departments excluding "Administrator"
    $excludedDepartments = Department::where('name', 'Administrator')->pluck('id');

    $departments = Department::whereNotIn('id', $excludedDepartments)->get();

    // Fetch roles to exclude
    $excludedRoles = ['admin', 'developer'];

    // Fetch department-wise user statistics
    foreach ($departments as $department) {
        $userCount = User::where('department_id', $department->id)
            ->whereDoesntHave('roles', function ($query) use ($excludedRoles) {
                $query->whereIn('name', $excludedRoles);
            })
            ->count();

        $statistics['departments'][] = $department->name;
        $statistics['users'][] = $userCount;
    }

    $publicationByDepartmentstatistics = Publication::whereHas('author.department', function ($query) {
            $query->where('name', '!=', 'Administrator');
        })
        ->selectRaw('departments.name as department, count(*) as publication_count')
        ->join('users', 'publications.author_id', '=', 'users.id')  // Join with users (authors)
        ->join('departments', 'users.department_id', '=', 'departments.id')  // Join with author's department
        ->groupBy('departments.name')
        ->get()
        ->toArray();
    

    return inertia('Admin/Dashboard', compact('statistics','numberOfPublished','publicationByDepartmentstatistics',
    'numberOfUnpublished','numberOfResearch','numberOfUsers','numberOfDepartments',
    'numberOfpublicationsWithCollaborations','numberOfpublicationsWithoutCollaborations','statusstatistics'));
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

       
        return redirect()->route('admin.publications.index');
    }


    //get publication edit page
    public function edit(Publication $publication){
        $collaborators=User::where('id', '!=', Auth::id())->where('name','!=','admin')->where('name','!=','Developer')->get();
         return inertia('Admin/Publications/Edit',compact('publication','collaborators'));
    }



    //update publication function
    public function update(Request $request, Publication $publication){
    
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

   
        return redirect()->route('admin.publications.index');
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
       
       
        return redirect()->back();
    }
}
