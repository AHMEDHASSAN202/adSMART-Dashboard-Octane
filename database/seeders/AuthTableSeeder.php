<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Str;

class AuthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $u = User::create([
            'fk_role_id' => 1,
            'user_name' => 'ahmed hassan',
            'user_email'    => 'testelbhai@gmail.com',
            'email_verified_at' => now(),
            'user_password' => password_hash(123456, PASSWORD_DEFAULT),
            'user_avatar'   => null,
            'user_token'    => Str::random(100)
        ]);

        Profile::insert([
            'fk_user_id'   => $u->user_id,
            'user_phone'   => '1096206373',
            'fk_user_country' => 177,
            'user_address'  => 'Egypt, Tanat'
        ]);

        User::create([
            'fk_role_id' => 2,
            'user_name' => 'user',
            'user_email'    => 'user@gmail.com',
            'user_password' => password_hash(123456, PASSWORD_DEFAULT),
            'user_avatar'   => null,
            'user_token'    => Str::random(100)
        ]);

        User::create([
            'fk_role_id' => 1,
            'user_name' => 'admin',
            'user_email'    => 'admin@gmail.com',
            'user_password' => password_hash(123456, PASSWORD_DEFAULT),
            'user_avatar'   => null,
            'user_token'    => Str::random(100)
        ]);

        User::create([
            'fk_role_id' => 1,
            'user_name' => 'Mohamed User',
            'user_email'    => 'mohamed@gmail.com',
            'user_password' => password_hash(123456, PASSWORD_DEFAULT),
            'user_avatar'   => null,
            'user_token'    => Str::random(100),
            'email_verified_at' => now(),
        ]);
    }
}
