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
        Schema::create('publication_researcher', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('publicationId');
            $table->foreignId('publication_id')->constrained('publication')->onDelete('cascade');
            $table->foreignId('researcher_id')->constrained('researcher')->onDelete('cascade');
            // $table->foreignId('researcherId');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publication_researcher');
    }
};
