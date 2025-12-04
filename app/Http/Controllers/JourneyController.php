<?php

namespace App\Http\Controllers;

use App\Models\SpaceDiscovery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JourneyController extends Controller
{
    /**
     * Display user's saved discoveries (READ)
     */
    public function index()
    {
        $discoveries = auth()->user()
            ->spaceDiscoveries()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MyJourney', [
            'discoveries' => $discoveries,
        ]);
    }

    /**
     * Save a new discovery (CREATE)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nasa_image_url' => 'required|url',
            'nasa_image_title' => 'required|string|max:255',
            'nasa_explanation' => 'required|string',
            'nasa_date' => 'required|date',
            'user_note' => 'nullable|string|max:1000',
        ]);

        // Check if user already saved this date
        $exists = SpaceDiscovery::where('user_id', auth()->id())
            ->where('nasa_date', $validated['nasa_date'])
            ->exists();

        if ($exists) {
            return back()->with('error', 'You have already saved this discovery!');
        }

        // Create the discovery
        SpaceDiscovery::create([
            'user_id' => auth()->id(),
            ...$validated,
        ]);

        return back()->with('success', 'Discovery saved to your journey!');
    }

    /**
     * Update user's note (UPDATE)
     */
    public function update(Request $request, SpaceDiscovery $discovery)
    {
        // Authorize: user can only update their own discoveries
        if ($discovery->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'user_note' => 'required|string|max:1000',
        ]);

        $discovery->update($validated);

        return back()->with('success', 'Note updated successfully!');
    }

    /**
     * Delete a discovery (DELETE)
     */
    public function destroy(SpaceDiscovery $discovery)
    {
        // Authorize: user can only delete their own discoveries
        if ($discovery->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $discovery->delete();

        return back()->with('success', 'Discovery removed from your journey.');
    }
}
