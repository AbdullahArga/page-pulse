<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image' => $this->image,
            'title' => $this->title,
            'content' => $this->when(request()->input('with_content'), $this->content),
            'is_active' => $this->is_active,
            'tags' => $this->tags ?? '',
            'created_at' => $this->created_at->format('Y-m-d H:i'),

            'user_id' => $this->user_id,
            'user' => $this->user->name,


            'comments_count' => $this->comments_count,
            'comments' => $this->whenLoaded('comments', function () {
                return CommentResource::collection($this->comments);
            }),

        ];
    }
}
