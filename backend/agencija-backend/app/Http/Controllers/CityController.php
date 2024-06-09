<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Response;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Using Eloquent
    public function index()
    {
        $cities = City::all();
        return $cities;
        // return response()->json($cities);
    }

    // Using Query Builder
    // public function indexWithQueryBuilder()
    // {
    //     $cities = DB::table('city')->get();
    //     return response()->json($cities);
    // }

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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $city = City::create($validated);
        return response()->json($city, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        //
    }
    public function showById(int $cityId)
    {
        $city = City::find($cityId);
        if (is_null($city)) {
            return response()->json("Data not found", 404);
        } else
            return $city;
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        $city = City::findOrFail($request->id);

        if ($city->update($request->all()) === false) {
            return response(
                "Couldn't update the city with id {$request->id}"
                // response()::HTTP_BAD_REQUEST
            );
        }

        return response($city);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $city = City::findOrFail($request->id);

        if ($city->delete() === false) {
            return response(
                "Couldn't delete the city with id {$request->id}"
            );
        }

        return response(["id" => $request->id, "deleted" => true],200);
    }
}
