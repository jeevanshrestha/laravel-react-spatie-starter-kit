<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Intertia::render('Admin/Roles/Index',[
            'roles'=> Role::with('permissions')->get(),
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Intertia::reinder('Admin/Roles/Create',[
            'permissions'=> Permissions::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success', 'Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        // Load role with permissions and users assigned to this role
        $role->load(['permissions', 'users' => function($query) {
            $query->select('users.id', 'name', 'email');
        }]);
    
        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
            'permissions' => $role->permissions,
            'users' => $role->users,
            'allPermissions' => Permission::all(),
            'stats' => [
                'total_users' => $role->users->count(),
                'total_permissions' => $role->permissions->count()
            ]
        ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
        return Inertia::render('Admin/Role/Edit',[
            'role' => $role->load('permissions'),
            'permissions'=> Permissions::all()
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
        $request->validate([
            'name' => 'required|unique:roles,name,'.$role->id,
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
                // Prevent deletion of admin role
                if ($role->name === 'admin') {
                    return redirect()->back()->with('error', 'Cannot delete admin role');
                }
        
                $role->delete();
                return redirect()->route('roles.index')->with('success', 'Role deleted successfully');
    }
}
