<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationResearcher extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    
    protected $table = 'publication_researcher';

    protected $fillable = [
        'publication_id',
        'researcher_id'
    ];

    // public function publicationId(){
    //     return $this->belongsTo(Publication::class);
    // }
    public function publication(){
        return $this->belongsTo(Publication::class,"publication_id");
    }
    public function researcher(){
        return $this->belongsTo(Researcher::class,"researcher_id");
    }


    public static function searchByPublicationIdANDResearcherId($publicationId, $researcherId)
    {
        $record = self::where('publication_id', $publicationId)
                      ->where('researcher_id', $researcherId)
                      ->first();
        if (!$record) {
            return null;
        }
        return $record;
    }
}
