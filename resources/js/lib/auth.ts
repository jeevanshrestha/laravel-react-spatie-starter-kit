// utils/auth.ts
import type { User, Permission, Role } from '@/types/user';

export const hasRole = (user: User, roleName: string): boolean => {
  return user.roles?.some(role => role.name === roleName) ?? false;
};

export const hasPermission = (user: User, permissionName: string): boolean => {
  // Check direct permissions
  const hasDirect = user.permissions?.some(p => p.name === permissionName) ?? false;
  
  // Check permissions through roles
  const hasViaRole = user.roles?.some(role => 
    role.permissions?.some(p => p.name === permissionName)
  ) ?? false;

  return hasDirect || hasViaRole;
};

export const hasAnyPermission = (user: User, permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(user, permission));
};