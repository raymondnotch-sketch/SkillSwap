import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import UsersTable from '../components/admin/UsersTable';
import UserDetailsDrawer from '../components/admin/UserDetailsDrawer';

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">User Management</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage platform users, roles, and account status.</p>
      </div>

      <Card className="p-0">
        <UsersTable onViewUser={setSelectedUser} />
      </Card>

      <UserDetailsDrawer
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </motion.div>
  );
}
