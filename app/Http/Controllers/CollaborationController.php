<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\Research;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollaborationController extends Controller
{
// public function index()
// {
//     $collaborations = Collaboration::with('research', 'user')
//         ->where('collaborator_id', Auth::id())
//         ->get();

//     return inertia('Collaborations/Index', [
//         compact('collaborations')
//     ]);
// }


    public function index()
{
    $userId = auth()->user()->id;
    
    $collaborations = Collaboration::with(['research', 'user', 'collaborator'])
        ->where('user_id', $userId)
        ->orWhere('collaborator_id', $userId)
        ->get();

    return inertia('Collaborations/Index', ['collaborations' => $collaborations]);
}


    public function create()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();
        $researches = Research::where('user_id', auth()->user()->id)->get();
        
         $collaborations = Collaboration::with(['research', 'user', 'collaborator'])
        ->where('user_id', Auth::id())
        ->orWhere('collaborator_id', Auth::id())
        ->get();

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
        Collaboration::create([
            'research_id' => $request->input('research_id'),
            'user_id' => auth()->user()->id,
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


// //update invitation to accept
// public function accept(Collaboration $collaboration)
// {
//     if ($collaboration->collaborator_id !== Auth::id()) {
//         return redirect()->route('collaborations.index')->with('error', 'Unauthorized action.');
//     }

//     $collaboration->update(['status' => 'accepted']);

//     return redirect()->route('collaborations.index')->with('success', 'Collaboration accepted.');
// }

// //update invitation to reject
// public function reject(Collaboration $collaboration)
// {
//     if ($collaboration->collaborator_id !== Auth::id()) {
//         return redirect()->route('collaborations.index')->with('error', 'Unauthorized action.');
//     }
    
//     $collaboration->update(['status' => 'rejected']);

//     return redirect()->route('collaborations.index')->with('success', 'Collaboration rejected.');
// }


// //cancel invitation
// public function cancel(Collaboration $collaboration)
//     {
//         $collaboration = Collaboration::where('id', $collaboration->id)->where('user_id', Auth::id())->firstOrFail();
//         $collaboration->delete();

//         return redirect()->route('collaborations.create')
//             ->with('success', 'Collaboration invitation canceled.');
//     }


public function cancel(Collaboration $collaboration)
    {
        // Ensure the collaboration belongs to the authenticated user
        if ($collaboration->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $collaboration->delete();

        return redirect()->route('collaborations.create')
            ->with('success', 'Collaboration invitation canceled.');
    }

    public function accept(Collaboration $collaboration)
    {
        // Ensure the collaboration is for the authenticated user and status is pending
        if ($collaboration->collaborator_id !== Auth::id() || $collaboration->status !== 'pending') {
            abort(403, 'Unauthorized action.');
        }

        $collaboration->update(['status' => 'accepted']);

        return redirect()->route('collaborations.index')
            ->with('success', 'Collaboration invitation accepted.');
    }

    public function reject(Collaboration $collaboration)
    {
        // Ensure the collaboration is for the authenticated user and status is pending
        if ($collaboration->collaborator_id != Auth::id() || $collaboration->status != 'pending') {
            abort(403, 'Unauthorized action.');
        }

        $collaboration->update(['status' => 'rejected']);

        return redirect()->route('collaborations.index')
            ->with('success', 'Collaboration invitation rejected.');
    }



    // public function update(Request $request, Collaboration $collaboration)
    // {
    //     $request->validate([
    //         'status' => 'required|in:pending,accepted,rejected',
    //     ]);

    //     $collaboration = Collaboration::findOrFail($collaboration);
    //     $collaboration->update([
    //         'status' => $request->input('status'),
    //     ]);

    //     return redirect()->back()->with('success', 'Collaboration status updated.');
    // }

    public function destroy(Collaboration $collaboration)
    {
        $this->authorize('delete', $collaboration);
        $collaboration->delete();

        return redirect()->back()->with('success', 'Collaboration invitation deleted.');
    }
}
