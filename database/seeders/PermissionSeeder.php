<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Permission::upsert([
            [
                'name' => 'Add User',
                'code' => 'add_user',
            ], [
                'name' => 'Delete User',
                'code' => 'delete_user',
            ], [
                'name' => 'Add Article',
                'code' => 'add_article',
            ], [
                'name' => 'Update Article',
                'code' => 'update_article',
            ], [
                'name' => 'Delete Article',
                'code' => 'delete_article',
            ], [
                'name' => 'Active Article',
                'code' => 'active_article',
            ], [
                'name' => 'Read Article',
                'code' => 'read_article',
            ]
        ], ['code']);

        $admin = Role::whereCode('admin')->first();
        $admin->permissions()->sync(Permission::get()->pluck('id')->map(function ($item) {
            return ['permission_id' => $item];
        })->toArray());

        $admin = Role::whereCode('user')->first();
        $admin->permissions()->sync(Permission::whereIn('code', [
            'add_article',
            'update_article',
            'delete_article',
            'active_article',
            'read_article',
        ])->pluck('id')->map(function ($item) {
            return ['permission_id' => $item];
        })->toArray());
    }
}
