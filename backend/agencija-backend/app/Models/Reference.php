<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;
    protected $table = 'reference';

    protected $guarded = ['id'];
    
    public function publication_id(){
        return $this->belongsTo(Publication::class);
    }
    public function referenced_id(){
        return $this->belongsTo(Publication::class);
    }
    
}
