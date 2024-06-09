<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResearcherResource;
use App\Models\Researcher;
use Illuminate\Http\Request;

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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Researcher $researcher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Researcher $researcher)
    {
        //
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
}
