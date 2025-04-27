<?php

namespace App\Filament\Resources\BlogResource\Pages;

use Filament\Actions;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Filament\Resources\BlogResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBlog extends CreateRecord
{
    protected static string $resource = BlogResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        Log::info('Mutating form data before create'. json_encode($data));
        $data['author_id'] = auth()->id();
        $data['excerpt'] = Str::limit(strip_tags($data['content']), 100);
        $data['slug'] = Str::slug($data['title']);

        return $data;
    }
}
