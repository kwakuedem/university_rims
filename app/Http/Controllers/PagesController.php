<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class PagesController extends Controller
{
    public function index(Request $request)
    {
        $publications = Publication::with([
            'author' => function ($query) {
                $query->select('id', 'name', 'department_id')->with([
                    'department' => function ($query) {
                        $query->select('id', 'name');
                    }
                ]);
            },
            'collaborations' => function ($query) {
                $query->select('name', 'publication_id');
            },
            'externalCollaborations' => function ($query) {
                $query->select('name', 'publication_id');
            }
        ])->where('status', 'published')
        ->latest() // Removed distinct() as it's not needed in this context
        ->paginate(10);

        // Cache the authors list if it does not change often
        $authors = Cache::remember('distinct_authors', now()->addMinutes(60), function () {
            return User::with('department:name,id')  // Load the department relationship
                ->select('name', 'profile_photo', 'research_area', 'bio', 'department_id')  // Include department_id to join with
                ->distinct()
                ->where('name', '!=', 'Developer')
                ->where('name', '!=', 'Admin')
                ->get()
                ->map(function ($user) {
                    return [
                        'name' => $user->name,
                        'profile_photo' => $user->profile_photo,
                        'research_area' => $user->research_area,
                        'bio' => $user->bio,
                        'department_name' => $user->department->name,  // Add department name
                    ];
                });
        });
        
        return inertia('Index', [
            'publications' => $publications,
            'authors' => $authors,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
    //get about page
    public function about(){
        return inertia('About');
    }

    //show authors profile
    public function profile($id){
        $author=Publication::with('author')->where('author_id',$id);
        return inertia('AuthorProfile',compact('author'));
    }


    //store contact messages
    public function store(Request $request){
        $validData=$request->validate([
            'name'=>'string',
            'email'=>'email|string',
            'message'=>'string'
        ]);

        ContactUs::create($validData);
        return redirect()->route('about');
    }

    
    //display publication detail page
    public function show($title){
       $publication = Publication::where('title', 'LIKE', "%{$title}%")->firstOrFail();
        $research = Publication::with('author')->where('id',$publication->id)->get();
        $publication->increamentView();
        return inertia('Show',compact('research'));
    }
}
