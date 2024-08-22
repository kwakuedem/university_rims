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
        $publications = Publication::with(['author', 'collaborations.collaborator'])->where('status', 'published')->latest()->paginate(2);

    // Return the publications data to the Inertia component, along with login/register route availability
    return inertia('Index', [
        'publications' => $publications,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
    }

    //search for author
    public function filter(Request $request){
        $search=$request['search'];
        $author=User::select('name')->where('name','like','%'. $search .'%')->get();
        return inertia('Index',compact('author'));
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
    public function show(Publication $publication){
       
        $research = Publication::with('author')->where('id',$publication->id)->get();
        $publication->increamentView();
        return inertia('Show',compact('research'));
    }
}
