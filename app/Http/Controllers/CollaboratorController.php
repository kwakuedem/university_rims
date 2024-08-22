<?php

namespace App\Http\Controllers;

use App\Models\Collaborator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollaboratorController extends Controller
{

 public function index()
{  
    $collaborations = Collaborator::with(['publication', 'collaborator'])
        ->where('collaborator_id', Auth::user()->id)
        ->latest() // Order by 'created_at' in descending order
        ->get();

    return inertia('Collaborations/Index', ['collaborations' => $collaborations]);
}


    public function create()
    {
       
        return inertia('Collaborations/Invite', compact('users', 'researches', 'collaborations'));
    }



  public function store(Request $request)
{
    //   dd($request->all());
    // Validate the request data
    $request->validate([
        'research_id' => 'required|exists:research,id', // Assuming the table is 'researches'
        'collaborator_id' => 'required|exists:users,id',
    ]);

   
//  dd($request->all());
    try {
        // Create a new Collaboration record
        Collaborator::create([
            'research_id' => $request->input('research_id'),
            'user_id' => Auth::user()->id,
            'collaborator_id' => $request->input('collaborator_id'),
            'status' => 'pending',
        ]       
        );

       

        // Redirect with success message
        return redirect()->route('collaborations.create')
            ->with('success', 'Collaboration invitation sent.');

    } catch (\Exception $e) {
        // Handle any errors that occur during the creation process
        return redirect()->route('collaborations.create')
            ->with('error', 'Failed to send collaboration invitation.');
    }
}
}
