// resources/js/Pages/Admin/Roles/Edit.tsx
import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { BreadcrumbItem, Permission, Role } from '@/types';
import AppLayout from "@/layouts/app-layout";

interface EditProps {
    role: Role,
    permissions: Permission[];
}

export default function RoleEdit({ role, permissions }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        permissions: number[];
    }>({
        name: role.name,
        permissions: role.permissions?.map((p: Permission) => p.id) || [], // Added optional chaining and fallback
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Roles', href: '/roles' },
        { title: 'Edit Role', href: `/roles/${role.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">
                            Role Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">Permissions</label>
                        <div className="grid grid-cols-2 gap-2">
                            {permissions.map((permission) => (
                                <label key={permission.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.permissions.includes(permission.id)}
                                        onChange={(e) => {
                                            const updatedPermissions = e.target.checked
                                                ? [...data.permissions, permission.id]
                                                : data.permissions.filter((id) => id !== permission.id);
                                            setData('permissions', updatedPermissions);
                                        }}
                                    />
                                    <span>{permission.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        {processing ? 'Updating...' : 'Update Role'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
