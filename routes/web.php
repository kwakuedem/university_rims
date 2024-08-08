<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SubmissionController;
use App\Http\Middleware\CheckRole;
use App\Models\Research;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard',[ResearchController::class,'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/admin', [AdminController::class, 'index'])->middleware('role:admin');
// Route::get('/researcher', [ResearcherController::class, 'index'])->middleware(CheckRole::class);



//collaboration route
Route::middleware('auth')->group(function () {
    Route::resource('collaborations', CollaborationController::class)->except(['edit']);
    Route::resource('publications',ResearchController::class);
    Route::resource('collaborations/chats',ChatController::class);

    Route::delete('/collaborations/{collaboration}', [CollaborationController::class, 'cancel'])->name('collaborations.cancel');
    Route::patch('/collaborations/{collaboration}/accept', [CollaborationController::class, 'accept'])->name('collaborations.accept');
    Route::patch('/collaborations/{collaboration}/reject', [CollaborationController::class, 'reject'])->name('collaborations.reject');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('submissions', SubmissionController::class);
    Route::resource('reviews', ReviewController::class)->only(['create', 'store']);
    // Route::resource('researches', ResearchController::class);
});

//Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/roles', [AdminController::class, 'roles'])->name('roles');
    Route::get('/permissions', [AdminController::class, 'permissions'])->name('permissions');
    Route::post('/assign-role', [AdminController::class, 'assignRole'])->name('assignRole');
    Route::post('/revoke-role', [AdminController::class, 'revokeRole'])->name('revokeRole');
});



require __DIR__ . '/auth.php';
