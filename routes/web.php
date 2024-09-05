<?php

use App\Http\Controllers\Admin\AdminCollaborationController;
use App\Http\Controllers\Admin\AdminPublicationController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\QualificationController;
use Illuminate\Support\Facades\Route;


Route::get('/',[PagesController::class,'index'])->name('home');
Route::post('/contact',[PagesController::class,'store']);
Route::get('/contact',[PagesController::class,'contact'])->name('contact');
Route::get('/about',[PagesController::class,'about'])->name('about');
Route::get('/authors/{authorName}', [AuthorController::class, 'show'])->name('author.profile');
Route::get('/publication/{title}',[PagesController::class,'show'])->name('read');
Route::get('/publications/{publication}/download', [PublicationController::class, 'download'])->name('publication.download');

Route::middleware('auth','role:author')->group(function () {
    Route::get('/dashboard',[PublicationController::class,'dashboard'])->name('dashboard');
   });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('profile/qualifications', QualificationController::class);
});

//publications route
Route::middleware('auth')->group(function () {
   Route::resource('publications',PublicationController::class);
});


//collaboration route
Route::middleware('auth')->group(function () {
    Route::post('/collaborations/{publication}', [CollaborationController::class, 'store'])->name('collaborations.store');
    Route::resource('collaborations', CollaborationController::class)->only(['index']);
});

// //collaboration route
// Route::post('/publications/{publication}/collaborators', [CollaborationController::class, 'store'])
//     ->name('collaborations.store');

//Admin routes
Route::middleware(['auth', 'verified','role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/',[AdminPublicationController::class,'dashboard'])->name('dashboard');
    Route::resource('/publications',AdminPublicationController::class);
    Route::resource('/departments',DepartmentController::class);
    Route::resource('/collaborations',AdminCollaborationController::class)->except('edit','create','destroy','update','show');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/roles', [AdminController::class, 'roles'])->name('roles');
    Route::post('/assign-role', [AdminController::class, 'assignRole'])->name('assignRole');
    Route::post('/revoke-role', [AdminController::class, 'revokeRole'])->name('revokeRole'); 
    Route::get('/profile', [ProfileController::class, 'editadmin'])->name('profile.editadmin');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__ . '/auth.php';
