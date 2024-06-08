<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationResearcher extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    
    // public function publicationId(){
    //     return $this->belongsTo(Publication::class);
    // }
    public function publication_id(){
        return $this->belongsTo(Publication::class);
    }
    public function researcher_id(){
        return $this->belongsTo(Researcher::class);
    }
}
