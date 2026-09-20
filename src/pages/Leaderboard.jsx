import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Medal, Star, TrendingUp, Users, Globe,
  Award, Crown, ChevronUp, Flame, Zap, Target,
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
  { rank: 1, name: 'Maya Patel', points: 980, level: 15, avatar: 'MP', trend: 'up', streak: 12 },
  { rank: 2, name: 'Alex Chen', points: 950, level: 14, avatar: 'AC', trend: 'up', streak: 7, isMe: true },
  { rank: 3, name: 'Sam Lee', points: 720, level: 12, avatar: 'SL', trend: 'down', streak: 5 },
  { rank: 4, name: 'Jordan Fisher', points: 680, level: 11, avatar: 'JF', trend: 'up', streak: 3 },
  { rank: 5, name: 'Taylor Reed', points: 540, level: 10, avatar: 'TR', trend: 'same', streak: 8 },
];

const trendIcons = {
  up: { icon: ChevronUp, color: 'text-emerald-500' },
  down: { icon: ChevronUp, color: 'text-red-500 rotate-180' },
  same: { icon: ChevronUp, color: 'text-neutral-400' },
};

const podiumGradients = {
  1: { bg: 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500', text: 'text-amber-900', icon: Crown },
  2: { bg: 'bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400', text: 'text-slate-800', icon: Medal },
  3: { bg: 'bg-gradient-to-br from-orange-400 via-amber-300 to-orange-500', text: 'text-orange-900', icon: Medal },
};

export default function Leaderboard() {
  const [view, setView] = useState('global');

  const rankings = view === 'global' ? globalRankings : schoolRankings;
  const topThree = rankings.slice(0, 3);
  const restOfRankings = rankings.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/90 text-sm font-semibold uppercase tracking-wider">Rankings</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Community Leaderboard
              </h1>
              <p className="text-lg text-white/90 max-w-xl">
                Compete with learners worldwide and celebrate your achievements
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 rounded-xl bg-white/10 p-2 border border-white/20">
              <button
                onClick={() => setView('school')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  view === 'school'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Trophy className="h-4 w-4" />
                School
              </button>
              <button
                onClick={() => setView('global')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  view === 'global'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" />
                Global
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-semibold mb-1">Your Rank</p>
                <p className="text-2xl font-bold text-neutral-900">#2</p>
              </div>
            </div>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Star className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-semibold mb-1">Total XP</p>
                <p className="text-2xl font-bold text-neutral-900">2,750</p>
              </div>
            </div>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 font-semibold mb-1">XP This Week</p>
                <p className="text-2xl font-bold text-neutral-900">+340</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top 3 Podium Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Top Champions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((entry, index) => {
              const podiumData = podiumGradients[entry.rank];
              const PodiumIcon = podiumData.icon;
              const TrendIcon = trendIcons[entry.trend]?.icon;
              const trendColor = trendIcons[entry.trend]?.color;

              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={entry.rank === 1 ? 'md:order-2' : entry.rank === 2 ? 'md:order-1' : 'md:order-3'}
                >
                  <Card className={`p-8 ${podiumData.bg} border-0 ${entry.isMe ? 'ring-4 ring-primary-400 ring-offset-2' : ''} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMThTMCA4LjA2IDAgMThoMThjMCA5Ljk0IDguMDYgMTggMTggMThWMThoLTB6TTM2IDM2YzAtOS45NC04LjA2LTE4LTE4LTE4djE4aDE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                    
                    <div className="relative text-center">
                      <div className="flex justify-center mb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ${entry.rank === 1 ? 'ring-4 ring-white/50' : ''}`}
                        >
                          <PodiumIcon className={`h-8 w-8 ${podiumData.text}`} />
                        </motion.div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-center mb-3">
                          <Avatar initials={entry.avatar} size="lg" className={`h-20 w-20 text-xl font-bold border-4 ${entry.rank === 1 ? 'border-white/50' : 'border-white/30'}`} />
                        </div>
                        <h3 className={`text-lg font-bold ${podiumData.text} mb-1`}>
                          {entry.name}
                          {entry.isMe && (
                            <span className="ml-2 text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">You</span>
                          )}
                        </h3>
                        <p className={`text-sm ${podiumData.text} opacity-80`}>
                          {entry.university || 'Stanford University'}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <p className={`text-3xl font-bold ${podiumData.text}`}>
                          {entry.points.toLocaleString()}
                        </p>
                        {entry.trend && <TrendIcon className={`h-6 w-6 ${trendColor}`} />}
                      </div>
                      
                      <Badge color="neutral" variant="solid" className={`${podiumData.text} bg-white/20 border-white/40 text-xs font-bold`}>
                        Level {entry.level}
                      </Badge>

                      {entry.streak && (
                        <div className={`mt-4 pt-4 border-t border-white/30 flex items-center justify-center gap-2 text-sm ${podiumData.text}`}>
                          <Flame className="h-5 w-5" />
                          <span className="font-bold">{entry.streak} day streak</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Rest of Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">All Rankings</h2>
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-neutral-100">
              {restOfRankings.map((entry, index) => {
                const TrendIcon = trendIcons[entry.trend]?.icon;
                const trendColor = trendIcons[entry.trend]?.color || 'text-neutral-400';

                return (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', transition: { duration: 0.2 } }}
                    className={`flex items-center gap-6 p-5 transition-colors ${
                      entry.isMe ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                    }`}
                  >
                    {/* Rank Number */}
                    <div className="w-12 flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                        <span className="text-base font-bold text-neutral-600">#{entry.rank}</span>
                      </div>
                    </div>

                    {/* Avatar */}
                    <Avatar initials={entry.avatar} size="md" className="h-12 w-12 text-sm font-bold" />

                    {/* Name & University */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-base font-bold text-neutral-900 truncate">
                          {entry.name}
                          {entry.isMe && (
                            <span className="ml-2 text-xs font-normal bg-primary-600 text-white px-2 py-1 rounded-full">You</span>
                          )}
                        </p>
                        {entry.trend && <TrendIcon className={`h-4 w-4 ${trendColor} shrink-0`} />}
                      </div>
                      <p className="text-sm text-neutral-600 truncate">
                        {entry.university || 'Stanford University'} · Level {entry.level}
                      </p>
                    </div>

                    {/* Streak */}
                    {entry.streak !== undefined && (
                      <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-200">
                        <Flame className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-bold text-orange-700">{entry.streak} days</span>
                      </div>
                    )}

                    {/* Points */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-neutral-900">{entry.points.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500 font-semibold">XP</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
