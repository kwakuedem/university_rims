<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use App\Models\ExternalUserCollaboration;
use App\Models\Publication;
use Illuminate\Http\Request;

class AdminCollaborationController extends Controller
{
    public function index()
{  
    $publications = Publication::whereHas('collaborations')
        ->latest() // Order by 'created_at' in descending order
        ->get();

    return inertia('Admin/Collaborations/Index', ['publications' => $publications]);
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
                
                ExternalUserCollaboration::create([
                    
                    'publication_id' => $publication->id,
                    'name' => $collaborator['name']
                ]);
            }else{
                return inertia('Admin/Publications/Edit', ['error' => $collaborator['name'] .' is Already a Collaborator!']);
            }
        } else {
            // Check if the collaborator is already added
            $exists = Collaboration::where('publication_id', $publication->id)
                        ->where('collaborator_id', $collaborator['id'])
                        ->exists();

            if (!$exists) {
                
                Collaboration::create([
                    'publication_id' => $publication->id,
                    'collaborator_id' => $collaborator['id']
                ]);}
           
        }
    }

    return inertia('Admin/Publications/Edit', ['success' => 'Collaborators updated successfully!']);
}
}
