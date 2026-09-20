import {
  CheckCircle, XCircle, AlertTriangle, ShieldOff,
  Ban, Flag, UserCheck, Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import * as adminService from '../../services/admin';

const getActivityIcon = (action) => {
  if (action.includes('verified') || action.includes('approved')) return { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600' };
  if (action.includes('rejected')) return { icon: XCircle, color: 'bg-red-100 text-red-600' };
  if (action.includes('Warning') || action.includes('warn')) return { icon: AlertTriangle, color: 'bg-amber-100 text-amber-600' };
  if (action.includes('suspended')) return { icon: ShieldOff, color: 'bg-red-100 text-red-600' };
  if (action.includes('banned')) return { icon: Ban, color: 'bg-red-100 text-red-600' };
  if (action.includes('Report') || action.includes('report')) return { icon: Flag, color: 'bg-blue-100 text-blue-600' };
  if (action.includes('admin')) return { icon: UserCheck, color: 'bg-purple-100 text-purple-600' };
  return { icon: Settings, color: 'bg-neutral-200 text-neutral-600' };
};

export default function ActivityTimeline() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await adminService.getActivityLog();
      setActivities(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  if (activities.length === 0) {
    return <p className="text-xs text-neutral-500">No activity logged yet.</p>;
  }

  return (
    <div className="space-y-0">
      {activities.map((activity, index) => {
        const { icon: Icon, color } = getActivityIcon(activity.action);
        return (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-px flex-1 bg-neutral-200 mt-1.5 mb-1.5" />
              )}
            </div>
            <div className={`pb-4 ${index === activities.length - 1 ? '' : ''}`}>
              <p className="text-sm font-medium text-neutral-900">
                {activity.action}
                <span className="font-normal text-neutral-500"> — {activity.user}</span>
              </p>
              <p className="mt-0.5 text-xs text-neutral-400">
                by {activity.admin} · {activity.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
