import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Filter, Calendar, Search, AlertTriangle, Info, AlertCircle, CheckCircle2, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

const reportCategories = [
  { id: 'all', label: 'All Reports', count: 14 },
  { id: 'harassment', label: 'Harassment', count: 5 },
  { id: 'inappropriate', label: 'Inappropriate Content', count: 4 },
  { id: 'spam', label: 'Spam', count: 3 },
  { id: 'other', label: 'Other', count: 2 },
];

const reports = [
  {
    id: 1,
    title: 'Inappropriate behavior during session',
    description: 'User was using offensive language and making the session uncomfortable. Multiple warnings were given but behavior continued.',
    severity: 'high',
    category: 'harassment',
    submittedBy: 'Sarah Kim',
    submittedByAvatar: 'SK',
    reportedUser: 'John Doe',
    date: '2026-07-05',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Spam messages in chat',
    description: 'Received multiple promotional messages unrelated to skill exchange.',
    severity: 'medium',
    category: 'spam',
    submittedBy: 'James Chen',
    submittedByAvatar: 'JC',
    reportedUser: 'Spammer123',
    date: '2026-07-05',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Inappropriate profile content',
    description: 'Profile contains offensive images and inappropriate bio content.',
    severity: 'high',
    category: 'inappropriate',
    submittedBy: 'Maria Garcia',
    submittedByAvatar: 'MG',
    reportedUser: 'BadActor99',
    date: '2026-07-04',
    status: 'pending',
  },
  {
    id: 4,
    title: 'No-show for scheduled session',
    description: 'User did not attend scheduled session and did not provide notice.',
    severity: 'low',
    category: 'other',
    submittedBy: 'Alex Johnson',
    submittedByAvatar: 'AJ',
    reportedUser: 'Mike Wilson',
    date: '2026-07-04',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Harassing follow-up messages',
    description: 'Continued to send unwanted messages after session ended and user requested to stop.',
    severity: 'high',
    category: 'harassment',
    submittedBy: 'Emily Davis',
    submittedByAvatar: 'ED',
    reportedUser: 'Persistent_User',
    date: '2026-07-03',
    status: 'pending',
  },
];

export default function Reports() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-100 text-rose-700 ring-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 ring-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 ring-blue-200';
      default:
        return 'bg-neutral-100 text-neutral-700 ring-neutral-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return AlertCircle;
      case 'low':
        return Info;
      default:
        return Info;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 px-8 py-10"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Flag className="h-10 w-10 text-rose-600" />
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
              Reports Management
            </h1>
          </div>
          <p className="text-lg text-neutral-600">
            Review and manage user reports and platform violations
          </p>
        </div>

        {/* Filter & Date Range Row */}
        <Card className="p-6 shadow-xs border-neutral-200 bg-white">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 pl-12 pr-4 py-3 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-neutral-200 pl-12 pr-10 py-3 text-sm font-medium text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <select
                className="w-full appearance-none rounded-xl border border-neutral-200 pl-12 pr-10 py-3 text-sm font-medium text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none"
              >
                <option>All Severity</option>
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Report Category Tabs */}
        <div className="flex flex-wrap gap-3">
          {reportCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'border-primary-600 bg-primary-600 text-white shadow-xs'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {category.label}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeCategory === category.id
                  ? 'bg-primary-700 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Report Cards */}
        <div className="space-y-6">
          {reports.map((report, index) => {
            const SeverityIcon = getSeverityIcon(report.severity);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-8 shadow-xs border-neutral-200 bg-white hover:border-neutral-300 transition-colors">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-neutral-900">{report.title}</h3>
                          <Badge className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider ring-2 ${getSeverityColor(report.severity)}`}>
                            <SeverityIcon className="mr-1.5 h-3.5 w-3.5" />
                            {report.severity}
                          </Badge>
                        </div>
                        <p className="text-base leading-relaxed text-neutral-600">
                          {report.description}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          Submitted By
                        </p>
                        <div className="flex items-center gap-3">
                          <Avatar initials={report.submittedByAvatar} size="sm" />
                          <span className="text-sm font-semibold text-neutral-900">{report.submittedBy}</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          Reported User
                        </p>
                        <span className="text-sm font-semibold text-neutral-900">{report.reportedUser}</span>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          Date Submitted
                        </p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-neutral-400" />
                          <span className="text-sm font-semibold text-neutral-900">
                            {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 py-3.5 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        Accept & Take Action
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-neutral-200 hover:border-rose-300 hover:bg-rose-50 py-3.5 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <X className="h-5 w-5" />
                        Dismiss Report
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
