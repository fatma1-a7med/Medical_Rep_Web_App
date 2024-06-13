<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $filable = [
        'latitude',
        'longitude',
        'timestamp',
        'altitude',
        'accuracy',
        'speed',
        'direction'
    ]; 
    public function visits (){
        return $this->hasMany(Visit::class);
    }
}
