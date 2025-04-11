import React from 'react';

import AppLayout from '@/layouts/app-layout';import { Head, Link } from '@inertiajs/react';
import type { User, Role } from '@/types/user';
import type { PageProps } from '@inertiajs/react'; 

import { type BreadcrumbItem } from '@/types';

interface UsersPageProps extends PageProps {
  users: User[];
  roles: Role[];
}

const breadcrumbs : BreadcrumbItem[] =[
    { 
            title: 'View User',
            href: '/users/',
        
    }
];
export default function UserShow({ user }:  UsersPageProps) {
    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">View User</h1>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                                    <th className="px-6 py-3 bg-gray-50"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.roles && user.roles.map(role => role.name).join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link 
                                                href={route('users.edit', user.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit Roles
                                            </Link>
                                        </td>
                                    </tr>
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}