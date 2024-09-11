<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments=Department::select('id','name','description')->latest()->get();
        return Inertia::render('Admin/Departments/Index',compact('departments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $data=$request->validate([
            'name'=>'required|string|unique:departments,name|max:50',
            'description'=>'nullable|string|max:150'
        ]);

        if(!$data['description'] || $data['description']==" "){
            $data['description']="";
        }

        Department::create([
            'name'=>$data['name'],
            'description'=>$data['description']
        ]);
        return redirect()->route('admin.departments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return inertia('Admin/Departments/Show',compact('department'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        return inertia('Admin/Departments/Edit',compact('department'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $data=$request->validate([
           'name'=>'required|string|max:50',
            'description'=>'nullable|string|max:150'
        ]);
         if(!$data['description'] || $data['description']==" "){
            $data['description']="";
        }
        $department->update([
            $department->name=$data['name'],
            $department->description=$data['description']
        ]);

        return redirect()->route('admin.departments.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->back();
    }
}
