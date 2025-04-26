<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class PrepareDb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prepare-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Preparing database...');
        $this->info('Dropping all tables...');

        Artisan::call('migrate:fresh', ['--force' => true]);
        Artisan::call('db:seed', ['--force' => true]);
        $this->info('Database prepared successfully.');
        $this->info('Database migrated successfully.');
    }
}
