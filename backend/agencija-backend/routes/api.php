<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\PublicationResearcherController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\ResearcherController;
use Illuminate\Support\Facades\Route;


Route::get('/cities', [CityController::class,'index']);
Route::post('/cities/store', [CityController::class,'store'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::put('/cities/update', [CityController::class,'update'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/cities/destroy', [CityController::class,'destroy'])->middleware(['auth:sanctum', 'ability:admin']);
Route::get('/cities/{id}', [CityController::class,'showById']);


Route::get('/researchers', [ResearcherController::class,'index']);
Route::get('/researchers/paginate', [ResearcherController::class,'paginate']);
Route::post('/researchers/filterPaginate', [ResearcherController::class,'filterPaginate']);
Route::post('/researchers/store', [ResearcherController::class,'store'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::put('/researchers/update', [ResearcherController::class,'update'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/researchers/delete', [ResearcherController::class,'destroy'])->middleware(['auth:sanctum', 'ability:admin']);
Route::get('/researchers/{id}', [ResearcherController::class,'showById']);

Route::get('/publications', [PublicationController::class,'index']);
Route::get('/publications/paginate', [PublicationController::class,'paginate']);
Route::post('/publications/store', [PublicationController::class,'store'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::put('/publications/update', [PublicationController::class,'update'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/publications/delete', [PublicationController::class,'destroy'])->middleware(['auth:sanctum', 'ability:admin']);
Route::get('/publications/{id}', [PublicationController::class,'showById']);

Route::get('/publicationResearchers', [PublicationResearcherController::class,'index']);
Route::get('/publicationResearchers/filterPaginate', [PublicationResearcherController::class,'filterPaginate']);
Route::post('/publicationResearchers/store', [PublicationResearcherController::class,'store'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/publicationResearchers/delete', [PublicationResearcherController::class,'destroy'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/publicationResearchers/delete/{id}', [PublicationResearcherController::class,'destroyById'])->middleware(['auth:sanctum', 'ability:admin']);
Route::get('/publicationResearchers/{id}', [PublicationResearcherController::class,'showById']);

Route::get('/references', [ReferenceController::class,'index']);
Route::post('/references/store', [ReferenceController::class,'store'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/references/delete', [ReferenceController::class,'destroy'])->middleware(['auth:sanctum', 'ability:user,admin']);
Route::delete('/references/delete/{id}', [ReferenceController::class,'destroyById'])->middleware(['auth:sanctum', 'ability:admin']);
Route::get('/references/{id}', [ReferenceController::class,'showById']);

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);