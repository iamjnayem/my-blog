<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\{TextInput, Textarea, FileUpload, Select, TagsInput};
use Filament\Tables\Columns\{TextColumn, BadgeColumn, ImageColumn};


class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Projects';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required(),
            Textarea::make('description')->rows(3)->required(),
            Select::make('status')
                ->options([
                    'active' => 'Active',
                    'inactive' => 'Inactive',
                ])
                ->default('active')
                ->required(),
            TextInput::make('url')->label('Live URL'),
            TextInput::make('github')->label('GitHub URL'),
            // TextInput::make('demo')->label('Demo Credentials'),
            // TagsInput::make('technologies')->label('Technologies Used'),
            FileUpload::make('image')->directory('projects')->image(),
            // Textarea::make('readme')->rows(10)->label('README (Markdown)'),
            Forms\Components\MarkdownEditor::make('readme')->label('README Content')->columnSpanFull(),

            Select::make('type')
                ->options([
                    'project' => 'Project',
                    'case-study' => 'Case Study',
                ])
                ->default('project')
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->circular(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('description')->limit(50),
                BadgeColumn::make('status')->colors([
                    'success' => 'active',
                    'danger' => 'inactive',
                ]),
                // TextColumn::make('technologies'),
                TextColumn::make('type'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
