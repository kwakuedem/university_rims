<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaboration extends Model
{
    use HasFactory;

    protected $fillable = [
        'publication_id',
        'collaborator_id',
        'status',
    ];

    public function publication()
    {
        return $this->belongsTo(Publication::class);
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
