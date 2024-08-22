<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use Illuminate\Support\Facades\Route;


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

//publications route
Route::middleware('auth')->group(function () {
   Route::resource('publications',PublicationController::class);
});


//collaboration route
Route::middleware('auth')->group(function () {
    Route::resource('collaborations', CollaborationController::class)->only(['index','store']);
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

//collaboration route
Route::post('/publications/{publication}/collaborators', [CollaborationController::class, 'store'])
    ->name('collaborations.store');



require __DIR__ . '/auth.php';
