import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Palette, Database, ShieldCheck, TrendingUp,
  Briefcase, ArrowRight, Clock, Star, Users, BookOpen,
  ChevronRight, Play, CheckCircle, BarChart3,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const learningPaths = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Master modern frontend technologies including React, TypeScript, and CSS frameworks.',
    icon: Code,
    color: 'bg-blue-100 text-blue-600',
    borderColor: 'border-blue-200',
    level: 'Beginner to Advanced',
    duration: '12 weeks',
    lessons: 24,
    enrolled: 342,
    rating: 4.8,
    modules: ['HTML/CSS Fundamentals', 'JavaScript ES6+', 'React & Hooks', 'TypeScript', 'State Management', 'Testing'],
    progress: 0,
  },
  {
    id: 2,
    title: 'Backend Development',
    description: 'Build scalable server-side applications with Node.js, APIs, and databases.',
    icon: Database,
    color: 'bg-emerald-100 text-emerald-600',
    borderColor: 'border-emerald-200',
    level: 'Intermediate',
    duration: '10 weeks',
    lessons: 20,
    enrolled: 256,
    rating: 4.7,
    modules: ['Node.js Basics', 'Express.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Authentication'],
    progress: 35,
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Learn user-centered design principles, prototyping, and design systems.',
    icon: Palette,
    color: 'bg-purple-100 text-purple-600',
    borderColor: 'border-purple-200',
    level: 'Beginner to Intermediate',
    duration: '8 weeks',
    lessons: 18,
    enrolled: 189,
    rating: 4.9,
    modules: ['Design Thinking', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Figma'],
    progress: 0,
  },
  {
    id: 4,
    title: 'Data Science',
    description: 'Dive into data analysis, machine learning, and statistical modeling.',
    icon: BarChart3,
    color: 'bg-amber-100 text-amber-600',
    borderColor: 'border-amber-200',
    level: 'Advanced',
    duration: '14 weeks',
    lessons: 28,
    enrolled: 145,
    rating: 4.6,
    modules: ['Python for Data', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning', 'Deep Learning', 'MLOps'],
    progress: 0,
  },
  {
    id: 5,
    title: 'Cybersecurity',
    description: 'Understand security fundamentals, ethical hacking, and network defense.',
    icon: ShieldCheck,
    color: 'bg-red-100 text-red-600',
    borderColor: 'border-red-200',
    level: 'Intermediate',
    duration: '10 weeks',
    lessons: 20,
    enrolled: 98,
    rating: 4.5,
    modules: ['Security Basics', 'Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response', 'Compliance'],
    progress: 0,
  },
  {
    id: 6,
    title: 'Business & Entrepreneurship',
    description: 'Learn business strategy, marketing, and startup fundamentals.',
    icon: Briefcase,
    color: 'bg-indigo-100 text-indigo-600',
    borderColor: 'border-indigo-200',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 14,
    enrolled: 210,
    rating: 4.4,
    modules: ['Business Models', 'Marketing', 'Finance Basics', 'Pitch Decks', 'Growth Strategies', 'Leadership'],
    progress: 0,
  },
];

export default function LearningPaths() {
  const [paths] = useState(learningPaths);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-lg font-bold tracking-tight text-neutral-900">Learning Paths</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Structured learning journeys to master new skills</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => {
          const Icon = path.icon;
          const isStarted = path.progress > 0;

          return (
            <Card key={path.id} hover className="flex flex-col p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${path.color} mb-4`}>
                <Icon className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-neutral-900">{path.title}</h3>
                <Badge color="primary" variant="solid" className="text-[10px]">{path.level}</Badge>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed flex-1 mb-4">{path.description}</p>

              {isStarted && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-500">Progress</span>
                    <span className="font-medium text-primary-600">{path.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100">
                    <div className="h-1.5 rounded-full bg-primary-600 transition-all" style={{ width: `${path.progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {path.lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {path.duration}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {path.modules.slice(0, 3).map((mod) => (
                  <Badge key={mod} color="neutral" variant="outline" className="text-[10px]">{mod}</Badge>
                ))}
                {path.modules.length > 3 && (
                  <Badge color="neutral" variant="outline" className="text-[10px]">+{path.modules.length - 3} more</Badge>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-neutral-700">{path.rating}</span>
                  <span className="text-neutral-400">· {path.enrolled} enrolled</span>
                </div>
                <Button size="sm" icon={isStarted ? Play : ArrowRight}>
                  {isStarted ? 'Continue' : 'Start'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
