<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Filament\Resources\BlogResource\RelationManagers;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([

                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name')
                            ->preload()
                            ->searchable()
                            ->nullable(),

                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('excerpt')
                            ->required()
                            ->unique(ignoreRecord: true) // ignore unique on update
                            ->maxLength(255),

                        Forms\Components\Select::make('author_id')
                            ->relationship('author', 'name')
                            ->preload()
                            ->searchable()
                            ->required(),

                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->nullable(),

                        Forms\Components\RichEditor::make('content')
                            ->required(),

                        Forms\Components\Toggle::make('is_popular')
                            ->label('Is Popular')
                            ->default(false),

                        Forms\Components\TextInput::make('view_count')
                            ->label('View Count')
                            ->numeric()
                            ->default(0)
                            ->disabled(), // maybe disable editing manually?
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable(),
                Tables\Columns\TextColumn::make('excerpt')->limit(50)->tooltip(fn($record) => $record->excerpt),
                Tables\Columns\ImageColumn::make('image')->circular(),
                Tables\Columns\TextColumn::make('category.name')->sortable(),
                Tables\Columns\IconColumn::make('is_popular')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star'),
                Tables\Columns\TextColumn::make('view_count')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([
                // You can add filters if needed like Popular blogs filter
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
