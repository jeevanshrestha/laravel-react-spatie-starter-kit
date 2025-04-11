// types/forms.ts
export interface UserFormData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    roles: number[]; // Array of role IDs
  }
  
  export interface RoleFormData {
    name: string;
    permissions: number[]; // Array of permission IDs
  }