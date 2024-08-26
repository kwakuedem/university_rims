<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function show($authorName)
{
    // Find the author by name
    $author = User::where('name', 'LIKE', "%{$authorName}%")->firstOrFail();

    // Fetch publications by this author
    $publications = Publication::with('author')
        ->where('author_id', $author->id)
        ->where('status', 'published')
        ->paginate(10);

    // Fetch collaborations where the user is a collaborator
    $collaborations = Collaboration::where('collaborator_id', $author->id)
        ->with('publication')
        ->get();

    return inertia('AuthorShow', [
        'author' => $author,
        'publications' => $publications,
        'collaborations' => $collaborations,
    ]);
}
}
