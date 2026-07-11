import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Calendar, BookOpen, Flame, Star,
  ArrowRight, Clock, CheckCircle, Zap, TrendingUp, MessageSquare, Bell, Activity,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { upcomingSessions, recentActivity, suggestedSkills, recentMessages, leaderboardPreview, notificationsPreview } from '../data/dashboard';

const activityIcons = {
  session: CheckCircle,
  match: Users,
  achievement: Zap,
  learning: BookOpen,
};

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <Card variant="stat" hover className="p-5 text-left">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        {trend && (
          <Badge color="success" variant="solid">{trend}</Badge>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          {greeting}, {user?.name?.split(' ')[0] || 'Alex'}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Here is what is happening with your learning journey today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        <StatCard icon={Users} label="Active Matches" value="8" trend="+2" color="text-primary-600" />
        <StatCard icon={Calendar} label="Sessions This Week" value="5" trend="+1" color="text-indigo-600" />
        <StatCard icon={Star} label="Skill Points" value="2,750" trend="+120" color="text-amber-600" />
        <StatCard icon={Flame} label="Day Streak" value="7" color="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link to="/matches" className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-200">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Find Match</span>
            </Link>
            <Link to="/learning" className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-200">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Browse Skills</span>
            </Link>
            <Link to="/events" className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-200">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Join Event</span>
            </Link>
            <Link to="/sessions" className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-colors hover:border-amber-200 hover:bg-amber-50/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-200">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Book Session</span>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Your Progress</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-neutral-600">Profile Completion</span>
              <span className="font-medium text-neutral-900">75%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-100">
              <div className="h-2 rounded-full bg-primary-600 transition-all" style={{ width: '75%' }} />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-neutral-600">Weekly Goal</span>
              <span className="font-medium text-neutral-900">4/5</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-100">
              <div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3">
            <Flame className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-800">7-Day Streak</p>
              <p className="text-xs text-amber-600">Keep it going! 3 more for a badge.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Upcoming Sessions</h2>
            <Link to="/sessions" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3 transition-colors hover:bg-neutral-50/50">
                <Avatar initials={session.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{session.skill}</p>
                  <p className="text-xs text-neutral-500">with {session.partner} &middot; {session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const ActivityIcon = activityIcons[item.type] || CheckCircle;
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100`}>
                    <ActivityIcon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700">{item.text}</p>
                    <p className="text-xs text-neutral-400">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Suggested Skills</h2>
            <Link to="/learning" className="text-xs font-medium text-primary-600 hover:text-primary-700">Browse all</Link>
          </div>
          <div className="space-y-3">
            {suggestedSkills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between rounded-xl border border-neutral-100 p-3 transition-colors hover:bg-neutral-50/50">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{skill.name}</p>
                  <p className="text-xs text-neutral-500">{skill.level} &middot; {skill.matches} matches</p>
                </div>
                <Button variant="ghost" size="sm" icon={ArrowRight}>Learn</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Recent Messages</h2>
            <Link to="/messages" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-2">
            {recentMessages.map((msg) => (
              <Link
                key={msg.id}
                to="/messages"
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-50"
              >
                <Avatar initials={msg.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-900">{msg.name}</p>
                    <span className="text-xs text-neutral-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{msg.preview}</p>
                </div>
                {msg.unread > 0 && (
                  <Badge color="primary" variant="solid">{msg.unread}</Badge>
                )}
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Leaderboard</h2>
            <Link to="/leaderboard" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-2">
            {leaderboardPreview.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-50"
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  entry.rank === 1 ? 'bg-amber-500 text-white' :
                  entry.rank === 2 ? 'bg-slate-400 text-white' :
                  'bg-orange-400 text-white'
                }`}>
                  {entry.rank}
                </div>
                <Avatar initials={entry.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{entry.name}</p>
                </div>
                <span className="text-xs font-semibold text-neutral-600">
                  {entry.points.toLocaleString()} XP
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Notifications</h2>
            <Link to="/notifications" className="text-xs font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {notificationsPreview.map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 p-3"
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  notif.type === 'reminder' ? 'bg-primary-100' :
                  notif.type === 'match' ? 'bg-emerald-100' : 'bg-amber-100'
                }`}>
                  {notif.type === 'reminder' ? (
                    <Bell className="h-3.5 w-3.5 text-primary-600" />
                  ) : notif.type === 'match' ? (
                    <Users className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Zap className="h-3.5 w-3.5 text-amber-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed text-neutral-700">{notif.text}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}