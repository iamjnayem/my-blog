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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('status')->default('active');    
            $table->string('url')->nullable();
            $table->string('image')->nullable();
            $table->string('github')->nullable();
            // $table->string('demo')->nullable();
            // $table->string('technologies')->nullable();
            $table->text('readme')->nullable();
            $table->string('type')->default('project');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
