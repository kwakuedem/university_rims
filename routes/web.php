<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\ResearcherController;
use App\Http\Middleware\CheckRole;
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

// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin', function () {
//         return Inertia::render('Dashboard');
//     })->name('admin.dashboard');
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/admin', [AdminController::class, 'index'])->middleware('role:admin');
Route::get('/researcher', [ResearcherController::class, 'index'])->middleware(CheckRole::class);



//collaboration route
Route::middleware('auth', 'role:admin')->group(function () {
    Route::resource('collaborations', CollaborationController::class)->except(['edit']);
    Route::resource('publications',ResearchController::class);
});

require __DIR__ . '/auth.php';
