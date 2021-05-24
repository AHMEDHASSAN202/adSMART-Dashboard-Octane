<?php

namespace App\Listeners\Dashboard;

use App\Mail\Dashboard\UserNotificationAboutTheirAccount;
use Illuminate\Support\Facades\Mail;

class SendUserNotificationAboutTheirAccount
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        if (request()->send_user_notification != true) return;

        \Swoole\Timer::after(1000, function () use ($event) {
            Mail::to($event->user->user_email)->send(new UserNotificationAboutTheirAccount($event->user));
        });

    }
}
