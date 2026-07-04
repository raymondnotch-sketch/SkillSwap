import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, GraduationCap, BookOpen, Clock, Shield,
  Star, MessageSquare, Award, Edit3, CheckCircle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

const skillsOffered = ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git'];
const skillsWanted = ['Python', 'UI/UX Design', 'Node.js', 'GraphQL'];

const reviews = [
  { id: 1, name: 'Sarah Kim', rating: 5, text: 'Alex is an amazing React tutor! Very patient and explains concepts clearly.', avatar: 'SK', date: '3 days ago' },
  { id: 2, name: 'David Wilson', rating: 5, text: 'Great session on TypeScript. Helped me understand generics.', avatar: 'DW', date: '1 week ago' },
  { id: 3, name: 'Maria Lopez', rating: 4, text: 'Good teaching style. Would recommend for JavaScript basics.', avatar: 'ML', date: '2 weeks ago' },
];

const gamificationBadges = [
  { name: 'Quick Learner', icon: '⚡', earned: true },
  { name: 'Top Rated', icon: '⭐', earned: true },
  { name: 'Session Master', icon: '🏆', earned: true },
  { name: 'Streak Champion', icon: '🔥', earned: false },
  { name: 'Community Star', icon: '🌟', earned: false },
];

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto"
    >
      <Card className="overflow-hidden p-0">
        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-indigo-600 sm:h-40" />
        <div className="px-6 pb-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16">
            <div className="flex items-end gap-4">
              <Avatar initials="AC" size="xl" className="border-4 border-white shadow-sm" />
              <div className="pb-1">
                <h1 className="text-xl font-bold tracking-tight text-neutral-900">Alex Chen</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge color="success" variant="solid">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                  <span className="text-sm text-neutral-500">Computer Science</span>
                </div>
              </div>
            </div>
            <Link to="/profile/edit">
              <Button icon={Edit3} variant="outline" size="sm">Edit Profile</Button>
            </Link>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">About</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Passionate computer science student with a love for teaching and learning. I believe in the power of peer-to-peer education and enjoy helping others grasp complex programming concepts through practical examples and hands-on exercises.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <GraduationCap className="h-4 w-4 text-neutral-400" />
                <span>Stanford University</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <BookOpen className="h-4 w-4 text-neutral-400" />
                <span>Computer Science</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="h-4 w-4 text-neutral-400" />
                <span>California, USA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <GraduationCap className="h-4 w-4 text-neutral-400" />
                <span>Senior Year</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Skills Offered</h2>
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((skill) => (
                <Badge key={skill} color="primary" variant="outline">{skill}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Skills Wanted</h2>
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((skill) => (
                <Badge key={skill} color="secondary" variant="outline">{skill}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Availability</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <div key={day} className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 p-3">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{day}</p>
                    <p className="text-xs text-neutral-500">2:00 - 6:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-neutral-100 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={review.avatar} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{review.name}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-neutral-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{review.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="stat">
            <Award className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">2,750</p>
            <p className="text-sm text-neutral-500">Skill Points</p>
          </Card>

          <Card variant="stat">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">4.8</p>
            <p className="text-sm text-neutral-500">Rating (24 reviews)</p>
          </Card>

          <Card variant="stat">
            <MessageSquare className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">32</p>
            <p className="text-sm text-neutral-500">Sessions Completed</p>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Gamification</h2>
            <div className="space-y-2">
              {gamificationBadges.map((badge) => (
                <div
                  key={badge.name}
                  className={`flex items-center gap-3 rounded-xl p-2.5 ${
                    badge.earned ? 'bg-neutral-50' : 'opacity-40'
                  }`}
                >
                  <span className="text-lg">{badge.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{badge.name}</p>
                  </div>
                  {badge.earned ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Shield className="h-4 w-4 text-neutral-300" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
