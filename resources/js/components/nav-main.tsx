import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.children ? (
                            <>
                                <SidebarMenuButton
                                    isActive={page.url.startsWith(item.href || '')}
                                    tooltip={{ children: item.title }}
                                >
                                    <div className="flex items-center gap-2">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </div>
                                </SidebarMenuButton>

                                {/* Render child items */}
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={page.url === child.href}
                                                tooltip={{ children: child.title }}
                                            >
                                                <Link href={child.href}>
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={page.url === item.href}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
</SidebarMenu>
        </SidebarGroup>
    );
}
