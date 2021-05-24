<?php
/**
 * Created by PhpStorm.
 * User: AQSSA
 */

namespace App\Observers;


use Illuminate\Support\Facades\Cache;

class TranslationObserver
{
    public function saved($translate)
    {
        Cache::store('octane')->forget('translations');
    }

    public function created($translate)
    {
        Cache::store('octane')->forget('translations');
    }

    public function deleted($translate)
    {
        Cache::store('octane')->forget('translations');
    }
}
