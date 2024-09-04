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
        if ($collaborator['name'] && $collaborator['name'] !== null) {
            // Check if the external collaborator is already added
            $exists = ExternalUserCollaboration::where('publication_id', $publication->id)
                        ->where('name', $collaborator['name'])
                        ->exists();

            if (!$exists) {
                dd('external ',$publication->id, $collaborator['name']);
                ExternalUserCollaboration::create([
                    'publication_id' => $publication->id,
                    'name' => $collaborator['name']
                ]);
            }else{
                return inertia('Publications/Edit', ['error' => $collaborator['name'] .' is Already a Collaborator!']);
            }
        } else {
            // Check if the collaborator is already added
            $exists = Collaboration::where('publication_id', $publication->id)
                        ->where('collaborator_id', $collaborator['id'])
                        ->exists();

            if (!$exists) {
                dd('internal',$publication->id);
                Collaboration::create([
                    'publication_id' => $publication->id,
                    'collaborator_id' => $collaborator['id']
                ]);
            }
        }
    }

    return redirect()->route('publications.index');
}

}
