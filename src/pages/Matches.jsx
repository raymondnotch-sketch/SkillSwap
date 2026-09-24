import { useState, useEffect } from 'react';
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
import * as matchesService from '../services/matches';

const tabIconMap = { pending: Clock, accepted: CheckCircle2, active: Play, completed: Star, cancelled: XCircle };

// ─── MatchCard component ──────────────────────────────────────────────────────
function MatchCard({ match, tab }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Avatar + info */}
        <div className="flex items-start gap-5">
          <Avatar initials={match.avatar} size="lg" className="shrink-0 ring-2 ring-primary-100 ring-offset-2" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">{match.name}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                Learning: {match.skill}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                Teaching: {match.offeredSkill}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {tab === 'pending' && (
                <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <Clock className="h-4 w-4 text-neutral-400" />
                  Requested {match.requestedAt}
                </span>
              )}
              {tab === 'accepted' && (
                <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Accepted {match.acceptedAt}
                </span>
              )}
              {tab === 'active' && (
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                    <Play className="h-4 w-4" />
                    {match.sessionsCompleted} sessions completed
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <Calendar className="h-4 w-4" />
                    Next: {match.nextSession}
                  </span>
                </div>
              )}
              {tab === 'completed' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < match.rating ? 'fill-amber-400 text-amber-400' : 'fill-neutral-100 text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">{match.completedAt}</span>
                </div>
              )}
              {tab === 'cancelled' && (
                <span className="text-sm text-neutral-500">
                  {match.reason} · {match.cancelledAt}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: match score + actions */}
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          {match.matchScore && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              {match.matchScore}% Match
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {tab === 'pending' && (
              <>
                <Button size="sm" variant="outline" icon={XCircle}>
                  Decline
                </Button>
                <Button size="sm" icon={CheckCircle2}>
                  Accept
                </Button>
              </>
            )}
            {tab === 'accepted' && (
              <Button size="sm" icon={MessageSquare}>
                Message
              </Button>
            )}
            {tab === 'active' && (
              <>
                <Button size="sm" variant="outline" icon={MessageSquare}>
                  Chat
                </Button>
                <Button size="sm" icon={Calendar}>
                  Schedule
                </Button>
              </>
            )}
            {tab === 'completed' && (
              <Button size="sm" variant="outline" icon={ChevronRight}>
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Matches() {
  const [activeTab, setActiveTab] = useState('pending');
  const [tabs, setTabs] = useState([]);
  const [allMatches, setAllMatches] = useState({
    pending: [],
    accepted: [],
    active: [],
    completed: [],
    cancelled: [],
  });

  useEffect(() => {
    async function loadData() {
      const [tList, mList] = await Promise.all([
        matchesService.getMatchTabs(),
        matchesService.getMatches(),
      ]);
      setTabs(tList || []);
      setAllMatches(mList || {});
    }
    loadData();
  }, []);

  const currentMatches = allMatches[activeTab] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl px-6 py-8"
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">My Matches</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Manage your skill exchange connections — pending, active, and completed.
        </p>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tabIconMap[tab.key] || Users;
          const count = (allMatches[tab.key] || []).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'gradient-primary border-transparent text-white shadow-lg shadow-indigo-500/30'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {tab.label}
              {count > 0 && (
                <span
                  className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Match Cards ──────────────────────────────────────────────────────── */}
      {currentMatches.length === 0 ? (
        <div className="rounded-2xl border border-neutral-100 bg-white p-16 text-center shadow-card">
          <EmptyState
            icon={Users}
            title={`No ${activeTab} matches`}
            description={`Your ${activeTab} matches will appear here.`}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {currentMatches.map((match) => (
            <MatchCard key={match.id} match={match} tab={activeTab} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
