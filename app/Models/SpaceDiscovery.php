<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceDiscovery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'nasa_image_url',
        'nasa_image_title',
        'nasa_explanation',
        'nasa_date',
        'user_note',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'nasa_date' => 'date',
    ];

    /**
     * Get the user that owns the discovery.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
