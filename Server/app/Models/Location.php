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
    ]; 
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function visits (){
        return $this->hasMany(Visit::class);
    }
}
