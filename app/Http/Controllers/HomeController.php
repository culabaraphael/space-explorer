<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the landing page
     */
    public function index()
    {
        return Inertia::render('Home');
    }
}
