<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'manage roles',
            'manage permissions',
        ];

        foreach ($permissions as $permission){
            Permission::create(['name'=>$permission]);
        }

        //create roles
        $adminRole = Role::create(['name'=>'admin']);
        $userRole = Role::create(['name'=>'user']);


        //Assign permissions
        $adminRole->givePermissionTo(Permission::all());
        $userRole->givePermissionTo(['view users']);


        //create admin user
        $admin= User::create(
            [ 'name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('password') ]
        );
        
        $admin->assignRole($adminRole);
    }
}
