<?php

namespace App\Providers;

use App\Classes\InertiaDocument;
use Illuminate\Support\ServiceProvider;
use Jenssegers\Agent\Agent;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->environment() != 'production') {
            $parse = parse_url(config('app.url'));
            request()->headers->set('host', $parse['host']);
        }

        $this->app->singleton('document', function () {
            return new InertiaDocument();
        });
    }
}
