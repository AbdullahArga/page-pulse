<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::upsert([
            [
                'name' => 'Admin',
                'code' => 'admin',
            ], [
                'name' => 'User',
                'code' => 'user',
            ]
        ], ['code']);

        $user = User::whereEmail(config('app.email_admin'))->first();
        $user->roles()->sync([
            'role_id' => Role::whereCode('admin')->first()->id
        ]);
        foreach (User::where('email', '!=', config('app.email_admin'))->get() as $user) {
            $user->roles()->sync([
                'role_id' =>
                Role::whereCode('user')->first()->id
            ]);
        }
    }
}
