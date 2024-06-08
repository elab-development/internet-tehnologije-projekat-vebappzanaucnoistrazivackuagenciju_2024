<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        //
    }
}
