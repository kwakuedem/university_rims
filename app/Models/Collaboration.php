<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaboration extends Model
{
    use HasFactory;

    protected $fillable = [
        'research_id',
        'user_id',
        'collaborator_id',
        'status',
    ];

    public function research()
    {
        return $this->belongsTo(Research::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function collaborator()
    {
        return $this->belongsTo(User::class, 'collaborator_id');
    }
}
