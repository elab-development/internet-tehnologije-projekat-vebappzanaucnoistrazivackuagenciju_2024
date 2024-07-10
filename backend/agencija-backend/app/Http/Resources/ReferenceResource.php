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
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->resource->id,
            "publication"=> new PublicationResource($this->resource->publication),
            "referenced"=> new PublicationResource($this->resource->referenced),
        ];
    }
}
