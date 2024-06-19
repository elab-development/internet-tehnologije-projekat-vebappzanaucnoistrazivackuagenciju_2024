<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\PublicationResearcherController;
use App\Http\Controllers\ResearcherController;
use Illuminate\Support\Facades\Route;


Route::get('/cities', [CityController::class,'index']);
Route::post('/cities/store', [CityController::class,'store']);
Route::put('/cities/update', [CityController::class,'update']);
Route::delete('/cities/destroy', [CityController::class,'destroy']);
Route::get('/cities/{id}', [CityController::class,'showById']);


Route::get('/researchers', [ResearcherController::class,'index']);
Route::post('/researchers/store', [ResearcherController::class,'store']);
Route::put('/researchers/update', [ResearcherController::class,'update']);
Route::delete('/researchers/delete', [ResearcherController::class,'destroy']);
Route::get('/researchers/{id}', [ResearcherController::class,'showByIdSimple']);

Route::get('/publications', [PublicationController::class,'index']);
Route::post('/publications/store', [PublicationController::class,'store']);
Route::put('/publications/update', [PublicationController::class,'update']);
Route::delete('/publications/delete', [PublicationController::class,'destroy']);
Route::get('/publications/{id}', [PublicationController::class,'showById']);

Route::get('/publicationResearchers', [PublicationResearcherController::class,'index']);
Route::post('/publicationResearchers/store', [PublicationResearcherController::class,'store']);
// Route::put('/publicationResearchers/update', [PublicationResearcherController::class,'update']);
Route::delete('/publicationResearchers/delete', [PublicationResearcherController::class,'destroy']);
Route::delete('/publicationResearchers/delete/{id}', [PublicationResearcherController::class,'destroyById']);
Route::get('/publicationResearchers/{id}', [PublicationResearcherController::class,'showById']);