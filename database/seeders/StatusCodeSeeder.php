<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StatusCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert sample data into the status_codes table
        DB::table('status_codes')->insert([
            [
                'code' => '200',
                'title' => 'Success',
                'message' => 'The request was successful.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'code' => '400',
                'title' => 'Failed',
                'message' => 'The request was bad.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'code' => '422',
                'title' => 'Validation Error',
                'message' => 'The request is not valid',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => '404',
                'title' => 'Not Found',
                'message' => 'The requested resource could not be found.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => '500',
                'title' => 'Server Error',
                'message' => 'An unexpected server error occurred.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => '403',
                'title' => 'Forbidden',
                'message' => 'You do not have permission to access this resource.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => '401',
                'title' => 'Unauthorized',
                'message' => 'Authentication is required to access this resource.',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
