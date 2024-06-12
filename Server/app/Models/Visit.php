<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $primaryKey = 'visit_id';

    protected $fillable = [
        'visit_date', 'visit_time', 'purpose', 'status', 'med_id', 'doctor_id', 'location_id'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'med_id');
    }
}
