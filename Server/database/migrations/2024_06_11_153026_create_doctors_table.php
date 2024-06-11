<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table -> first_name();
            $table -> last_name();
            $table -> email() ->unique();
            $table -> city();
            $table -> state();
            $table -> street();
            $table -> territory();
            $table -> phone_number();
            $table -> spicialization();
            $table -> class_rate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
