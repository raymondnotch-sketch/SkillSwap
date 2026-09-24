import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Palette, Database, ShieldCheck, TrendingUp,
  Briefcase, ArrowRight, Clock, Star, Users, BookOpen,
  ChevronRight, Play, CheckCircle, BarChart3, Sparkles,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const iconMap = { Code, Palette, Database, ShieldCheck, TrendingUp, Briefcase, BarChart3 };

const learningPaths = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Master modern frontend technologies including React, TypeScript, and CSS frameworks.',
    icon: Code,
    color: 'bg-blue-100 text-blue-600',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
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
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600',
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
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600',
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
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-600',
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
    gradientFrom: 'from-red-500',
    gradientTo: 'to-red-600',
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
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-600',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 14,
    enrolled: 210,
    rating: 4.4,
    modules: ['Business Models', 'Marketing', 'Finance Basics', 'Pitch Decks', 'Growth Strategies', 'Leadership'],
    progress: 0,
  },
];

const difficultyColors = {
  'Beginner': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Beginner to Intermediate': 'bg-blue-100 text-blue-700 border-blue-200',
  'Intermediate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Beginner to Advanced': 'bg-purple-100 text-purple-700 border-purple-200',
  'Advanced': 'bg-red-100 text-red-700 border-red-200',
};

export default function LearningPaths() {
  const [paths] = useState(learningPaths);
  const featuredPath = paths.find(p => p.id === 2); // Backend Development as featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-white/90 text-sm font-semibold uppercase tracking-wider">Structured Learning</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Master New Skills with Expert-Curated Paths
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Follow structured journeys designed to take you from beginner to expert in the most in-demand skills
            </p>
          </motion.div>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Featured Path Hero Card */}
        {featuredPath && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <Card className="p-0 overflow-hidden bg-primary-900 text-white relative">
              <div className="relative p-10">
                <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary-800 flex items-center justify-center">
                        <featuredPath.icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge color="primary" variant="solid" className="bg-primary-800 text-white border-primary-700 text-xs font-bold">
                        FEATURED PATH
                      </Badge>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {featuredPath.title}
                    </h2>
                    <p className="text-base text-white/90 leading-relaxed mb-6 max-w-2xl">
                      {featuredPath.description}
                    </p>

                    {/* Progress Bar for Featured */}
                    {featuredPath.progress > 0 && (
                      <div className="mb-6 max-w-md">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/90 font-semibold">Your Progress</span>
                          <span className="text-white font-bold">{featuredPath.progress}%</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-primary-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${featuredPath.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-3 rounded-full bg-primary-400"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-6 text-sm text-white/90 mb-6">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-semibold">{featuredPath.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">{featuredPath.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span className="font-semibold">{featuredPath.enrolled} enrolled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-white" />
                        <span className="font-semibold">{featuredPath.rating} rating</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        icon={featuredPath.progress > 0 ? Play : ArrowRight}
                        className="bg-white text-primary-900 hover:bg-neutral-100 border-0 shadow-xs font-bold px-8 py-4"
                      >
                        {featuredPath.progress > 0 ? 'Continue Learning' : 'Start Learning Path'}
                      </Button>
                    </motion.div>
                  </div>

                  {/* Module List */}
                  <div className="lg:w-96 bg-primary-800 rounded-xl p-6 border border-primary-700">
                    <h3 className="text-base font-bold text-white mb-4">What You'll Learn</h3>
                    <div className="space-y-3">
                      {featuredPath.modules.map((module, index) => (
                        <motion.div
                          key={module}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-3 text-sm text-white/90"
                        >
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{module}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* All Paths Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">All Learning Paths</h2>
          <p className="text-base text-neutral-600">Choose the path that matches your goals and skill level</p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const isStarted = path.progress > 0;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="p-6 flex flex-col h-full group hover:shadow-2xl transition-shadow duration-300">
                  {/* Icon with Gradient Background */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${path.gradientFrom} ${path.gradientTo} mb-6 shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Title & Difficulty */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {path.title}
                    </h3>
                    <Badge
                      color="neutral"
                      variant="outline"
                      className={`text-xs font-bold border ${difficultyColors[path.level] || 'bg-neutral-100 text-neutral-700'}`}
                    >
                      {path.level}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-1">
                    {path.description}
                  </p>

                  {/* Progress Bar (if enrolled) */}
                  {isStarted && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-neutral-600 font-semibold">Your Progress</span>
                        <span className="font-bold text-primary-600">{path.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${path.gradientFrom} ${path.gradientTo} transition-all duration-500`}
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-semibold">{path.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold">{path.duration}</span>
                    </div>
                  </div>

                  {/* Modules Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-neutral-100">
                    {path.modules.slice(0, 3).map((mod) => (
                      <Badge key={mod} color="neutral" variant="solid" className="text-xs">
                        {mod}
                      </Badge>
                    ))}
                    {path.modules.length > 3 && (
                      <Badge color="neutral" variant="solid" className="text-xs">
                        +{path.modules.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-neutral-900">{path.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Users className="h-4 w-4" />
                        <span className="font-semibold">{path.enrolled}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="md" icon={isStarted ? Play : ArrowRight} className="shadow-lg">
                        {isStarted ? 'Continue' : 'Start'}
                      </Button>
                    </motion.div>
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
