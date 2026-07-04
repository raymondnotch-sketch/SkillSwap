import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Medal, Star, TrendingUp, Users, Globe,
  Award, Crown, ChevronUp, Flame, Zap,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

const globalRankings = [
  { rank: 1, name: 'Maya Patel', university: 'MIT', points: 2840, level: 15, avatar: 'MP', trend: 'up', streak: 21 },
  { rank: 2, name: 'Alex Chen', university: 'Stanford University', points: 2750, level: 14, avatar: 'AC', trend: 'up', streak: 7, isMe: true },
  { rank: 3, name: 'Ryan O\'Brien', university: 'UC Berkeley', points: 2610, level: 14, avatar: 'RO', trend: 'down', streak: 5 },
  { rank: 4, name: 'Sarah Kim', university: 'Carnegie Mellon', points: 2480, level: 13, avatar: 'SK', trend: 'up', streak: 12 },
  { rank: 5, name: 'James Chen', university: 'Georgia Tech', points: 2350, level: 12, avatar: 'JC', trend: 'same', streak: 9 },
  { rank: 6, name: 'Emily Watson', university: 'UCLA', points: 2220, level: 12, avatar: 'EW', trend: 'up', streak: 4 },
  { rank: 7, name: 'David Wilson', university: 'University of Washington', points: 2090, level: 11, avatar: 'DW', trend: 'down', streak: 3 },
  { rank: 8, name: 'Maria Lopez', university: 'UT Austin', points: 1960, level: 11, avatar: 'ML', trend: 'up', streak: 8 },
  { rank: 9, name: 'Tom Baker', university: 'University of Michigan', points: 1830, level: 10, avatar: 'TB', trend: 'same', streak: 6 },
  { rank: 10, name: 'Lisa Zhang', university: 'NYU', points: 1700, level: 10, avatar: 'LZ', trend: 'up', streak: 2 },
];

const schoolRankings = [
  { rank: 1, name: 'Maya Patel', points: 980, level: 15, avatar: 'MP' },
  { rank: 2, name: 'Alex Chen', points: 950, level: 14, avatar: 'AC', isMe: true },
  { rank: 3, name: 'Sam Lee', points: 720, level: 12, avatar: 'SL' },
  { rank: 4, name: 'Jordan Fisher', points: 680, level: 11, avatar: 'JF' },
  { rank: 5, name: 'Taylor Reed', points: 540, level: 10, avatar: 'TR' },
];

const trendIcons = {
  up: { icon: ChevronUp, color: 'text-emerald-500' },
  down: { icon: ChevronUp, color: 'text-red-500 rotate-180' },
  same: { icon: ChevronUp, color: 'text-neutral-400' },
};

export default function Leaderboard() {
  const [view, setView] = useState('global');

  const rankings = view === 'global' ? globalRankings : schoolRankings;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-neutral-900">Leaderboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">See how you rank among the community</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-neutral-100 p-1">
          <button
            onClick={() => setView('school')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              view === 'school' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Trophy className="h-4 w-4" />
            School
          </button>
          <button
            onClick={() => setView('global')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              view === 'global' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Globe className="h-4 w-4" />
            Global
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <Card className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">Your Rank</p>
            <p className="text-lg font-bold text-neutral-900">#2</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
            <Star className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">Total XP</p>
            <p className="text-lg font-bold text-neutral-900">2,750</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">XP This Week</p>
            <p className="text-lg font-bold text-neutral-900">+340</p>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-neutral-100">
          {rankings.map((entry) => {
            const TrendIcon = trendIcons[entry.trend]?.icon;
            const trendColor = trendIcons[entry.trend]?.color || 'text-neutral-400';

            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-neutral-50 ${
                  entry.isMe ? 'bg-primary-50/50 border-l-4 border-l-primary-500' : ''
                }`}
              >
                <div className="flex w-10 justify-center">
                  {entry.rank <= 3 ? (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      entry.rank === 1 ? 'bg-amber-100' :
                      entry.rank === 2 ? 'bg-neutral-200' :
                      'bg-orange-100'
                    }`}>
                      {entry.rank === 1 ? (
                        <Crown className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Medal className={`h-4 w-4 ${
                          entry.rank === 2 ? 'text-neutral-500' : 'text-orange-600'
                        }`} />
                      )}
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-neutral-400">#{entry.rank}</span>
                  )}
                </div>

                <Avatar initials={entry.avatar} size="md" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-900">
                      {entry.name}
                      {entry.isMe && <span className="ml-1 text-xs font-normal text-primary-600">(You)</span>}
                    </p>
                    {entry.trend && (
                      <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500">
                    {entry.university || 'Stanford University'}
                    {entry.level && ` · Level ${entry.level}`}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  {entry.streak !== undefined && (
                    <div className="hidden sm:flex items-center gap-1 text-sm text-neutral-500">
                      <Flame className="h-4 w-4 text-amber-500" />
                      <span>{entry.streak} days</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{entry.points.toLocaleString()}</p>
                    <p className="text-xs text-neutral-400">XP</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
