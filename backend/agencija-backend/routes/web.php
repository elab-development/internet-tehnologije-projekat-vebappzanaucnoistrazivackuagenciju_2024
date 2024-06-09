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
Route::post('/cities/store', [CityController::class,'store']);
Route::put('/cities/update', [CityController::class,'update']);
Route::delete('/cities/destroy', [CityController::class,'destroy']);
Route::get('/cities/{id}', [CityController::class,'showById']);

Route::get('/researchers', [ResearcherController::class,'index']);
Route::get('/researchers/{id}', [ResearcherController::class,'showById']);
Route::post('/researchers/store', [ResearcherController::class,'store']);
Route::put('/researchers/update', [ResearcherController::class,'update']);
Route::delete('/researchers/delete', [ResearcherController::class,'destroy']);
// Route::get('/researchers', [ResearcherController::class,'indexSimple']);
// Route::get('/researchers/{id}', [ResearcherController::class,'showByIdSimple']);

Route::resource('researchers', ResearcherController::class);

