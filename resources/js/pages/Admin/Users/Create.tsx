
    
    import React from 'react';
    import AuthLayout from '@/layouts/auth-layout'; 
    import { Head, Link, useForm } from '@inertiajs/react';
    import AppLayout from '@/layouts/app-layout';
    import { type BreadcrumbItem } from '@/types';
    import type { User, Role } from '@/types/user';
    import type { PageProps } from '@inertiajs/react'; 
 
    import { Label, Button, Card, Input , Alert } from '@/components/ui';
    import { Select  } from "@/components/ui/select";

    interface UsersPageProps extends PageProps {
        users: User[];
        roles: Role[];
    }

    export default function Create({ roles }: { roles: Role[] }) {
            const { data, setData, post, processing, errors } = useForm({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    roles: []
            });

            const submit = (e:React.FormEvent) => {
                    e.preventDefault();
                    post(route('users.store'));
            };

            const breadcrumbs: BreadcrumbItem[] = [
                    {
                            title: 'Create Users',
                            href: '/users/create',
                    },
            ];
            
            return (
                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Create User" />
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h1 className="text-2xl font-bold mb-4">Create New User</h1>
                                <form onSubmit={submit}>
                                    <div className="mt-6">
                                        <Label htmlFor="name" className="block font-medium text-sm text-gray-700">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className={`form-input mt-1 block w-full ${errors.name ? 'border-red-500' : ''}`}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div className="mt-6">
                                        <Label htmlFor="email" className="block font-medium text-sm text-gray-700">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            className={`form-input mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div className="mt-6">
                                        <Label htmlFor="password" className="block font-medium text-sm text-gray-700">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            className={`form-input mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>

                                    <div className="mt-6">
                                        <Label htmlFor="password_confirmation" className="block font-medium text-sm text-gray-700">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            className={`form-input mt-1 block w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                                    </div>

                                    <div className="mt-6">
                                        <Label htmlFor="roles" className="block font-medium text-sm text-gray-700">Roles</Label>
                                        <select
                                                name='roles'
                                                title='roles'
                                                id="roles"
                                                 
                                                className={`form-select mt-1   block w-full ${errors.roles ? 'border-red-500' : ''} border-input file:text-foreground placeholder:text-muted-foreground 
                                                selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-5 
                                                py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0
                                                 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`}
                                                value={data.roles}
                                                onChange={(e) =>
                                                    setData (
                                                        'roles',
                                                        Array.from(e.target.selectedOptions, (option) => option.value)
                                                    )
                                                }
                                            >
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.name}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        {errors.roles && <p className="text-red-500 text-xs mt-1">{errors.roles}</p>}
                                    </div>

                                    <Button type="submit" className="mt-6">Create User</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </AppLayout>
            );
    }
 