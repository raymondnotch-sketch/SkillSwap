import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, MapPin, Users, Video, Monitor,
  Coffee, Code, Palette, TrendingUp, Filter, Search,
  ChevronRight, Star,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import SearchBar from '../components/ui/SearchBar';
import { getEvents, getEventFilters } from '../services/events';
import { useEffect } from 'react';

const eventIconMap = { Code, Palette, TrendingUp, Coffee, Monitor };
const eventTypeColors = {
  workshop: 'bg-blue-100 text-blue-600',
  hackathon: 'bg-purple-100 text-purple-600',
  'study-group': 'bg-emerald-100 text-emerald-600',
  meetup: 'bg-amber-100 text-amber-600',
  competition: 'bg-red-100 text-red-600',
};

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [eventsList, setEventsList] = useState([]);
  const [filtersList, setFiltersList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [evts, flts] = await Promise.all([getEvents(), getEventFilters()]);
      setEventsList(Array.isArray(evts) ? evts : []);
      setFiltersList(Array.isArray(flts) ? flts : []);
    }
    loadData();
  }, []);

  const filteredEvents = eventsList.filter((e) => {
    const matchesFilter = activeFilter === 'all' || e.type === activeFilter;
    const matchesSearch = !search || (e.title && e.title.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Discover Events & Learning Opportunities
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Join workshops, meetups, and competitions to expand your skills and connect with the community
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <SearchBar
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" icon={Filter} className="sm:w-auto">
              Advanced Filters
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {filtersList.map((f) => {
              const count = f.key === 'all' ? eventsList.length : eventsList.filter((e) => e.type === f.key).length;
              return (
                <motion.button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeFilter === f.key
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {f.label}
                  <span className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-bold ${
                    activeFilter === f.key ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center mb-6">
                <Calendar className="h-10 w-10 text-neutral-400" />
              </div>
              <p className="text-lg font-semibold text-neutral-700 mb-2">No events found</p>
              <p className="text-sm text-neutral-500">Try adjusting your search or filter</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => {
              const Icon = eventIconMap[event.icon] || Code;
              const LocIcon = event.location === 'Online' ? Video : MapPin;
              const color = eventTypeColors[event.type] || 'bg-blue-100 text-blue-600';
              const spotsLeft = event.maxAttendees - event.attendees;
              const isAlmostFull = spotsLeft <= 5;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="p-0 overflow-hidden h-full flex flex-col group">
                    {/* Cover Image with Gradient */}
                    <div className={`h-40 bg-gradient-to-br ${event.color?.includes('blue') ? 'from-blue-400 to-blue-600' :
                      event.color?.includes('purple') ? 'from-purple-400 to-purple-600' :
                      event.color?.includes('emerald') ? 'from-emerald-400 to-emerald-600' :
                      event.color?.includes('amber') ? 'from-amber-400 to-amber-600' :
                      event.color?.includes('red') ? 'from-red-400 to-red-600' :
                      'from-indigo-400 to-indigo-600'} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      {/* Date Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white rounded-lg px-3.5 py-1.5 shadow-xs">
                          <p className="text-xs font-bold text-neutral-900">{event.date}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <Badge color="primary" variant="outline" className="mb-3">
                          {event.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                          <Clock className="h-4 w-4 text-neutral-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                          <LocIcon className="h-4 w-4 text-neutral-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="h-4 w-4 text-neutral-400" />
                          <span className={`font-semibold ${isAlmostFull ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {spotsLeft} spots left · {event.attendees}/{event.maxAttendees} registered
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {event.tags?.map((tag) => (
                          <Badge key={tag} color="neutral" variant="solid" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Attendee Avatars Row */}
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(4, Math.floor(event.attendees / 10)))].map((_, i) => (
                            <Avatar
                              key={i}
                              initials={`U${i + 1}`}
                              size="sm"
                              className="h-8 w-8 border-2 border-white text-xs"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-500">
                          +{event.attendees - 4} attending
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <Avatar initials={event.hostAvatar} size="sm" className="h-9 w-9" />
                          <div>
                            <p className="text-xs text-neutral-500">Hosted by</p>
                            <p className="text-sm font-semibold text-neutral-900">{event.host}</p>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="md" icon={ChevronRight} className="shadow-lg">
                            Register
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}