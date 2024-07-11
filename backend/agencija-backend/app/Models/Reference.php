<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;
    protected $table = 'reference';

    protected $fillable = [
        'publication_id',
        'referenced_id'
    ];

    protected $guarded = ['id'];
    /**
     * 
     * Main publication whitch references other publications
     * 
    */
    public function publication(){
        return $this->belongsTo(Publication::class,"publication_id");
    }

    /**
     * Publication that is referenced in the main publication.
     * 
     */
    public function referenced(){
        return $this->belongsTo(Publication::class,"referenced_id");
    }
    public static function searchByPublicationIdANDReferencedId($publication_id, $referenced_id)
    {
        $record = self::where('publication_id', $publication_id)
                      ->where('referenced_id', $referenced_id)
                      ->first();
        // if (!$record) {
        //     return null;
        // }
        return $record;
    }
}
