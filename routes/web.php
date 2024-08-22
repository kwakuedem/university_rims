<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\CollaborationsController;
use App\Http\Controllers\CollaboratorController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ResearchController;
use App\Models\Publication;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/',[PagesController::class,'index'])->name('home');
Route::post('/contact',[PagesController::class,'store']);
Route::post('/',[PagesController::class,'filter'])->name('author.filter');
Route::get('/contact',[PagesController::class,'contact'])->name('contact');
Route::get('/about',[PagesController::class,'about'])->name('about');
Route::get('/author/{id}/profile',[PagesController::class,'profile'])->name('author.profile');
Route::get('/publications/{publication}/read',[PagesController::class,'show'])->name('read');
Route::get('/publications/{publication}/download', [PublicationController::class, 'download'])->name('publication.download');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard',[PublicationController::class,'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//collaboration route
Route::middleware('auth')->group(function () {
   Route::resource('publications',PublicationController::class);
   Route::patch('/publications/{publication}/update-status', [PublicationController::class, 'updateStatus'])
    ->name('publications.update-status');
//    Route::put('publications/{publication}',[PublicationController::class,'updatestatus'])->name('publications.updatestatus');
});


//collaboration route
Route::middleware('auth')->group(function () {
    Route::resource('collaborations', CollaborationController::class)->except(['edit']);
    Route::delete('/collaborations/{collaboration}', [CollaboratorController::class, 'cancel'])->name('collaborations.cancel');
    // Route::patch('/collaborations/{collaborator}/accept', [CollaboratorController::class, 'accept'])->name('collaborations.accept');
    // Route::patch('/collaborations/{collaborator}/reject', [CollaboratorController::class, 'reject'])->name('collaborations.reject');
});


//Admin routes
Route::middleware(['auth', 'verified','role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/publications',[AdminController::class,'publications'])->name('publications');
    Route::get('/collaborations',[AdminController::class,'collaborations'])->name('collaborations');
    Route::resource('/publications',AdminController::class)->except('index');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/roles', [AdminController::class, 'roles'])->name('roles');
    Route::post('/assign-role', [AdminController::class, 'assignRole'])->name('assignRole');
    Route::post('/revoke-role', [AdminController::class, 'revokeRole'])->name('revokeRole'); 
});

Route::post('/publications/{publication}/collaborators', [CollaborationController::class, 'store'])
    ->name('collaborations.store');



require __DIR__ . '/auth.php';
