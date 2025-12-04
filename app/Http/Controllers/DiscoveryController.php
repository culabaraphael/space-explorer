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
        $apod = $this->nasaService->getApodForDate();

        return Inertia::render('DailyDiscovery', [
            'apod' => $apod,
        ]);
    }

    /**
     * Display gallery of recent discoveries
     */
    public function explore()
    {
        $apods = $this->nasaService->getLatestApods(12);

        return Inertia::render('Explore', [
            'apods' => $apods,
        ]);
    }
}
