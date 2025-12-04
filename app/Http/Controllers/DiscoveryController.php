<?php

namespace App\Http\Controllers;

use App\Services\NasaApiService;
use Inertia\Inertia;

class DiscoveryController extends Controller
{
    /**
     * NASA API Service
     */
    private $nasaService;

    /**
     * Inject the NASA service
     */
    public function __construct(NasaApiService $nasaService)
    {
        $this->nasaService = $nasaService;
    }

    /**
     * Display today's astronomy picture
     */
    public function daily()
    {
        $nasaService = new NasaApiService();
        $apod = $nasaService->getApodForDate();

        return Inertia::render('DailyDiscovery', [
            'auth' => [
                'user' => auth()->user()
            ],
            'apod' => $apod,
        ]);
    }

    public function explore()
    {
        $nasaService = new NasaApiService();
        $apods = $nasaService->getLatestApods(12);

        return Inertia::render('Explore', [
            'auth' => [
                'user' => auth()->user()
            ],
            'apods' => $apods,
        ]);
    }
}
