// components/UserTable.tsx
import type { User } from '@/types/user';
import { hasRole, hasPermission } from '@/utils/auth';

interface Props {
  users: User[];
}

const UserTable = ({ users }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.roles?.map(role => (
                <span key={role.id}>{role.name}</span>
              ))}
            </td>
            <td>
              {hasPermission(user, 'edit users') && (
                <button>Edit</button>
              )}
              {hasRole(user, 'admin') && (
                <button>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};