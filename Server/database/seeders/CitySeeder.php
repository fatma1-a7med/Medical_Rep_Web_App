<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;
use App\Models\State;

class CitySeeder extends Seeder
{
    public function run()
    {
        $states = [
            'Cairo' => State::where('name', 'Cairo')->first(),
            'Giza' => State::where('name', 'Giza')->first(),
            'Alexandria' => State::where('name', 'Alexandria')->first(),
            'Beheira' => State::where('name', 'Beheira')->first(),
            'Kafr El Sheikh' => State::where('name', 'Kafr El Sheikh')->first(),
            'Dakahlia' => State::where('name', 'Dakahlia')->first(),
            'Damietta' => State::where('name', 'Damietta')->first(),
            'Sharqia' => State::where('name', 'Sharqia')->first(),
            'Qalyubia' => State::where('name', 'Qalyubia')->first(),
            'Gharbia' => State::where('name', 'Gharbia')->first(),
            'Monufia' => State::where('name', 'Monufia')->first(),
            'Ismailia' => State::where('name', 'Ismailia')->first(),
            'Port Said' => State::where('name', 'Port Said')->first(),
            'Suez' => State::where('name', 'Suez')->first(),
            'North Sinai' => State::where('name', 'North Sinai')->first(),
            'South Sinai' => State::where('name', 'South Sinai')->first(),
            'Beni Suef' => State::where('name', 'Beni Suef')->first(),
            'Faiyum' => State::where('name', 'Faiyum')->first(),
            'Minya' => State::where('name', 'Minya')->first(),
            'Assiut' => State::where('name', 'Assiut')->first(),
            'Sohag' => State::where('name', 'Sohag')->first(),
            'Qena' => State::where('name', 'Qena')->first(),
            'Luxor' => State::where('name', 'Luxor')->first(),
            'Aswan' => State::where('name', 'Aswan')->first(),
            'Red Sea' => State::where('name', 'Red Sea')->first(),
            'New Valley' => State::where('name', 'New Valley')->first(),
            'Matruh' => State::where('name', 'Matruh')->first(),
        ];

        $cities = [
            // Cairo Governorate
            ['name' => 'Cairo City', 'state_id' => $states['Cairo']->id],
            ['name' => 'Helwan', 'state_id' => $states['Cairo']->id],
            ['name' => 'Nasr City', 'state_id' => $states['Cairo']->id],
            ['name' => 'New Cairo', 'state_id' => $states['Cairo']->id],
            ['name' => 'Maadi', 'state_id' => $states['Cairo']->id],

            // Giza Governorate
            ['name' => 'Giza City', 'state_id' => $states['Giza']->id],
            ['name' => '6th of October City', 'state_id' => $states['Giza']->id],
            ['name' => 'Sheikh Zayed City', 'state_id' => $states['Giza']->id],
            ['name' => 'Haram', 'state_id' => $states['Giza']->id],

            // Alexandria Governorate
            ['name' => 'Alexandria City', 'state_id' => $states['Alexandria']->id],
            ['name' => 'Borg El Arab', 'state_id' => $states['Alexandria']->id],

            // Beheira Governorate
            ['name' => 'Damanhur', 'state_id' => $states['Beheira']->id],
            ['name' => 'Kafr El Dawwar', 'state_id' => $states['Beheira']->id],
            ['name' => 'Rashid', 'state_id' => $states['Beheira']->id],

            // Kafr El Sheikh Governorate
            ['name' => 'Kafr El Sheikh City', 'state_id' => $states['Kafr El Sheikh']->id],
            ['name' => 'Desouk', 'state_id' => $states['Kafr El Sheikh']->id],
            ['name' => 'Balteen', 'state_id' => $states['Kafr El Sheikh']->id],

            // Dakahlia Governorate
            ['name' => 'Mansoura', 'state_id' => $states['Dakahlia']->id],
            ['name' => 'Talkha', 'state_id' => $states['Dakahlia']->id],
            ['name' => 'Mit Ghamr', 'state_id' => $states['Dakahlia']->id],

            // Damietta Governorate
            ['name' => 'Damietta City', 'state_id' => $states['Damietta']->id],
            ['name' => 'Ras El Bar', 'state_id' => $states['Damietta']->id],

            // Sharqia Governorate
            ['name' => 'Zagazig', 'state_id' => $states['Sharqia']->id],
            ['name' => '10th of Ramadan City', 'state_id' => $states['Sharqia']->id],
            ['name' => 'Belbeis', 'state_id' => $states['Sharqia']->id],

            // Qalyubia Governorate
            ['name' => 'Banha', 'state_id' => $states['Qalyubia']->id],
            ['name' => 'Qalyub', 'state_id' => $states['Qalyubia']->id],
            ['name' => 'Shubra El Kheima', 'state_id' => $states['Qalyubia']->id],

            // Gharbia Governorate
            ['name' => 'Tanta', 'state_id' => $states['Gharbia']->id],
            ['name' => 'El Mahalla El Kubra', 'state_id' => $states['Gharbia']->id],
            ['name' => 'Kafr El Zayat', 'state_id' => $states['Gharbia']->id],

            // Monufia Governorate
            ['name' => 'Shibin El Kom', 'state_id' => $states['Monufia']->id],
            ['name' => 'Menouf', 'state_id' => $states['Monufia']->id],
            ['name' => 'Ashmun', 'state_id' => $states['Monufia']->id],

            // Ismailia Governorate
            ['name' => 'Ismailia City', 'state_id' => $states['Ismailia']->id],
            ['name' => 'Fayed', 'state_id' => $states['Ismailia']->id],
            ['name' => 'Al Qantara', 'state_id' => $states['Ismailia']->id],

            // Port Said Governorate
            ['name' => 'Port Said City', 'state_id' => $states['Port Said']->id],
            ['name' => 'Port Fuad', 'state_id' => $states['Port Said']->id],

            // Suez Governorate
            ['name' => 'Suez City', 'state_id' => $states['Suez']->id],

            // North Sinai Governorate
            ['name' => 'Arish', 'state_id' => $states['North Sinai']->id],
            ['name' => 'Bir al-Abed', 'state_id' => $states['North Sinai']->id],

            // South Sinai Governorate
            ['name' => 'Sharm El Sheikh', 'state_id' => $states['South Sinai']->id],
            ['name' => 'Dahab', 'state_id' => $states['South Sinai']->id],
            ['name' => 'Nuweiba', 'state_id' => $states['South Sinai']->id],

            // Beni Suef Governorate
            ['name' => 'Beni Suef City', 'state_id' => $states['Beni Suef']->id],
            ['name' => 'Wasta', 'state_id' => $states['Beni Suef']->id],

            // Faiyum Governorate
            ['name' => 'Faiyum City', 'state_id' => $states['Faiyum']->id],
            ['name' => 'Ibshaway', 'state_id' => $states['Faiyum']->id],

            // Minya Governorate
            ['name' => 'Minya City', 'state_id' => $states['Minya']->id],
            ['name' => 'Mallawi', 'state_id' => $states['Minya']->id],

            // Assiut Governorate
            ['name' => 'Assiut City', 'state_id' => $states['Assiut']->id],
            ['name' => 'Dayrout', 'state_id' => $states['Assiut']->id],

            // Sohag Governorate
            ['name' => 'Sohag City', 'state_id' => $states['Sohag']->id],
            ['name' => 'Akhmim', 'state_id' => $states['Sohag']->id],

            // Qena Governorate
            ['name' => 'Qena City', 'state_id' => $states['Qena']->id],
            ['name' => 'Nag Hammadi', 'state_id' => $states['Qena']->id],

            // Luxor Governorate
            ['name' => 'Luxor City', 'state_id' => $states['Luxor']->id],
            ['name' => 'Armant', 'state_id' => $states['Luxor']->id],

            // Aswan Governorate
            ['name' => 'Aswan City', 'state_id' => $states['Aswan']->id],
            ['name' => 'Edfu', 'state_id' => $states['Aswan']->id],

            // Red Sea Governorate
            ['name' => 'Hurghada', 'state_id' => $states['Red Sea']->id],
            ['name' => 'Safaga', 'state_id' => $states['Red Sea']->id],

            // New Valley Governorate
            ['name' => 'Kharga', 'state_id' => $states['New Valley']->id],
            ['name' => 'Mut', 'state_id' => $states['New Valley']->id],

            // Matruh Governorate
            ['name' => 'Marsa Matruh', 'state_id' => $states['Matruh']->id],
            ['name' => 'Siwa', 'state_id' => $states['Matruh']->id],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}


