<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'abstract',
        'file_path',
        'author_id',
        'views',
        'downloads',
        'status',
    ];

    public function increamentView(){
        $this->views +=1;
        $this->save();
    }

    public function increamentDownloads(){
        $this->downloads +=1;
        $this->save();
    }

    public function collaborations()
    {
        return $this->belongsToMany(User::class, 'collaborations', 'publication_id', 'collaborator_id');
    }

    // Define the relationship with the owner
    public function author() {
    return $this->belongsTo(User::class, 'author_id');
}

}
