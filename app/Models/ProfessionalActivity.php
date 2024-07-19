<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionalActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'activity_type', 'description', 'activity_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
