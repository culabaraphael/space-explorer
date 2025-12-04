<?php

namespace App\Http\Controllers;

use App\Services\NasaApiService;
use Inertia\Inertia;

class DiscoveryController extends Controller
{
    public function daily()
    {
        $nasaService = new NasaApiService();

        // Get 15 days of APOD data
        $allApods = $nasaService->getLatestApods(15);

        // Filter out videos, keep only images
        $apods = array_filter($allApods, function($apod) {
            return isset($apod['media_type']) &&
                   $apod['media_type'] === 'image' &&
                   !empty($apod['url']);
        });

        // Re-index array
        $apods = array_values($apods);

        // Get the first one as "today's" APOD
        $apod = !empty($apods) ? $apods[0] : null;

        return Inertia::render('DailyDiscovery', [
            'apod' => $apod,
            'gallery' => array_slice($apods, 0, 6), // Pass 6 images for gallery
        ]);
    }

    public function explore()
    {
        $nasaService = new NasaApiService();

        // Get 30 days of APOD and filter out videos
        $allApods = $nasaService->getLatestApods(30);

        // Filter out videos, keep only images
        $apods = array_filter($allApods, function($apod) {
            return isset($apod['media_type']) &&
                   $apod['media_type'] === 'image' &&
                   !empty($apod['url']);
        });

        // Re-index array
        $apods = array_values($apods);

        return Inertia::render('Explore', [
            'apods' => $apods,
        ]);
    }
}
