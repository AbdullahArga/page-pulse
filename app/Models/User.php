<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// use Laravel\Passport\HasApiTokens;

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

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role');
    }
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permission');
    }
    public function hasPermission($permission_code)
    {
        return in_array($permission_code, $this->allPermissions());
    }
    public function allPermissions()
    {
        return
            array_unique(
                array_merge(
                    $this->roles->load('permissions')
                        ->pluck('permissions')
                        ->flatten()
                        ->pluck('code')
                        ->unique()
                        ->values()
                        ->toArray(),
                    $this->permissions->pluck('code')->values()->toArray()
                )
            );
    }

    public function scopeFilter($query)
    {
        return $query->when(request()->has('search'), function ($query) {
            $query->where(function ($query) {
                $search = "%" . str_replace(' ', '%', request()->input('search')) . "%";
                $query->where('name', 'like', $search);
                $query->orWhere('email', 'like', $search);
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
