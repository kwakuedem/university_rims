<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResearcherController extends Controller
{
     public function index()
    {
        return inertia('Researcher/Index');
    }
}
