<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $table = 'publication';

    protected $guarded = ['id'];
    protected $fillable = [
        'name',
        'text',
        'date',
    ];
    public function publication_researchers(){
        return $this->hasMany(PublicationResearcher::class);
    }
    
}
