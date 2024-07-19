<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'abstract', 'journal', 'publication_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
