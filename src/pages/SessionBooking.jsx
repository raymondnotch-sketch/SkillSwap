import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, ChevronLeft, ChevronRight, Check,
  Video, MapPin, Users, User, ArrowRight, Info,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Select from '../components/ui/Select';
import { useToast } from '../components/ui/Toast';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendarDays = [
  { day: 28, month: 'prev' }, { day: 29, month: 'prev' }, { day: 30, month: 'prev' },
  { day: 1, month: 'current' }, { day: 2, month: 'current' },
  { day: 3, month: 'current' }, { day: 4, month: 'current' },
  { day: 5, month: 'current' }, { day: 6, month: 'current' },
  { day: 7, month: 'current' }, { day: 8, month: 'current' },
  { day: 9, month: 'current' }, { day: 10, month: 'current' },
  { day: 11, month: 'current' }, { day: 12, month: 'current' },
  { day: 13, month: 'current' }, { day: 14, month: 'current', booked: true },
  { day: 15, month: 'current' }, { day: 16, month: 'current', booked: true },
  { day: 17, month: 'current' }, { day: 18, month: 'current' },
  { day: 19, month: 'current' }, { day: 20, month: 'current' },
  { day: 21, month: 'current' }, { day: 22, month: 'current' },
  { day: 23, month: 'current' }, { day: 24, month: 'current' },
  { day: 25, month: 'current' }, { day: 26, month: 'current' },
  { day: 27, month: 'current' }, { day: 28, month: 'current' },
  { day: 29, month: 'current' }, { day: 30, month: 'current' },
  { day: 31, month: 'current' }, { day: 1, month: 'next' }, { day: 2, month: 'next' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM',
];

const upcomingSessions = [
  { id: 1, partner: 'Sarah Kim', skill: 'React Fundamentals', date: 'Jul 15, 2025', time: '3:00 PM', duration: '1 hour', avatar: 'SK', type: 'video' },
  { id: 2, partner: 'James Chen', skill: 'UI/UX Design Basics', date: 'Jul 18, 2025', time: '10:00 AM', duration: '1.5 hours', avatar: 'JC', type: 'video' },
];

export default function SessionBooking() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [sessionType, setSessionType] = useState('video');
  const [currentMonth] = useState(6);
  const [currentYear] = useState(2025);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast.warning('Please select a date and time');
      return;
    }
    setConfirmed(true);
    toast.success('Session booked successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-neutral-900">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" icon={ChevronLeft} aria-label="Previous month" />
                <Button variant="ghost" size="icon" icon={ChevronRight} aria-label="Next month" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-neutral-400 py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => {
                const isCurrent = d.month === 'current';
                const isSelected = isCurrent && d.day === selectedDate;
                const isToday = isCurrent && d.day === 15;

                return (
                  <button
                    key={i}
                    disabled={!isCurrent || d.booked}
                    onClick={() => isCurrent && !d.booked && setSelectedDate(d.day)}
                    className={`relative flex items-center justify-center rounded-lg py-2 text-sm transition-colors ${
                      !isCurrent
                        ? 'text-neutral-300 cursor-default'
                        : d.booked
                          ? 'text-neutral-300 cursor-not-allowed line-through'
                          : isSelected
                            ? 'bg-primary-600 text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {d.day}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                Selected
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                Unavailable
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">
              Available Times — {MONTHS[currentMonth]} {selectedDate}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {timeSlots.map((time) => {
                const isSelected = time === selectedTime;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Session Details</h2>
            <div className="space-y-4">
              <Select label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </Select>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Session Type</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSessionType('video')}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      sessionType === 'video'
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${sessionType === 'video' ? 'bg-primary-100' : 'bg-neutral-100'}`}>
                      <Video className={`h-4 w-4 ${sessionType === 'video' ? 'text-primary-600' : 'text-neutral-500'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Video Call</p>
                      <p className="text-xs text-neutral-500">Meet online via video</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        sessionType === 'video' ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'
                      }`}>
                        {sessionType === 'video' && <Check className="h-3 w-3 text-white" />}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSessionType('in-person')}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      sessionType === 'in-person'
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${sessionType === 'in-person' ? 'bg-primary-100' : 'bg-neutral-100'}`}>
                      <MapPin className={`h-4 w-4 ${sessionType === 'in-person' ? 'text-primary-600' : 'text-neutral-500'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">In Person</p>
                      <p className="text-xs text-neutral-500">Meet on campus</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        sessionType === 'in-person' ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'
                      }`}>
                        {sessionType === 'in-person' && <Check className="h-3 w-3 text-white" />}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-neutral-400" />
                      <span className="text-neutral-700">
                        {MONTHS[currentMonth]} {selectedDate}, {currentYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-neutral-400" />
                      <span className="text-neutral-700">{selectedTime} · {duration} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {sessionType === 'video' ? (
                        <Video className="h-4 w-4 text-neutral-400" />
                      ) : (
                        <MapPin className="h-4 w-4 text-neutral-400" />
                      )}
                      <span className="text-neutral-700">{sessionType === 'video' ? 'Video Call' : 'In Person'}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                icon={Calendar}
                onClick={handleConfirm}
              >
                {confirmed ? 'Session Confirmed' : 'Confirm Booking'}
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Your Upcoming Sessions</h2>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3">
                  <Avatar initials={session.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{session.skill}</p>
                    <p className="text-xs text-neutral-500">with {session.partner}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                      <Calendar className="h-3 w-3" />
                      <span>{session.date}</span>
                      <Clock className="h-3 w-3 ml-1" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
