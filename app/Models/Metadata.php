<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metadata extends Model
{
    use HasFactory;

      protected $fillable = [
        'key',
        'value',
        'research_id',
    ];

    public function research()
    {
        return $this->belongsTo(Research::class);
    }
}
