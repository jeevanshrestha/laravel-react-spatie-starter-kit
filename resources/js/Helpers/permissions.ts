export const hasPermission = (user: any, permission: any) => {
    return user?.permissions?.includes(permission) || 
           user?.roles?.some((role: any) => role.permissions.includes(permission));
};