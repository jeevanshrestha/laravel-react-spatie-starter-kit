import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PaginatedResults, RoleWithPermissions } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Removed unused Badge import
import { PencilIcon, TrashIcon } from 'lucide-react';

interface RoleIndexProps {
    roles: PaginatedResults<RoleWithPermissions>;
    permissions: {
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
}

export default function Index({ roles, permissions }: RoleIndexProps) {
    // Safe access to pagination properties
    const showPagination = roles?.meta?.last_page > 1;
    const currentPage = roles?.meta?.current_page || 1;
    const totalPages = roles?.meta?.last_page || 1;

    return (
        <AppLayout>
            <Head title="Role Management" />

            <div className="container mx-auto py-6">
                {/* ... Header and Create Button ... */}

                <div className="bg-white rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Permissions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.data.map(role => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>
                                        <ul className="list-disc pl-5"> {/* Proper list container */}
                                            {role.permissions.map(permission => (
                                                <li key={permission.id}>{permission.name}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Safe Pagination */}
                    {showPagination && (
                        <div className="px-6 py-4 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {roles.meta.from} to {roles.meta.to} of {roles.meta.total} results
                            </div>
                            <div className="flex space-x-2">
                                {currentPage > 1 && (
                                    <Link href={roles.links.prev || '#'} preserveState>
                                        <Button variant="outline">Previous</Button>
                                    </Link>
                                )}
                                {currentPage < totalPages && (
                                    <Link href={roles.links.next || '#'} preserveState>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
