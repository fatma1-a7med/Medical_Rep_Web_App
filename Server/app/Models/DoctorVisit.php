<?php

use Illuminate\Database\Eloquent\Relations\Pivot;

class DoctorVisit extends Pivot
{
    protected $table = 'doctors_visits';
}

