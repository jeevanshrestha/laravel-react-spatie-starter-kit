import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {BookOpen, Folder, LayoutGrid, LucidePersonStanding} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: ({ icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; href: string; title: string } | { children: ({ href: string; title: string } | { href: string; title: string })[]; icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; title: string } | { children: ({ href: string; title: string } | { href: string; title: string })[]; icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; title: string })[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        icon: BookOpen,
        children: [
            {
                title: 'All Users',
                href: '/users',
            },
            {
                title: 'Create User',
                href: '/users/create',
            },
        ],
    },
    {
        title: 'Blogs',
        icon: Folder,
        children: [
            {
                title: 'All Posts',
                href: '/blogs',
            },
            {
                title: 'Create Post',
                href: '/blogs/create',
            },
        ],
    },
];
const footerNavItems: NavItem[] = [
    {
        title: 'User Management',
        href: '/users',
        icon: LucidePersonStanding,
    },
    {
        title: 'Roles ',
        href: '/Roles',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
