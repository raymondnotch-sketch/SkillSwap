import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, UserCheck, Clock, Handshake, Flag,
  TrendingUp, Eye, AlertTriangle, ArrowRight,
  Calendar, Activity,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import StatsCard from '../components/admin/StatsCard';
import { useState, useEffect } from 'react';
import * as adminService from '../services/admin';

const quickActions = [
  { label: 'Verify IDs', icon: 'UserCheck', path: '/admin/verification', color: 'bg-emerald-100 text-emerald-600' },
  { label: 'View Reports', icon: 'Flag', path: '/admin/reports', color: 'bg-red-100 text-red-600' },
  { label: 'Manage Users', icon: 'Users', path: '/admin/users', color: 'bg-primary-100 text-primary-600' },
  { label: 'System Logs', icon: 'Activity', path: '/admin/activity', color: 'bg-purple-100 text-purple-600' },
];

const actionIconMap = { UserCheck, Flag, Users, Activity };

export default function AdminDashboard() {
  const [pendingVerifs, setPendingVerifs] = useState([]);
  const [reportsList, setReportsList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [verifs, rpts] = await Promise.all([
        adminService.getPendingVerifications(),
        adminService.getReports(),
      ]);
      setPendingVerifs(Array.isArray(verifs) ? verifs : []);
      setReportsList(Array.isArray(rpts) ? rpts : []);
    }
    loadData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <p className="text-sm text-neutral-500">Platform overview and quick actions for administrators.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        <StatsCard icon={Users} label="Total Users" value="1,284" trend="+12 this week" color="text-primary-600" />
        <StatsCard icon={UserCheck} label="Verified Users" value="892" trend="+8 this week" color="text-emerald-600" />
        <StatsCard icon={Clock} label="Pending Verifications" value="5" color="text-amber-600" />
        <StatsCard icon={Handshake} label="Active Matches" value="143" trend="+18%" color="text-indigo-600" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        <StatsCard icon={Flag} label="Reports Awaiting" value="4" color="text-red-600" />
        <StatsCard icon={Activity} label="Active Sessions" value="37" color="text-purple-600" />
        <StatsCard icon={Calendar} label="Events This Week" value="6" color="text-sky-600" />
        <StatsCard icon={TrendingUp} label="Growth This Month" value="+24%" trend="+5% vs last" color="text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = actionIconMap[action.icon];
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-colors hover:border-neutral-300 hover:bg-white hover:shadow-soft"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-neutral-700">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Platform Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Uptime</span>
              <Badge color="success" variant="solid">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">API Response</span>
              <Badge color="success" variant="solid">142ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Storage</span>
              <Badge color="primary" variant="outline">32% used</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Error Rate</span>
              <Badge color="success" variant="solid">0.02%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Last Backup</span>
              <span className="text-xs text-neutral-500">2 hours ago</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Pending Verifications</h2>
            <Link to="/admin/verification" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {pendingVerifs.length === 0 ? (
              <p className="text-xs text-neutral-500">No pending verifications.</p>
            ) : (
              pendingVerifs.map((v) => (
                <div key={v.id} className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3">
                  <Avatar initials={v.full_name ? v.full_name.slice(0, 2).toUpperCase() : 'U'} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{v.full_name}</p>
                    <p className="text-xs text-neutral-500">{v.school}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" icon={Eye}>Review</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Recent Reports</h2>
            <Link to="/admin/reports" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {reportsList.length === 0 ? (
              <p className="text-xs text-neutral-500">No recent reports.</p>
            ) : (
              reportsList.map((r) => (
                <div key={r.id} className="rounded-xl border border-neutral-100 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-neutral-900">{r.reporter_id} → {r.reported_id}</p>
                    <Badge color={r.status === 'resolved' ? 'success' : 'warning'} variant="solid">{r.status || 'open'}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500">{r.reason}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Button size="sm" variant="ghost" icon={ArrowRight}>Review</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
