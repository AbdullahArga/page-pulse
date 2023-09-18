<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
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
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function scopeFilter($query)
    {
        return $query->when(request()->has('search'), function ($query) {
            $query->where(function ($query) {
                $search = "%" . str_replace(' ', '%', request()->has('search')) . "%";
                $query->whereLike('name', $search);
                $query->orWhereLike('email', $search);
            });
        })
            ->when($email = request()->input('email'), function ($query) use ($email) {
                $query->whereEmail($email);
            })
            ->when($name = request()->input('name'), function ($query) use ($name) {
                $query->whereName($name);
            });
    }
}
