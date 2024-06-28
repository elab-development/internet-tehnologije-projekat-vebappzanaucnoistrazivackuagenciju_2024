<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResearcherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->resource->id,
            // "researcher" => $this->resource->researcher,
            "researcher" => new ResearcherResource($this->resource->researcher),
            "publication" => new PublicationResource($this->resource->publication)
            // "publication" => $this->resource->publication
        ];
    }
}
