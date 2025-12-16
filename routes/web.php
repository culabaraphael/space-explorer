<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\DiscoveryController;
use App\Http\Controllers\JourneyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes - No Authentication Required
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/daily-discovery', [DiscoveryController::class, 'daily'])
    ->name('daily.discovery');

Route::get('/explore', [DiscoveryController::class, 'explore'])
    ->name('explore');

Route::get('/planets', function () {
    return inertia('Planets');
})->name('planets');

/*
|--------------------------------------------------------------------------
| Protected Routes - Authentication Required
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    // My Journey - View saved discoveries
    Route::get('/my-journey', [JourneyController::class, 'index'])
        ->name('my.journey');

    // CRUD Operations for discoveries
    Route::post('/my-journey/save', [JourneyController::class, 'store'])
        ->name('journey.store');

    Route::put('/my-journey/{discovery}', [JourneyController::class, 'update'])
        ->name('journey.update');

    Route::delete('/my-journey/{discovery}', [JourneyController::class, 'destroy'])
        ->name('journey.destroy');

    // User Profile (from Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (from Breeze)
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';
