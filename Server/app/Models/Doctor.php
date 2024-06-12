<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $table = 'doctors';

    protected $fillable = [
        'first_name', 'last_name', 'email', 'city', 'state', 'street', 
        'territory', 'phone_number', 'specialization', 'class_rate'
    ];

    public function visits()
    {
        return $this->hasMany(Visit::class, 'doctor_id');
    }
 
}
