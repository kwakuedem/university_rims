<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

     protected $fillable = [
        'research_id',
        'status',
    ];

      public static $statuses = [
        'pending',
        'approved',
        'rejected',
        'under_review'
    ];

     public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (!in_array($model->status, self::$statuses)) {
                throw new \InvalidArgumentException("Invalid status: {$model->status}");
            }
        });
    }

    public function research()
    {
        return $this->belongsTo(Research::class);
    }
}
