<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = [
        'firstname',
        'lastname',
        'birthday',
    ];
    public function city_id(){
        return $this->belongsto(City::class);
    }
    public function publication_researchers(){
        return $this->hasMany(PublicationResearcher::class);
    }
}
