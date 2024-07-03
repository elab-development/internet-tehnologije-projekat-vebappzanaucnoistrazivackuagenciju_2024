<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicationResource;
use App\Models\Publication;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publications = Publication::all();
        return PublicationResource::collection($publications);
        //
    }
    public function paginate(Request $request)
    {
        $sizeString = $request->query('size');
        $size = 15;
        if(!$sizeString){
            $size = 15;
        }
        else{
            $size = (int)$sizeString;
        }
        // return Publication::paginate($size);
        return PublicationResource::collection(Publication::paginate($size));
    }
    public function showById(int $publicationId)
    {
        $publicationId = Publication::find($publicationId);
        if (is_null($publicationId)) {
            return response()->json("Data not found", 404);
        } else
            return $publicationId;
        // return new PublicationResource($publication);
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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'date' => 'required|date',
        ]);

        $publication = Publication::create([
            'name' => $validatedData['name'],
            'text' => $validatedData['text'],
            'date' => $validatedData['date'],
        ]);

        return response()->json($publication, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Publication $publication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publication $publication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publication $publication)
    {
        $publication = Publication::findOrFail($request->id);

        if ($publication->update($request->all()) === false) {
            return response(
                "Couldn't update the publication with id {$request->id}"
            );
        }

        // return new PublicationResource($publication);
        return response($publication);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $publication = Publication::findOrFail($request->id);

        if ($publication->delete() === false) {
            return response(
                "Couldn't delete the publication with id {$request->id}"
            );
        }

        return response(["id" => $request->id, "deleted" => true], 200);
    }
}