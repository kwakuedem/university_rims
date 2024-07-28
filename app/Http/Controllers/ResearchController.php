<?php

namespace App\Http\Controllers;

use App\Models\Research;

class ResearchController extends Controller
{
    //get all reseach work

    public function index(){
        $user=auth()->user();
        $publications=Research::where('user_id',$user->id)->get();

        // dd($publications);
        return inertia('Collaborations/Index',['publications'=>$publications]);
    }
}
