// types/user.ts
export interface Permission {
    id: number;
    name: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    permissions?: Permission[];
    created_at?: string;
    updated_at?: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    permissions?: Permission[]; // Direct permissions if needed
  }

export interface RoleWithPermissions {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    users_count: number;
}

export interface PaginatedResults<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}



  // For Inertia.js page props
  declare module '@inertiajs/react' {
    interface PageProps {
      auth: {
        user: User & {
          roles: Role[];
          permissions: Permission[];
        };
      };
      users?: User[];
      roles?: Role[];
      permissions?: Permission[];
    }
  }
