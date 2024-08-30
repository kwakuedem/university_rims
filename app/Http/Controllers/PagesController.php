<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class PagesController extends Controller
{
    public function index(){
       $publications = Publication::with(['author', 'collaborations' => function($query) {
        $query->select('name', 'publication_id');
    },'externalCollaborations' => function($query) {
        $query->select('name', 'publication_id');
    }])->where('status', 'published')->distinct()->latest()->paginate(10);

    $authors = User::select('name', 'profile_photo', 'research_area', 'bio')->distinct()->get();

    // Return the publications data to the Inertia component, along with login/register route availability
    return inertia('Index', [
        'publications' => $publications,
        'authors'=>$authors,
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

    //get contact page
    public function contact(){
        return inertia('Contact');
    }

    //store contact messages
    public function store(Request $request){
        $validData=$request->validate([
            'name'=>'string',
            'email'=>'email|string',
            'message'=>'string'
        ]);

        ContactUs::create($validData);
        return inertia('Contact',['success'=>'Message Submitted Successfull. Thanks For Contacting Us']);
    }

    
    //display publication detail page
    public function show($title){
       $publication = Publication::where('title', 'LIKE', "%{$title}%")->firstOrFail();
        $research = Publication::with('author')->where('id',$publication->id)->get();
        $publication->increamentView();
        return inertia('Show',compact('research'));
    }
}
