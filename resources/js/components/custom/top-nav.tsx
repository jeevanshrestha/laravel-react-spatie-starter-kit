import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { User, Role } from '@/types/user';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function TopNav() {
    const { auth } = usePage().props as { auth?: { user: User } };
    const roles = auth?.user?.roles?.map(r => r.name).join(', ') ?? '';
    console.log(roles);
    return (
        <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">
                <Link href="/dashboard">My Dashboard</Link>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-gray-600 flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>{auth?.user?.name}</span>
                    <p>Roles: {auth?.user?.roles?.map(role => role.name).join(', ')}</p>
                
                </div>
                <Link href={route('logout')} method="post" as="button" className="text-red-500 flex items-center gap-1 hover:underline">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Link>
            </div>
        </header>
    );
}
