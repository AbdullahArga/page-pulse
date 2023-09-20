<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'tags', 'publish_at', 'is_active', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'article_id');
    }
    public function scopeSelf($query)
    {
        return $query->when(auth('api')->user()->hasPermission('active_user'), function ($query) {
            return $query->where('userId', auth('api')->id());
        });
    }
    public function scopeActive($query)
    {
        return $query->where('is_active', '=', true);
    }
    public function scopeFilter($query)
    {
        return $query->when(request()->has('search'), function ($query) {
            $query->where(function ($query) {
                $search = "%" . str_replace(' ', '%', request()->input('search')) . "%";

                $query->where('title', 'like', $search);
                $query->orWhere('content', 'like', $search);
            });
        })
            ->when($email = request()->input('title'), function ($query) use ($email) {
                $query->whereEmail($email);
            });
    }
}
