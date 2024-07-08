<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicationResearcherResource;
use App\Models\PublicationResearcher;
use Illuminate\Http\Request;

class PublicationResearcherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allItems = PublicationResearcher::all();
        return PublicationResearcherResource::collection($allItems);
        // return $allItems;

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // {
        // "researcher_id": 1,
        // "publication_id": 1
        // }
        $validatedData = $request->validate([
            'researcher_id' => 'required|integer|exists:researcher,id',
            'publication_id' => 'required|integer|exists:publication,id',
        ]);

        $publication_researcherDB = PublicationResearcher::searchByPublicationIdANDResearcherId($validatedData['publication_id'], $validatedData['researcher_id']);
        if ($publication_researcherDB) {
            return response()->json("Vec Postoji!!!", 201);
        }

        $publication_researcher = PublicationResearcher::create([
            'publication_id' => $validatedData['publication_id'],
            'researcher_id' => $validatedData['researcher_id']
        ]);

        return response()->json($publication_researcher, 201);
    }

    public function showById(int $id)
    {
        $publication_researcher = PublicationResearcher::find($id);
        if (is_null($publication_researcher)) {
            return response()->json("Data not found", 404);
        } else
            return new PublicationResearcherResource($publication_researcher);
    }

    /**
     * Display the specified resource.
     */
    public function show(PublicationResearcher $publicationResearcher)
    {
        //
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(PublicationResearcher $publicationResearcher)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, PublicationResearcher $publicationResearcher)
    // {
    //     $publicationResearcher = PublicationResearcher::findOrFail($request->id);

    //     if ($publicationResearcher->update($request->all()) === false) {
    //         return response(
    //             "Couldn't update the publicationResearcher with id {$request->id}"
    //             // response()::HTTP_BAD_REQUEST
    //         );
    //     }
    //     return response($publicationResearcher);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyById(int $id)
    {
        $publicationResearcher = PublicationResearcher::find($id);
        if (is_null($publicationResearcher))
            return response()->json("Data not found", 404);
        $publicationResearcher->delete();
        return response()->json(null, 204);
    }
    public function destroy(PublicationResearcher $item)
    {
        $publicationResearcher = PublicationResearcher::find($item);
        if (is_null($publicationResearcher))
            return response()->json("Data not found", 404);
        $publicationResearcher->delete();
        return response()->json(null, 204);
    }

    public function filterPaginate(Request $request)
    {
        // return "OVA METODA";
        $sizeString = $request->query('size');
        $size = 15;
        if (!$sizeString) {
            $size = 15;
        } else {
            $size = (int) $sizeString;
        }
        $researcherIdString = $request->query('researcherId');
        if (!$researcherIdString) {
            return PublicationResearcherResource::collection(PublicationResearcher::paginate($size));
        } else {
            $researcherId = (int) $researcherIdString;
            return PublicationResearcherResource::collection(PublicationResearcher::where('researcher_id', '=', $researcherId)->paginate($size));
        }
    }
}
