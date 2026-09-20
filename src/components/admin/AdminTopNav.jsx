import TopNav from '../dashboard/TopNav';

export default function AdminTopNav({ title, onMenuToggle }) {
  return (
    <TopNav
      title={title}
      onMenuToggle={onMenuToggle}
      searchPlaceholder="Search users, reports, sessions..."
      notificationCount={138}
      notificationsPath={null}
      profile={{ name: 'Admin User', subtitle: 'Administrator', initials: 'AD' }}
    />
  );
}
