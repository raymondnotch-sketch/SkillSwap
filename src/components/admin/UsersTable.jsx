import { useState, useEffect } from 'react';
import { MoreHorizontal, Eye, Ban, ShieldOff, Key } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import * as adminService from '../../services/admin';

export default function UsersTable({ onViewUser }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await adminService.getPendingVerifications();
      setUserList(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left">
            <th className="pb-3 pl-4 pr-3 font-medium text-neutral-500">User</th>
            <th className="hidden pb-3 px-3 font-medium text-neutral-500 lg:table-cell font-semibold">School</th>
            <th className="hidden pb-3 px-3 font-medium text-neutral-500 md:table-cell">Status</th>
            <th className="pb-3 pr-4 pl-3 font-medium text-neutral-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {userList.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center text-xs text-neutral-500">
                No users found.
              </td>
            </tr>
          ) : (
            userList.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-neutral-50/50">
                <td className="py-3 pl-4 pr-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={u.full_name ? u.full_name.slice(0, 2).toUpperCase() : 'U'} size="sm" />
                    <div>
                      <p className="font-medium text-neutral-900">{u.full_name}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden py-3 px-3 text-neutral-600 lg:table-cell">{u.school}</td>
                <td className="hidden py-3 px-3 md:table-cell">
                  <Badge color={u.verification_status === 'verified' ? 'success' : 'warning'} variant="solid">
                    {u.verification_status || 'pending'}
                  </Badge>
                </td>
                <td className="py-3 pr-4 pl-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" icon={Eye} onClick={() => onViewUser?.(u)} aria-label="View user" />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
