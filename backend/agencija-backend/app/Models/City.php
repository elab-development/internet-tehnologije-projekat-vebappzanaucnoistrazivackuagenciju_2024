<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'city';
    protected $guarded = ['id'];
    protected $fillable = [
        'name',
    ];
    public function researchers(){
        $this->hasMany(Researcher::class);
    }
}
