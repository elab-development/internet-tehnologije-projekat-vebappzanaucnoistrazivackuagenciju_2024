<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ResearchersCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($resource) use ($request) {
            return (new ResearcherResource($resource))->toArray($request);
        })->all();
    }
    public function with($request)
    {
        return [];
    }

    public function withResponse($request, $response)
    {
        $response->setData($this->collection->map(function ($resource) use ($request) {
            return (new ResearcherResource($resource))->toArray($request);
        }));
    }
}
