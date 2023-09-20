<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'message' => $this->message,
            'created_at_for_human' => $this->created_at->diffForHumans(),

            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', $this->user->name),

        ];
    }
}
