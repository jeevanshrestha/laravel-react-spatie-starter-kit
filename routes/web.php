<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Protected user management routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('users', UserController::class)->except(['show']);
});
Route::middleware(['auth' ])->group(function () {
    Route::resource('users', UserController::class)->only(['show']);
});


Route::middleware(['auth', 'permission:manage roles|manage permissions'])->group(function () {
    // Roles
    Route::resource('roles', RoleController::class)->except(['show']);
    
    // Permissions
    Route::resource('permissions', PermissionController::class)->except(['show']);
    
    // User Role Management
    Route::post('users/{user}/roles', [UserController::class, 'assignRoles'])->name('users.roles.assign');
    Route::delete('users/{user}/roles/{role}', [UserController::class, 'removeRole'])->name('users.roles.remove');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
