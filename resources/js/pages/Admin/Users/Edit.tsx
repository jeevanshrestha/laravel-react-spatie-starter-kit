import React, { useState } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function UserEdit({ user, roles }) {
    const { data, setData, put, processing } = useForm({
        roles: user.roles.map(role => role.id)
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit User',
            href: '/users/edit',
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User Roles" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">Edit Roles for {user.name}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`role-${role.id}`}
                                            checked={data.roles.includes(role.id)}
                                            onChange={(e) => {
                                                const selectedRoles = [...data.roles];
                                                if (e.target.checked) {
                                                    selectedRoles.push(role.id);
                                                } else {
                                                    const index = selectedRoles.indexOf(role.id);
                                                    selectedRoles.splice(index, 1);
                                                }
                                                setData('roles', selectedRoles);
                                            }}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`role-${role.id}`} className="ml-2">
                                            {role.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Update Roles
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}