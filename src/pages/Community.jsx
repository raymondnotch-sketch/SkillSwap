import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare, TrendingUp, Search, Users, Heart,
  MessageCircle, Eye, Clock, Pin, BadgeCheck,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';

const categories = [
  { id: 'all', label: 'All Topics', icon: MessageSquare },
  { id: 'frontend', label: 'Frontend', icon: Code },
  { id: 'backend', label: 'Backend', icon: Code },
  { id: 'design', label: 'Design', icon: Code },
  { id: 'career', label: 'Career', icon: Code },
  { id: 'general', label: 'General', icon: MessageSquare },
];

const discussions = [
  {
    id: 1,
    title: 'Best practices for React state management in 2025?',
    author: 'Sarah Kim',
    avatar: 'SK',
    category: 'frontend',
    content: 'I am starting a new project and wondering what the current consensus is on state management. Should I use Zustand, Redux Toolkit, or just React Context?',
    replies: 24,
    views: 342,
    likes: 18,
    time: '2 hours ago',
    pinned: true,
    solved: true,
  },
  {
    id: 2,
    title: 'Tips for first-time mentors: How to structure a good session',
    author: 'Alex Chen',
    avatar: 'AC',
    category: 'general',
    content: 'After running 30+ sessions, here are my top tips for creating effective peer-to-peer learning experiences...',
    replies: 56,
    views: 890,
    likes: 94,
    time: '5 hours ago',
    pinned: true,
    solved: false,
    isMe: true,
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: When to use which?',
    author: 'David Wilson',
    avatar: 'DW',
    category: 'frontend',
    content: 'I keep mixing up when to use Grid and when to use Flexbox. What rules of thumb do you follow?',
    replies: 31,
    views: 567,
    likes: 42,
    time: '8 hours ago',
    pinned: false,
    solved: true,
  },
  {
    id: 4,
    title: 'Transitioning from college projects to real-world codebases',
    author: 'Emily Watson',
    avatar: 'EW',
    category: 'career',
    content: 'I am about to start my first internship and I am nervous about working on a real codebase. Any advice?',
    replies: 47,
    views: 723,
    likes: 65,
    time: '1 day ago',
    pinned: false,
    solved: false,
  },
  {
    id: 5,
    title: 'Design systems: Building reusable components that scale',
    author: 'James Chen',
    avatar: 'JC',
    category: 'design',
    content: 'What are the key principles for building a design system that works across multiple products?',
    replies: 19,
    views: 234,
    likes: 28,
    time: '1 day ago',
    pinned: false,
    solved: false,
  },
  {
    id: 6,
    title: 'Node.js authentication: JWT vs Session-based',
    author: 'Maria Lopez',
    avatar: 'ML',
    category: 'backend',
    content: 'I am building an API and trying to decide between JWT and session-based authentication. What are the trade-offs?',
    replies: 33,
    views: 456,
    likes: 51,
    time: '2 days ago',
    pinned: false,
    solved: true,
  },
];

const popularTopics = [
  { label: 'React Hooks', posts: 128 },
  { label: 'TypeScript', posts: 95 },
  { label: 'Career Advice', posts: 82 },
  { label: 'Python', posts: 74 },
  { label: 'System Design', posts: 68 },
  { label: 'Git & GitHub', posts: 61 },
];

function Code({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  );
}

function DiscussionCard({ discussion }) {
  return (
    <Card hover className="flex gap-4 p-4">
      <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
        <button className="rounded-lg p-1 text-neutral-400 hover:text-primary-600 hover:bg-primary-50">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <span className="text-xs font-semibold text-neutral-700">{discussion.likes}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {discussion.pinned && <Pin className="h-3.5 w-3.5 text-amber-500" />}
          <h3 className="text-sm font-semibold text-neutral-900 truncate">{discussion.title}</h3>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3">{discussion.content}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Avatar initials={discussion.avatar} size="sm" className="h-6 w-6 text-[10px]" />
            <span className={`font-medium ${discussion.isMe ? 'text-primary-600' : 'text-neutral-600'}`}>
              {discussion.author}
              {discussion.isMe && <span className="ml-1 font-normal text-primary-400">(You)</span>}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />{discussion.replies}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />{discussion.views}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />{discussion.time}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Badge color={discussion.category === 'frontend' ? 'primary' : discussion.category === 'backend' ? 'success' : discussion.category === 'design' ? 'secondary' : discussion.category === 'career' ? 'warning' : 'neutral'} variant="outline">
          {discussion.category}
        </Badge>
        {discussion.solved && (
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <BadgeCheck className="h-3.5 w-3.5" />
            Solved
          </div>
        )}
      </div>
    </Card>
  );
}

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredDiscussions = discussions.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic) => (
                  <div key={topic.label} className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs">
                    <span className="font-medium text-neutral-700">{topic.label}</span>
                    <span className="text-neutral-400">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-3">
            <SearchBar
              placeholder="Search discussions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button variant="primary" icon={MessageSquare}>New Post</Button>
          </div>

          <div className="space-y-3">
            {filteredDiscussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
