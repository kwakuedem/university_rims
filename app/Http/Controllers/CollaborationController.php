<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use Illuminate\Http\Request;

class CollaborationController extends Controller
{
    public function index()
    {
        $collaborations = Collaboration::with(['research', 'user', 'collaborator'])->get();
        return inertia('Collaborations/Index', ['collaborations' => $collaborations]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'research_id' => 'required|exists:researches,id',
            'collaborator_id' => 'required|exists:users,id',
        ]);

        $collaboration = Collaboration::create([
            'research_id' => $request->research_id,
            'user_id' => auth()->id(),
            'collaborator_id' => $request->collaborator_id,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Collaboration invitation sent.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $collaboration = Collaboration::findOrFail($id);
        $collaboration->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Collaboration status updated.');
    }

    public function destroy($id)
    {
        $collaboration = Collaboration::findOrFail($id);
        $collaboration->delete();

        return redirect()->back()->with('success', 'Collaboration invitation deleted.');
    }
}
