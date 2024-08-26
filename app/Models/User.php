<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'profile_photo',
        'bio',
        'title',
        'password',
        'facebook',
        'whatsapp',
        'linkedin',
        'research_area'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // /**
    //  * Relationship with Research model.
    //  */


    /**
     * Relationship with Collaboration model.
     */
    public function collaborations()
    {
        return $this->hasMany(Collaboration::class);
    }

    /**
     * Many-to-Many relationship with Research through Collaborations.
     */
    // public function collaboratedResearches()
    // {
    //     return $this->belongsToMany(Research::class, 'collaborations', 'collaborator_id', 'research_id')
    //                 ->withPivot('status')
    //                 ->withTimestamps();
    // }

   
}
