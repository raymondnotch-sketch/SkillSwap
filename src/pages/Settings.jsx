import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Shield, Lock, Bell, Sun, Eye,
  Globe, Mail, Smartphone, ChevronRight,
  Trash2, Download, LogOut,
  MessageSquare, Handshake,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useToast } from '../components/ui/Toast';

function SettingRow({ icon: Icon, label, description, action, danger = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          danger ? 'bg-red-100' : 'bg-neutral-100'
        }`}>
          <Icon className={`h-4.5 w-4.5 ${danger ? 'text-red-600' : 'text-neutral-500'}`} />
        </div>
        <div>
          <p className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-neutral-900'}`}>{label}</p>
          {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-primary-600' : 'bg-neutral-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('profile');

  const [profileSettings, setProfileSettings] = useState({
    displayName: 'Alex Chen',
    username: 'alexchen',
    university: 'Stanford University',
    department: 'Computer Science',
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showSkills: true,
    showActivity: true,
    allowMessages: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    matchUpdates: true,
    sessionReminders: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
  });

  const [contactPrefs, setContactPrefs] = useState({
    shareEmailAfterMatch: true,
    sharePhoneAfterMatch: false,
    allowDirectMessages: true,
  });

  const sections = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'privacy', label: 'Privacy', icon: Eye },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'appearance', label: 'Appearance', icon: Sun },
    { key: 'contact', label: 'Contact Sharing', icon: Globe },
  ];

  const handleSave = (section) => {
    toast.success(`${section} settings saved`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-56 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.key
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 space-y-6">
          {activeSection === 'profile' && (
            <Card>
              <h2 className="text-sm font-semibold text-neutral-900 mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <Input
                  label="Display Name"
                  value={profileSettings.displayName}
                  onChange={(e) => setProfileSettings((p) => ({ ...p, displayName: e.target.value }))}
                />
                <Input
                  label="Username"
                  value={profileSettings.username}
                  onChange={(e) => setProfileSettings((p) => ({ ...p, username: e.target.value }))}
                  helper="Your unique username for sharing your profile."
                />
                <Input
                  label="University"
                  value={profileSettings.university}
                  onChange={(e) => setProfileSettings((p) => ({ ...p, university: e.target.value }))}
                />
                <Input
                  label="Department"
                  value={profileSettings.department}
                  onChange={(e) => setProfileSettings((p) => ({ ...p, department: e.target.value }))}
                />
                <div className="flex justify-end">
                  <Button onClick={() => handleSave('Profile')} size="sm">Save</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <h2 className="text-sm font-semibold text-neutral-900 mb-1">Privacy Settings</h2>
              <p className="text-xs text-neutral-500 mb-4">Control who can see your profile and activity.</p>
              <div className="space-y-1 divide-y divide-neutral-100">
                <SettingRow
                  icon={Globe}
                  label="Profile Visibility"
                  description="Control who can view your full profile."
                  action={
                    <Select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings((p) => ({ ...p, profileVisibility: e.target.value }))}
                      className="w-36"
                    >
                      <option value="public">Public</option>
                      <option value="matches">Matches Only</option>
                      <option value="private">Private</option>
                    </Select>
                  }
                />
                <SettingRow
                  icon={Mail}
                  label="Show Email"
                  description="Display your email on your public profile."
                  action={
                    <ToggleSwitch
                      checked={privacySettings.showEmail}
                      onChange={(v) => setPrivacySettings((p) => ({ ...p, showEmail: v }))}
                      label="Show email"
                    />
                  }
                />
                <SettingRow
                  icon={User}
                  label="Show Skills"
                  description="Display your skills on your public profile."
                  action={
                    <ToggleSwitch
                      checked={privacySettings.showSkills}
                      onChange={(v) => setPrivacySettings((p) => ({ ...p, showSkills: v }))}
                      label="Show skills"
                    />
                  }
                />
                <SettingRow
                  icon={Eye}
                  label="Activity Status"
                  description="Show when you were last active."
                  action={
                    <ToggleSwitch
                      checked={privacySettings.showActivity}
                      onChange={(v) => setPrivacySettings((p) => ({ ...p, showActivity: v }))}
                      label="Show activity"
                    />
                  }
                />
                <SettingRow
                  icon={MessageSquare}
                  label="Allow Messages"
                  description="Let other users send you messages."
                  action={
                    <ToggleSwitch
                      checked={privacySettings.allowMessages}
                      onChange={(v) => setPrivacySettings((p) => ({ ...p, allowMessages: v }))}
                      label="Allow messages"
                    />
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleSave('Privacy')} size="sm">Save</Button>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <>
              <Card>
                <h2 className="text-sm font-semibold text-neutral-900 mb-4">Change Password</h2>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={(e) => setSecuritySettings((s) => ({ ...s, currentPassword: e.target.value }))}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => setSecuritySettings((s) => ({ ...s, newPassword: e.target.value }))}
                    helper="Must be at least 8 characters with a number."
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings((s) => ({ ...s, confirmPassword: e.target.value }))}
                  />
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('Password')} size="sm">Update Password</Button>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-1 divide-y divide-neutral-100">
                  <SettingRow
                    icon={Shield}
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account."
                    action={
                      <ToggleSwitch
                        checked={securitySettings.twoFactor}
                        onChange={(v) => setSecuritySettings((s) => ({ ...s, twoFactor: v }))}
                        label="Two-factor"
                      />
                    }
                  />
                </div>
              </Card>

              <Card>
                <div className="space-y-1 divide-y divide-neutral-100">
                  <SettingRow
                    icon={Smartphone}
                    label="Active Sessions"
                    description="Manage your logged-in devices."
                    action={<Button variant="ghost" size="sm" icon={ChevronRight}>View</Button>}
                  />
                  <SettingRow
                    icon={Download}
                    label="Download Data"
                    description="Request a copy of your data."
                    action={<Button variant="ghost" size="sm" icon={Download}>Export</Button>}
                  />
                </div>
              </Card>
            </>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <h2 className="text-sm font-semibold text-neutral-900 mb-1">Notification Preferences</h2>
              <p className="text-xs text-neutral-500 mb-4">Choose how you want to be notified.</p>
              <div className="space-y-1 divide-y divide-neutral-100">
                <SettingRow
                  icon={Mail}
                  label="Email Notifications"
                  description="Receive notifications via email."
                  action={
                    <ToggleSwitch checked={notificationPrefs.emailNotifications} onChange={(v) => setNotificationPrefs((p) => ({ ...p, emailNotifications: v }))} label="Email" />
                  }
                />
                <SettingRow
                  icon={Smartphone}
                  label="Push Notifications"
                  description="Receive push notifications in your browser."
                  action={
                    <ToggleSwitch checked={notificationPrefs.pushNotifications} onChange={(v) => setNotificationPrefs((p) => ({ ...p, pushNotifications: v }))} label="Push" />
                  }
                />
                <SettingRow
                  icon={Handshake}
                  label="Match Updates"
                  description="Get notified when you receive new matches."
                  action={
                    <ToggleSwitch checked={notificationPrefs.matchUpdates} onChange={(v) => setNotificationPrefs((p) => ({ ...p, matchUpdates: v }))} label="Match updates" />
                  }
                />
                <SettingRow
                  icon={Bell}
                  label="Session Reminders"
                  description="Receive reminders before scheduled sessions."
                  action={
                    <ToggleSwitch checked={notificationPrefs.sessionReminders} onChange={(v) => setNotificationPrefs((p) => ({ ...p, sessionReminders: v }))} label="Session reminders" />
                  }
                />
                <SettingRow
                  icon={Mail}
                  label="Marketing Emails"
                  description="Receive tips, updates, and promotional content."
                  action={
                    <ToggleSwitch checked={notificationPrefs.marketingEmails} onChange={(v) => setNotificationPrefs((p) => ({ ...p, marketingEmails: v }))} label="Marketing" />
                  }
                />
                <SettingRow
                  icon={Mail}
                  label="Weekly Digest"
                  description="Get a weekly summary of your activity."
                  action={
                    <ToggleSwitch checked={notificationPrefs.weeklyDigest} onChange={(v) => setNotificationPrefs((p) => ({ ...p, weeklyDigest: v }))} label="Weekly digest" />
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleSave('Notification')} size="sm">Save</Button>
              </div>
            </Card>
          )}

          {activeSection === 'appearance' && (
            <Card>
              <h2 className="text-sm font-semibold text-neutral-900 mb-1">Appearance</h2>
              <p className="text-xs text-neutral-500 mb-4">Customize how SkillSwap looks for you.</p>
              <div className="space-y-1 divide-y divide-neutral-100">
                <SettingRow
                  icon={Sun}
                  label="Theme"
                  description="Choose your preferred theme."
                  action={
                    <Select
                      value={appearanceSettings.theme}
                      onChange={(e) => setAppearanceSettings((a) => ({ ...a, theme: e.target.value }))}
                      className="w-32"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  }
                />
                <SettingRow
                  icon={Sun}
                  label="Font Size"
                  description="Adjust the text size across the app."
                  action={
                    <Select
                      value={appearanceSettings.fontSize}
                      onChange={(e) => setAppearanceSettings((a) => ({ ...a, fontSize: e.target.value }))}
                      className="w-32"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Select>
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleSave('Appearance')} size="sm" disabled>Coming Soon</Button>
              </div>
            </Card>
          )}

          {activeSection === 'contact' && (
            <Card>
              <h2 className="text-sm font-semibold text-neutral-900 mb-1">Contact Sharing Preferences</h2>
              <p className="text-xs text-neutral-500 mb-4">Control when your contact information is shared.</p>
              <div className="space-y-1 divide-y divide-neutral-100">
                <SettingRow
                  icon={Mail}
                  label="Share Email After Match"
                  description="Automatically share your email after a match is accepted."
                  action={
                    <ToggleSwitch checked={contactPrefs.shareEmailAfterMatch} onChange={(v) => setContactPrefs((p) => ({ ...p, shareEmailAfterMatch: v }))} label="Share email" />
                  }
                />
                <SettingRow
                  icon={Smartphone}
                  label="Share Phone After Match"
                  description="Automatically share your phone number after a match is accepted."
                  action={
                    <ToggleSwitch checked={contactPrefs.sharePhoneAfterMatch} onChange={(v) => setContactPrefs((p) => ({ ...p, sharePhoneAfterMatch: v }))} label="Share phone" />
                  }
                />
                <SettingRow
                  icon={MessageSquare}
                  label="Allow Direct Messages"
                  description="Let matched users message you directly."
                  action={
                    <ToggleSwitch checked={contactPrefs.allowDirectMessages} onChange={(v) => setContactPrefs((p) => ({ ...p, allowDirectMessages: v }))} label="Allow DMs" />
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleSave('Contact preferences')} size="sm">Save</Button>
              </div>
            </Card>
          )}

          <Card className="border-red-200 bg-red-50/30">
            <h2 className="text-sm font-semibold text-red-700 mb-1">Danger Zone</h2>
            <p className="text-xs text-red-500 mb-4">These actions cannot be undone. Please proceed with caution.</p>
            <div className="space-y-1 divide-y divide-red-100">
              <SettingRow
                icon={Trash2}
                label="Delete Account"
                description="Permanently delete your account and all associated data."
                danger
                action={<Button variant="danger" size="sm" icon={Trash2}>Delete</Button>}
              />
              <SettingRow
                icon={LogOut}
                label="Sign Out Everywhere"
                description="Sign out from all active sessions and devices."
                danger
                action={<Button variant="outline" size="sm" icon={LogOut}>Sign Out</Button>}
              />
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
