<?php
/**
 * Created by PhpStorm.
 * User: AQSSA
 */

namespace App\Observers;


use App\Repositories\LocalizationRepository;
use Illuminate\Support\Facades\Cache;

class LanguageObserver
{
    public function saved($lang)
    {
        Cache::store('octane')->forget('languages');
        if (!$lang->wasChanged('language_code')) return;
        //update keys in translations for this lang
        app(LocalizationRepository::class)->updateTranslationsLanguageCode($lang->getOriginal('language_code'), $lang->language_code);
        Cache::store('octane')->forget('translations');
    }

    public function created($lang)
    {
        Cache::store('octane')->forget('languages');
        //create keys in translations for this lang
        app(LocalizationRepository::class)->addNewTranslationsLanguage($lang->language_code);
        Cache::store('octane')->forget('translations');
    }

    public function deleted($lang)
    {
        Cache::store('octane')->forget('languages');
        //delete translations keys
        app(LocalizationRepository::class)->deleteTranslationsLanguage($lang->language_code);
        Cache::store('octane')->forget('translations');
    }
}
