<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicationResource;
use App\Models\Publication;
use App\Models\PublicationResearcher;
use App\Models\Reference;
use App\Models\Researcher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        if (!$sizeString) {
            $size = 15;
        } else {
            $size = (int) $sizeString;
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
    public function storeFullPublicationInfo(Request $request)
    {
        // {
        //     "publication": {
        //         "name": "Nta",
        //         "text": "prva",
        //         "date": "2024-06-25"
        //     },
        //     "publicationResearchers": [
        //         {
        //             "researcher_id": 1
        //         },
        //         {
        //             "researcher_id": 3
        //         },
        //         {
        //             "researcher_id": 2
        //         }
        //     ],
        //     "references": [
        //         {
        //             "referenced_id": 2
        //         },
        //         {
        //             "referenced_id": 1
        //         }
        //     ]
        // }
        $validatedData = $request->validate([
            'publication.name' => 'required|string',
            'publication.text' => 'required|string',
            'publication.date' => 'required|date',

            'publicationResearchers' => 'array',

            'publicationResearchers.*.researcher_id' => 'required|integer|exists:researcher,id',

            'references' => 'array',

            'references.*.referenced_id' => 'required|integer|exists:publication,id',
        ]);

        DB::transaction(function () use ($validatedData) {
            $publicationData = $validatedData['publication'];
            $publication = Publication::create(
                [
                    'name' => $publicationData['name'],
                    'text' => $publicationData['text'],
                    'date' => $publicationData['date']
                ]
            );

            foreach ($validatedData['publicationResearchers'] as $pubResearcher) {
                $publication_researcherDB = PublicationResearcher::searchByPublicationIdANDResearcherId($publication->id, $pubResearcher['researcher_id']);
                if ($publication_researcherDB) {
                    throw new Exception();
                }

                $publication_researcher = PublicationResearcher::create([
                    'publication_id' => $publication->id,
                    'researcher_id' => $pubResearcher['researcher_id']
                ]);
               
            }

            foreach ($validatedData['references'] as $reference) {
                $referenceDB = Reference::searchByPublicationIdANDReferencedId($publication->id, $reference['referenced_id']);
                if ($referenceDB) {
                    throw new Exception();
                }
                Reference::Create(
                    [
                        'publication_id' => $publication->id,
                        'referenced_id' => $reference['referenced_id']
                    ]
                );
            }
        });

        return response()->json(['message' => 'Data saved successfully'], 200);
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