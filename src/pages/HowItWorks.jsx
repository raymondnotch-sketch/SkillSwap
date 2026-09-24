import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Share2,
  Users,
  Calendar,
  BookOpen,
  Star,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/ui/Button';

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: 'Create Your Profile',
    shortTitle: '1. Create Profile',
    desc: 'Sign up with your university (.edu) email. Add the skills you are proficient in and the topics you want to learn.',
    actionPreview: {
      type: 'profile',
      headline: 'Quick Profile Setup Demo',
      details: [
        'Verified .edu email confirmation',
        'Skills I can teach: Python, UI Design',
        'Skills I want: React, Data Science',
      ],
    },
  },
  {
    id: 2,
    icon: Share2,
    title: 'Showcase Your Skills',
    shortTitle: '2. List Skills',
    desc: 'Describe what you can teach with rich detail — your experience level, topics covered, and preferred teaching style.',
    actionPreview: {
      type: 'showcase',
      headline: 'Skill Description Example',
      details: [
        'Topic: Python Data Analysis Basics',
        'Format: 30-min live code walkthrough',
        'Prerequisites: None, beginner friendly',
      ],
    },
  },
  {
    id: 3,
    icon: Users,
    title: 'Find Your Match',
    shortTitle: '3. Find Peer Match',
    desc: 'Browse skill categories or let our matching engine pair you with verified campus peers whose learning goals complement yours.',
    actionPreview: {
      type: 'match',
      headline: 'Reciprocal Peer Match',
      details: [
        'Peer: Sarah K. (Computer Science Senior)',
        'Teaches: UI/UX & Figma',
        'Wants to Learn: Python Data Science',
      ],
    },
  },
  {
    id: 4,
    icon: Calendar,
    title: 'Book a Session',
    shortTitle: '4. Book Session',
    desc: 'Pick a convenient time for both of you. Choose online video chat or an in-person campus library meet-up.',
    actionPreview: {
      type: 'book',
      headline: 'Structured 1-on-1 Session',
      details: [
        'Duration: 60 mins (30m teach / 30m learn)',
        'Location: Online Video Chat or Campus Library',
        'Status: Confirmed & Reminders set',
      ],
    },
  },
  {
    id: 5,
    icon: BookOpen,
    title: 'Exchange Knowledge',
    shortTitle: '5. Swap Knowledge',
    desc: 'Meet online or in-person. Spend half the session learning their skill, and half teaching yours.',
    actionPreview: {
      type: 'exchange',
      headline: 'Live Exchange Agenda',
      details: [
        '00:00 - 00:30: Learning UI/UX from Sarah',
        '00:30 - 01:00: Teaching Python to Sarah',
        'Shared notes & resource link exchange',
      ],
    },
  },
  {
    id: 6,
    icon: Star,
    title: 'Leave a Review',
    shortTitle: '6. Review Peer',
    desc: 'Share honest feedback after each session. Help campus peers build trust and recognize top contributors.',
    actionPreview: {
      type: 'review',
      headline: 'Peer Feedback Standard',
      details: [
        'Rating: 5/5 stars',
        'Feedback: "Super clear explanation of pandas DataFrames!"',
        'Badge Earned: Great Mentor',
      ],
    },
  },
  {
    id: 7,
    icon: Award,
    title: 'Build Your Reputation',
    shortTitle: '7. Build Credentials',
    desc: 'Every session earns you credibility points and academic network connections for your resume and portfolio.',
    actionPreview: {
      type: 'reputation',
      headline: 'Profile Milestones',
      details: [
        'Total Hours Swapped: 24 hrs',
        'Rank: Top 10% Campus Peer Tutor',
        'Endorsements: Python, UI Design',
      ],
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden bg-white text-neutral-800"
    >
      {/* ── Hero ── */}
      <section className="border-b border-neutral-200 bg-neutral-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-xs">
            <BookOpen className="h-4 w-4 text-primary-600" aria-hidden="true" />
            Step-by-Step Overview
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            How SkillSwap Works <span className="text-primary-600">Step-by-Step</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            From creating your verified student account to completing your first 1-on-1 peer exchange — here is the complete journey.
          </p>
        </div>
      </section>

      {/* ── Interactive Step Previewer ── */}
      <section className="py-12 border-b border-neutral-200 bg-neutral-50/40">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded">
              Interactive Explorer
            </span>
            <h2 className="mt-2 text-xl font-bold text-neutral-900">
              Click any step below to see how it works in real-time
            </h2>
          </div>

          {/* Horizontal Step Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-thin">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'border-primary-600 bg-primary-600 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{step.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Interactive Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary-700 uppercase tracking-wider">
                  <span>Step {currentStep.id} of {steps.length}</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-neutral-900 flex items-center gap-2">
                  <currentStep.icon className="h-6 w-6 text-primary-600" />
                  {currentStep.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {currentStep.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-semibold text-neutral-600 disabled:opacity-40 hover:text-neutral-900"
                >
                  ← Previous Step
                </button>

                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i ? 'w-6 bg-primary-600' : 'w-2 bg-neutral-200'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="text-xs font-semibold text-primary-600 disabled:opacity-40 hover:text-primary-700 flex items-center gap-1"
                >
                  Next Step <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right side live action preview box */}
            <div className="md:col-span-5 rounded-lg border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-3">
                <span className="text-xs font-bold text-neutral-900">{currentStep.actionPreview.headline}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Live Preview
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                {currentStep.actionPreview.details.map((dt, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600 mt-0.5" />
                    <span>{dt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-12">
            Detailed Step Overview
          </h2>
          <div className="relative">
            {/* left vertical line */}
            <div className="absolute left-10 top-0 hidden h-full w-0.5 bg-neutral-200 sm:block" />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative flex flex-col gap-5 sm:flex-row sm:gap-7"
                >
                  {/* numbered icon */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white shadow-xs font-bold">
                      <step.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                  </div>

                  {/* content card */}
                  <div className="flex-1 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">{step.title}</h3>
                      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                        Step {i + 1} of {steps.length}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 border-t border-neutral-100">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-xl border border-neutral-200 bg-neutral-900 px-8 py-12 text-center text-white sm:px-12 sm:py-14">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to Swap Skills?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
              Join verified students across campus exchanging skills and growing together.
            </p>
            <div className="mt-6">
              <Link to="/signup">
                <Button size="lg" icon={ArrowRight} className="font-semibold px-6 py-3">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
