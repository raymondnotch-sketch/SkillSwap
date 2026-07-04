import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Clock, CheckCircle2, XCircle, Play, Timer,
  MessageSquare, Calendar, Star, ChevronRight,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const tabs = [
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'accepted', label: 'Accepted', icon: CheckCircle2 },
  { key: 'active', label: 'Active', icon: Play },
  { key: 'completed', label: 'Completed', icon: Star },
  { key: 'cancelled', label: 'Cancelled', icon: XCircle },
];

const matches = {
  pending: [
    { id: 1, name: 'Emily Watson', skill: 'UI/UX Design', offeredSkill: 'JavaScript', avatar: 'EW', requestedAt: '2 days ago', matchScore: 92 },
    { id: 2, name: 'Marcus Rivera', skill: 'Python', offeredSkill: 'React', avatar: 'MR', requestedAt: '3 days ago', matchScore: 88 },
    { id: 3, name: 'Yuki Tanaka', skill: 'Node.js', offeredSkill: 'TypeScript', avatar: 'YT', requestedAt: '5 days ago', matchScore: 85 },
  ],
  accepted: [
    { id: 4, name: 'Sarah Kim', skill: 'React Fundamentals', offeredSkill: 'JavaScript', avatar: 'SK', acceptedAt: '1 day ago', matchScore: 95 },
    { id: 5, name: 'David Wilson', skill: 'TypeScript', offeredSkill: 'React', avatar: 'DW', acceptedAt: '2 days ago', matchScore: 91 },
  ],
  active: [
    { id: 6, name: 'James Chen', skill: 'UI/UX Design Basics', offeredSkill: 'HTML/CSS', avatar: 'JC', sessionsCompleted: 3, nextSession: 'Today, 3:00 PM', matchScore: 94 },
    { id: 7, name: 'Maria Lopez', skill: 'Python for Data Science', offeredSkill: 'Python', avatar: 'ML', sessionsCompleted: 5, nextSession: 'Tomorrow, 10:00 AM', matchScore: 89 },
  ],
  completed: [
    { id: 8, name: 'Tom Baker', skill: 'Git & Version Control', offeredSkill: 'React', avatar: 'TB', completedAt: '1 week ago', rating: 5, matchScore: 90 },
    { id: 9, name: 'Lisa Zhang', skill: 'CSS Grid & Flexbox', offeredSkill: 'JavaScript', avatar: 'LZ', completedAt: '2 weeks ago', rating: 4, matchScore: 87 },
    { id: 10, name: 'Ryan O\'Brien', skill: 'React Hooks', offeredSkill: 'TypeScript', avatar: 'RO', completedAt: '3 weeks ago', rating: 5, matchScore: 93 },
  ],
  cancelled: [
    { id: 11, name: 'Anna Schmidt', skill: 'Docker Basics', offeredSkill: 'Node.js', avatar: 'AS', cancelledAt: '4 days ago', reason: 'Schedule conflict' },
  ],
};

function MatchCard({ match, tab }) {
  return (
    <Card hover className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar initials={match.avatar} size="lg" />
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">{match.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge color="primary" variant="outline">{match.skill}</Badge>
            <Badge color="secondary" variant="outline">{match.offeredSkill}</Badge>
          </div>
          <div className="flex items-center gap-3 mt-2">
            {tab === 'pending' && (
              <span className="text-xs text-neutral-500">Requested {match.requestedAt}</span>
            )}
            {tab === 'accepted' && (
              <span className="text-xs text-neutral-500">Accepted {match.acceptedAt}</span>
            )}
            {tab === 'active' && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-600">{match.sessionsCompleted} sessions</span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500">{match.nextSession}</span>
              </div>
            )}
            {tab === 'completed' && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < match.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                ))}
                <span className="ml-1 text-xs text-neutral-400">{match.completedAt}</span>
              </div>
            )}
            {tab === 'cancelled' && (
              <span className="text-xs text-neutral-500">{match.reason} &middot; {match.cancelledAt}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
        <Badge color="success" variant="solid">{match.matchScore}% Match</Badge>
        <div className="flex gap-1.5">
          {tab === 'pending' && (
            <>
              <Button size="sm" variant="outline" icon={XCircle}>Decline</Button>
              <Button size="sm" icon={CheckCircle2}>Accept</Button>
            </>
          )}
          {tab === 'accepted' && (
            <Button size="sm" icon={MessageSquare}>Message</Button>
          )}
          {tab === 'active' && (
            <>
              <Button size="sm" variant="outline" icon={MessageSquare}>Chat</Button>
              <Button size="sm" icon={Calendar}>Schedule</Button>
            </>
          )}
          {tab === 'completed' && (
            <Button size="sm" variant="outline" icon={ChevronRight}>View Details</Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Matches() {
  const [activeTab, setActiveTab] = useState('pending');

  const currentMatches = matches[activeTab] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count = matches[tab.key].length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {count > 0 && (
                <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {currentMatches.length === 0 ? (
        <EmptyState
          icon={Users}
          title={`No ${activeTab} matches`}
          description={`Your ${activeTab} matches will appear here.`}
        />
      ) : (
        <div className="space-y-3">
          {currentMatches.map((match) => (
            <MatchCard key={match.id} match={match} tab={activeTab} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
