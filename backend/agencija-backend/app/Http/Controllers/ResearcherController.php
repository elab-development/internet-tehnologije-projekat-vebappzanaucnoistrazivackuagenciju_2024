<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResearcherResource;
use App\Models\Researcher;
use Illuminate\Http\Request;
use Nette\Schema\ValidationException;

class ResearcherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $researchers = Researcher::all();
        return ResearcherResource::collection($researchers);
        //
    }

    public function showById(int $researcherId)
    {
        // return response()->json("ALOOOOOOOOOOOOOOOOOOOOOOO", 200);
        $researcher = Researcher::find($researcherId);
        // $researcher = Researcher::with('city')->findOrFail($researcherId);
        if (is_null($researcher)) {
            return response()->json("Data not found", 404);
        } else
            return new ResearcherResource($researcher);
        //
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
        // $validated = $request->validate([
        //     'firstname' => 'required|string|max:255',
        //     'lastname' => 'required|string|max:255',
        //     'birthday' => 'required|date',
        //     'city_id' => 'required|integer|exists:cities,id'
        // ]);

        // $researcher = Researcher::create($validated);
        // return response()->json($request->all());
        // return response()->json($request->all() , "city_id"=>$request->city_id);
        // $researcher = Researcher::create([$request->all(),"city_id"=>$request->city_id]);
        // return response()->json($researcher, 201);
        // return new ResearcherResource($researcher);

        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'city_id' => 'required|integer|exists:city,id',
        ]);

        $researcher = Researcher::create([
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
            'birthday' => $validatedData['birthday'],
            'city_id' => $validatedData['city_id']
        ]);

        return response()->json($researcher, 201);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Researcher $researcher)
    {

        $researcher = Researcher::findOrFail($request->id);

        if ($researcher->update($request->all()) === false) {
            return response(
                "Couldn't update the researcher with id {$request->id}"
                // response()::HTTP_BAD_REQUEST
            );
        }

        return new ResearcherResource($researcher);
        // return response($researcher);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Researcher $researcher)
    {
        $researcherForDelete = Researcher::find($researcher);
        if (is_null($researcherForDelete))
            return response()->json("Data not found", 404);
        $researcher->delete();
        return response()->json(null, 204);
    }




    public function indexSimple()
    {
        $researchers = Researcher::all();
        return $researchers;
        //
    }
    public function showByIdSimple(int $researcherId)
    {
        $researcher = Researcher::find($researcherId);
        if (is_null($researcher)) {
            return response()->json("Data not found", 404);
        } else
            return $researcher;
        //
    }
    /**
     * Display the specified resource.
     */
    public function show(Researcher $researcher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Researcher $researcher)
    {
        //
    }
}
