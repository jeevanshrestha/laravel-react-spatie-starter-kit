import React from 'react';

import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import type { User, Role } from '@/types/user';
import type { PageProps } from '@inertiajs/react'; 

import { type BreadcrumbItem } from '@/types';


interface ShowProps {
    role: Role;
    permissions: { id: number; name: string }[];
    users: User[];
    stats: { total_users: number; total_permissions: number };
    allPermissions: { id: number; name: string }[];
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Roles', href: '/roles' },
    { title: 'View Role', href: '/roles/' },
];

export default function RoleShow({ role, permissions, users, stats, allPermissions }: ShowProps) { 
    return (
        <AppLayout breadcrumbs={ breadcrumbs}>
            <Head title={`Role Details - ${role.name}`} />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">{role.name} Role</h1>
                            <Link 
                                href={route('roles.edit', role.id)}
                                className="btn-primary"
                            >
                                Edit Role
                            </Link>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-gray-500 text-sm">Total Users</h3>
                                <p className="text-2xl font-bold">{stats.total_users}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-gray-500 text-sm">Total Permissions</h3>
                                <p className="text-2xl font-bold">{stats.total_permissions}</p>
                            </div>
                        </div>

                        {/* Permissions Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Assigned Permissions</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {permissions.map(permission => (
                                    <div 
                                        key={permission.id}
                                        className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                                    >
                                        {permission.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Users Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Assigned Users</h2>
                            <div className="space-y-2">
                                {users.map(user => (
                                    <div 
                                        key={user.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <Link 
                                            href={route('users.show', user.id)}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}