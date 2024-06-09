<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\ResearcherController;
use App\Models\City;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/greeting', function () {
    return 'Hello World';
});
Route::get('/cities', [CityController::class,'index']);
Route::get('/cities/{id}', [CityController::class,'showById']);


Route::get('/researchers', [ResearcherController::class,'index']);
Route::get('/researchers/{id}', [ResearcherController::class,'showById']);
