<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReferenceCollection;
use App\Http\Resources\ReferenceResource;
use App\Models\Reference;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allItems = Reference::all();
        // return ReferenceResource::collection($allItems);
        return new ReferenceCollection($allItems);
        // return $allItems;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // {
        // "referenced_id": 1,
        // "publication_id": 1
        // }
        $validatedData = $request->validate([
            'referenced_id' => 'required|integer|exists:publication,id',
            'publication_id' => 'required|integer|exists:publication,id',
        ]);

        $ref = Reference::create([
            'publication_id' => $validatedData['publication_id'],
            'referenced_id' => $validatedData['referenced_id']
        ]);

        return response()->json($ref, 201);
    }


    public function showById(int $id)
    {
        $ref = Reference::find($id);
        if (is_null($ref)) {
            return response()->json("Data not found", 404);
        } else
            return new ReferenceResource($ref);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reference $reference)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroyById(int $id)
    {
        $ref = Reference::find($id);
        if (is_null($ref))
            return response()->json("Data not found", 404);
        $ref->delete();
        return response()->json(null, 204);
    }
    public function destroy(Reference $item)
    {
        $ref = Reference::find($item);
        if (is_null($ref))
            return response()->json("Data not found", 404);
        $ref->delete();
        return response()->json(null, 204);
    }

    public function filterByPublication(Request $request)
    {
        $publicationIdString = $request->query('publicationId');
        if (!$publicationIdString) {
            // return PublicationResearcherResource::collection(PublicationResearcher::all());
            return new ReferenceCollection(Reference::all());
        } else {
            $publicationId = (int) $publicationIdString;
            // return PublicationResearcherResource::collection(PublicationResearcher::where('publication_id', '=', $publicationId)->get());
            return new ReferenceCollection(Reference::where('publication_id', '=', $publicationId)->get());
        }
    }
}
