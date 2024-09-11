<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages=ContactUs::latest()->get();
        return inertia('Admin/Contacts/Index',compact('messages'));
    }


    /**
     * Display the specified resource.
     */
    public function show(ContactUs $message)
    {
        return inertia('Admin/Contacts/Show',compact('message'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactUs $contactUs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContactUs $contactUs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactUs $message)
    {
        $message->delete();
        return redirect()->back();
    }
}
