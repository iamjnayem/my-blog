<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::insert([
            [
                'title' => 'First Blog',
                'content' => 'This is the content of the first blog.',
                'excerpt' => 'This is the excerpt of the first blog.',
                'author_id' => 1,
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Second Blog',
                'content' => 'This is the content of the second blog.',
                'excerpt' => 'This is the excerpt of the second blog.',
                'author_id' => 1,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
