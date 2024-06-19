<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->resource->id,
            // "publication"=> $this->resource->publication,
            "publication"=> new PublicationResource($this->resource->publication),
            // "referenced"=> $this->resource->referenced,
            "referenced"=> new PublicationResource($this->resource->referenced),
        ];
    }
}
