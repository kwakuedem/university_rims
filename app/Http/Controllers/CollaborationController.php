<?php

namespace App\Http\Controllers;
use App\Models\Collaboration;
use App\Models\ExternalUserCollaboration;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollaborationController extends Controller
{

    //get collaborated work for each user
   public function index(){
        $publications=Publication::whereHas('collaborations',function($query){
            $query->where('collaborator_id',Auth::User()->id);
        })->latest()->get();

        return inertia('Collaborations/Index',compact('publications')); 
        }

    //add  collaborators to publication

    public function store(Request $request, Publication $publication)
    {

        // Validate the request
        $request->validate([
            'collaborators' => 'array',
            'collaborators.*.id' => 'nullable|exists:users,id',
            'collaborators.*.name' => 'nullable|string',
        ]);

        foreach ($request->input('collaborators', []) as $collaborator) {
            // If the collaborator has a name but no ID, it's an external collaborator
            if ($collaborator['name'] && !$collaborator['id']) {
                // Check if the external collaborator is already added
                $exists = ExternalUserCollaboration::where('publication_id', $publication->id)
                            ->where('name', $collaborator['name'])
                            ->exists();

                if (!$exists) {
                    // Create a new external collaborator entry
                    ExternalUserCollaboration::create([
                        'publication_id' => $publication->id,
                        'name' => $collaborator['name'],
                    ]);
                } else {
                    // If the collaborator already exists, redirect back with an error message
                    return redirect()->back()->withErrors(['error' => $collaborator['name'] . ' is already a collaborator!']);
                }
            } else if ($collaborator['id']) {
                // If the collaborator has an ID, it's an internal collaborator
                // Check if the collaborator is already added
                $exists = Collaboration::where('publication_id', $publication->id)
                            ->where('collaborator_id', $collaborator['id'])
                            ->exists();

                if (!$exists) {
                    // Create a new internal collaborator entry
                    Collaboration::create([
                        'publication_id' => $publication->id,
                        'collaborator_id' => $collaborator['id'],
                    ]);
                }
            }
        }

        // Redirect to the publications index with a success message
        return redirect()->route('publications.index')->with('success', 'Collaborators added successfully.');
    }


}
