<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalUserCollaboration extends Model
{
    use HasFactory;

    protected $fillable=['publication_id','name'];

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }
}
