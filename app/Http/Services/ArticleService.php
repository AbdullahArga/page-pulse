<?php

namespace App\Http\Services;

use App\Models\Article;

class ArticleService
{
    public function store($data)
    {
        $data['user_id'] = auth()->id();
        $data['user_id'] = 1;
        Article::create($data);
    }
    public function update($data)
    {
        $data['user_id'] = auth()->id();
        $data['user_id'] = 1;
        Article::findOrFail($data['id'])->update($data);
    }
}
