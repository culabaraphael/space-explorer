<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class NasaApiService
{
    /**
     * NASA API base URL
     */
    private const BASE_URL = 'https://api.nasa.gov/planetary/apod';

    /**
     * NASA Image Library base URL
     */
    private const IMAGE_LIBRARY_URL = 'https://images-api.nasa.gov/search';

    /**
     * API Key - DEMO_KEY has 30 requests/hour limit
     * Get your own key at: https://api.nasa.gov/
     */
    private const API_KEY = 'yPd38NG4VfRaXMH0A1cIaLgwX37tXV3dZQm47hwH';

    /**
     * Fetch Astronomy Picture of the Day for a specific date
     *
     * @param string|null $date Date in YYYY-MM-DD format (default: today)
     * @return array|null
     */
    public function getApodForDate($date = null)
    {
        // Use today's date if none provided
        $date = $date ?? Carbon::today()->subYear()->toDateString(); // Subtract 1 year

        // Create cache key
        $cacheKey = "nasa_apod_{$date}";

        // Cache for 1 hour (3600 seconds)
        return Cache::remember($cacheKey, 3600, function () use ($date) {
            try {
                Log::info("NASA API called for date: {$date}");

                $response = Http::withoutVerifying()->timeout(10)->get(self::BASE_URL, [
                    'api_key' => self::API_KEY,
                    'date' => $date,
                ]);

                if ($response->successful()) {
                    return $response->json();
                }

                // Log error if API call fails
                Log::error('NASA API Error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return null;
            } catch (\Exception $e) {
                Log::error('NASA API Exception: ' . $e->getMessage());
                return null;
            }
        });
    }

    /**
     * Fetch multiple APODs (latest N days)
     *
     * @param int $count Number of images to fetch
     * @return array
     */
    public function getLatestApods($count = 10)
    {
        $apods = [];
        $today = Carbon::today()->subYear(); // Subtract 1 year to match current date fix

        for ($i = 0; $i < $count; $i++) {
            $date = $today->copy()->subDays($i)->toDateString();
            $apod = $this->getApodForDate($date);

            if ($apod && isset($apod['url'])) {
                $apods[] = $apod;
            }
        }

        return $apods;
    }

    /**
     * Search APOD by date range
     *
     * @param string $startDate Start date (YYYY-MM-DD)
     * @param string $endDate End date (YYYY-MM-DD)
     * @return array
     */
    public function getApodsInRange($startDate, $endDate)
    {
        $cacheKey = "nasa_apod_range_{$startDate}_{$endDate}";

        return Cache::remember($cacheKey, 3600, function () use ($startDate, $endDate) {
            try {
                $response = Http::withoutVerifying()->timeout(10)->get(self::BASE_URL, [
                    'api_key' => self::API_KEY,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ]);

                if ($response->successful()) {
                    return $response->json();
                }

                Log::error('NASA API Range Error', [
                    'status' => $response->status(),
                ]);

                return [];
            } catch (\Exception $e) {
                Log::error('NASA API Range Exception: ' . $e->getMessage());
                return [];
            }
        });
    }

    /**
     * Search NASA Image Library by keyword
     *
     * @param string $keyword Search term (e.g., "planet", "mars", "asteroid")
     * @param int $count Number of images to fetch
     * @return array
     */
    public function searchImages($keyword, $count = 12)
    {
        $cacheKey = "nasa_search_{$keyword}_{$count}";

        return Cache::remember($cacheKey, 3600, function () use ($keyword, $count) {
            try {
                Log::info("NASA Image Library search for: {$keyword}");

                $response = Http::withoutVerifying()->timeout(10)->get(self::IMAGE_LIBRARY_URL, [
                    'q' => $keyword,
                    'media_type' => 'image',
                    'page_size' => $count,
                ]);

                if ($response->successful()) {
                    $data = $response->json();

                    if (isset($data['collection']['items']) && count($data['collection']['items']) > 0) {
                        // Transform the data to match our APOD format
                        return collect($data['collection']['items'])->map(function ($item) {
                            $imageUrl = $item['links'][0]['href'] ?? null;
                            $itemData = $item['data'][0] ?? [];

                            return [
                                'url' => $imageUrl,
                                'title' => $itemData['title'] ?? 'Untitled',
                                'explanation' => $itemData['description'] ?? 'No description available',
                                'date' => isset($itemData['date_created'])
                                    ? Carbon::parse($itemData['date_created'])->format('Y-m-d')
                                    : Carbon::now()->format('Y-m-d'),
                                'media_type' => 'image',
                                'hdurl' => $imageUrl, // Use same URL for HD
                            ];
                        })->toArray();
                    }
                }

                Log::warning("No results found for search: {$keyword}");
                return [];

            } catch (\Exception $e) {
                Log::error('NASA Image Library API Error: ' . $e->getMessage());
                return [];
            }
        });
    }
}
