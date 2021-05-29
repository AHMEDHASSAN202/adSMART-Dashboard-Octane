<?php
/**
 * Created by PhpStorm.
 * User: AQSSA
 */

namespace App\Repositories;

use Illuminate\Http\Request;
use Laravel\Octane\Facades\Octane;

class DashboardRepository
{
    public function load(Request $request)
    {
        [$countUsers, $countPages, $countCategories, $latestUsers] = Octane::concurrently([
            fn () => app(UsersRepository::class)->getCountUsers(),
            fn () => app(PagesRepository::class)->getCountPages(),
            fn () => app(CategoriesRepository::class)->getCountCategories(),
            fn () => app(UsersRepository::class)->getLatestUsers(),
        ]);

        return compact('countUsers', 'countPages', 'countCategories', 'latestUsers');
    }
}
