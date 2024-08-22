<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollaborationController extends Controller
{

   public function index(){
    $publications=Publication::whereHas('collaborations',function($query){
        $query->where('collaborator_id',Auth::User()->id);
    })->latest()->get();

    return inertia('Collaborations/Index',compact('publications')); 
    }

    //add  collaborators to publication
    public function store(Request $request, Publication $publication)
{
    $request->validate([
        'collaborators' => 'array',
        'collaborators.*' => 'exists:users,id',
    ]);

    // Remove existing collaborators for this publication
    // Collaboration::where('publication_id', $publicationId)->delete();

    // Add new collaborators
    foreach ($request->input('collaborators', []) as $collaboratorId) {
        Collaboration::create([
            'publication_id' => $publication->id,
            'collaborator_id' => $collaboratorId,
        ]);
    }

    return inertia('Publications/Edit',['success'=>'Collaborators updated successfully!']);
}
}
