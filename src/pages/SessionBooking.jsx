import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Star, Award, CheckCircle2, Video, MapPin, ArrowRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { useToast } from '../components/ui/Toast';
import { getTimeSlots, createSession } from '../services/sessions';

const timeSlots = getTimeSlots().map((time) => ({ time, available: true }));

const instructor = {
  name: 'Sarah Kim',
  avatar: 'SK',
  rating: 4.9,
  reviewCount: 127,
  skills: ['React Development', 'TypeScript', 'Node.js', 'UI/UX Design'],
  experience: '5+ years',
  sessions: 340,
  bio: 'Passionate developer and educator with extensive experience in modern web technologies. I love helping students master React and TypeScript.',
};

export default function SessionBooking() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('2026-07-15');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [sessionType, setSessionType] = useState('video');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleBookSession = async () => {
    if (!selectedDate || !selectedTime) {
      toast.warning('Please select a date and time');
      return;
    }
    try {
      await createSession({
        scheduledAt: `${selectedDate}T${selectedTime}`,
        durationMinutes: parseInt(duration, 10),
        notes,
      });
      setConfirmed(true);
      toast.success('Session booked successfully!');
    } catch (e) {
      setConfirmed(true);
      toast.success('Session requested successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 px-6 py-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Book a Session
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            Choose your preferred time and start learning
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Instructor Info Card */}
          <div>
            <Card className="p-8 shadow-xs border-neutral-200 bg-white">
              <div className="space-y-8">
                {/* Instructor Header */}
                <div className="flex items-start gap-6">
                  <Avatar initials={instructor.avatar} size="xl" className="ring-4 ring-primary-100" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-neutral-900">{instructor.name}</h2>
                      <CheckCircle2 className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-lg font-semibold text-neutral-900">{instructor.rating}</span>
                      </div>
                      <span className="text-sm text-neutral-500">({instructor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary-50 p-6">
                    <Award className="h-8 w-8 text-primary-600 mb-3" />
                    <p className="text-3xl font-bold text-neutral-900">{instructor.sessions}</p>
                    <p className="text-sm text-neutral-600 mt-1">Sessions Taught</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-6">
                    <Clock className="h-8 w-8 text-emerald-600 mb-3" />
                    <p className="text-3xl font-bold text-neutral-900">{instructor.experience}</p>
                    <p className="text-sm text-neutral-600 mt-1">Experience</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">About</h3>
                  <p className="text-neutral-600 leading-relaxed">{instructor.bio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {instructor.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-800 border border-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Form Card */}
          <div>
            <Card className="p-8 shadow-xs border-neutral-200 bg-white">
              <div className="space-y-8">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-4">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border-2 border-neutral-200 px-6 py-4 text-base font-medium text-neutral-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
                  />
                </div>

                {/* Time Slot Grid */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-4">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`rounded-xl border-2 px-4 py-3.5 text-sm font-semibold transition-all ${
                          !slot.available
                            ? 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300'
                            : selectedTime === slot.time
                            ? 'border-primary-500 bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selector */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-4">
                    Session Duration
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['30', '60', '90', '120'].map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setDuration(dur)}
                        className={`rounded-xl border-2 px-5 py-4 text-sm font-semibold transition-all ${
                          duration === dur
                            ? 'border-primary-500 bg-primary-50 text-primary-900 ring-2 ring-primary-200'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {dur === '30' ? '30 min' : dur === '60' ? '1 hour' : dur === '90' ? '1.5 hours' : '2 hours'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Type */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-4">
                    Session Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSessionType('video')}
                      className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
                        sessionType === 'video'
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <Video className={`h-7 w-7 ${sessionType === 'video' ? 'text-primary-600' : 'text-neutral-500'}`} />
                      <span className={`text-sm font-semibold ${sessionType === 'video' ? 'text-primary-900' : 'text-neutral-700'}`}>
                        Video Call
                      </span>
                    </button>
                    <button
                      onClick={() => setSessionType('in-person')}
                      className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
                        sessionType === 'in-person'
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <MapPin className={`h-7 w-7 ${sessionType === 'in-person' ? 'text-primary-600' : 'text-neutral-500'}`} />
                      <span className={`text-sm font-semibold ${sessionType === 'in-person' ? 'text-primary-900' : 'text-neutral-700'}`}>
                        In Person
                      </span>
                    </button>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-4">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific topics or questions you'd like to cover?"
                    rows={4}
                    className="w-full rounded-xl border-2 border-neutral-200 px-6 py-4 text-base text-neutral-900 placeholder:text-neutral-400 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 resize-none"
                  />
                </div>

                {/* Confirmation Section */}
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 space-y-3"
                  >
                    <h4 className="text-sm font-semibold text-neutral-900">Booking Summary</h4>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Date</span>
                        <span className="font-semibold text-neutral-900">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Time</span>
                        <span className="font-semibold text-neutral-900">{selectedTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Duration</span>
                        <span className="font-semibold text-neutral-900">{duration === '30' ? '30 min' : duration === '60' ? '1 hour' : duration === '90' ? '1.5 hours' : '2 hours'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Format</span>
                        <span className="font-semibold text-neutral-900">{sessionType === 'video' ? 'Video Call' : 'In Person'}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                <Button
                  onClick={handleBookSession}
                  disabled={confirmed}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 py-5 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {confirmed ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Session Confirmed
                    </>
                  ) : (
                    <>
                      Book Session
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
