<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'abstract',
        'file_path',
        'user_id',
    ];

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'collaborations', 'research_id', 'user_id');
    }

    // Define the relationship with the owner
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
