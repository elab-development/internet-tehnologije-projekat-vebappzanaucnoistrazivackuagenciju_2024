<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    use HasFactory;
    protected $table = 'researcher';

    protected $guarded = ['id'];
    protected $fillable = [
        'firstname',
        'lastname',
        'birthday',
        "city_id"
    ];
    public function city(){
        // return $this->belongsTo(City::class);
        return $this->belongsTo(City::class, 'city_id');

    }
    public function publication_researchers(){
        return $this->hasMany(PublicationResearcher::class);
    }
}
