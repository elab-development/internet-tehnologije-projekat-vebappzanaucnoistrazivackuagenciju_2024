<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResearcherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = "researcher";
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "id" => $this->resource->id,
            "firstname" => $this->resource->firstname,
            "lastname" => $this->resource->lastname,
            "birthday" => $this->resource->birthday,
            "city" => $this->resource->city
            // "city" => new CityResource($this->whenLoaded('city'))
        ];
    }
}
