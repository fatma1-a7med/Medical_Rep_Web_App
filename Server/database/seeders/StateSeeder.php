<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\State;

class StateSeeder extends Seeder
{
    public function run()
    {
        $states = [
            ['name' => 'Cairo'],
            ['name' => 'Giza'],
            ['name' => 'Alexandria'],
            ['name' => 'Beheira'],
            ['name' => 'Kafr El Sheikh'],
            ['name' => 'Dakahlia'],
            ['name' => 'Damietta'],
            ['name' => 'Sharqia'],
            ['name' => 'Qalyubia'],
            ['name' => 'Gharbia'],
            ['name' => 'Monufia'],
            ['name' => 'Ismailia'],
            ['name' => 'Port Said'],
            ['name' => 'Suez'],
            ['name' => 'North Sinai'],
            ['name' => 'South Sinai'],
            ['name' => 'Beni Suef'],
            ['name' => 'Faiyum'],
            ['name' => 'Minya'],
            ['name' => 'Assiut'],
            ['name' => 'Sohag'],
            ['name' => 'Qena'],
            ['name' => 'Luxor'],
            ['name' => 'Aswan'],
            ['name' => 'Red Sea'],
            ['name' => 'New Valley'],
            ['name' => 'Matruh'],
        ];

        foreach ($states as $state) {
            State::create($state);
        }
    }
}
