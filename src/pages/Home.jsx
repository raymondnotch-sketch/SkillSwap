import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Users,
  BookOpen,
  Search,
  Star,
  CheckCircle,
  Code,
  Palette,
  GitBranch,
  Globe,
  Sigma,
  Layers,
  UserCheck,
  Mail,
  Cpu,
  GraduationCap,
  Sparkles,
  ArrowRightLeft,
  XCircle,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const steps = [
  {
    stepNum: '01',
    icon: Search,
    title: 'List What You Know & Want to Learn',
    desc: 'Create your profile in 2 minutes. Add the skills you can share and the subjects you want to master.',
  },
  {
    stepNum: '02',
    icon: ArrowRightLeft,
    title: 'Get Matched with Campus Peers',
    desc: 'Our engine pairs you with verified students whose learning goals perfectly complement yours.',
  },
  {
    stepNum: '03',
    icon: BookOpen,
    title: 'Swap Knowledge 1-on-1',
    desc: 'Meet online or on campus. Spend 30 minutes learning their skill, and 30 minutes teaching yours.',
  },
  {
    stepNum: '04',
    icon: Star,
    title: 'Build Credentials & Reputation',
    desc: 'Earn peer ratings, level up your profile, and build lasting academic network connections.',
  },
];

const categories = [
  { name: 'Programming & Web', icon: Code, count: '180+ Active Peers' },
  { name: 'UI/UX & Design', icon: Palette, count: '120+ Active Peers' },
  { name: 'Data & Algorithms', icon: Layers, count: '95+ Active Peers' },
  { name: 'Python & Data Science', icon: Cpu, count: '210+ Active Peers' },
  { name: 'Git & DevOps', icon: GitBranch, count: '75+ Active Peers' },
  { name: 'Frontend Engineering', icon: Globe, count: '160+ Active Peers' },
  { name: 'Mathematics & Logic', icon: Sigma, count: '110+ Active Peers' },
  { name: 'Computer Science Core', icon: Cpu, count: '195+ Active Peers' },
];

const availableSkills = [
  'Python & Data Science',
  'UI/UX & Figma',
  'React Engineering',
  'Discrete Mathematics',
  'Git & DevOps',
];

const mockMatchesDatabase = {
  'Python & Data Science': {
    'UI/UX & Figma': [
      { name: 'Sarah K.', major: 'Design Senior', teaches: 'UI/UX & Figma', wants: 'Python & Data Science', score: '99% Match' },
      { name: 'Liam T.', major: 'Interactive Media', teaches: 'UI/UX & Figma', wants: 'Python & Data Science', score: '95% Match' },
    ],
    'React Engineering': [
      { name: 'David P.', major: 'Software Eng. Junior', teaches: 'React Engineering', wants: 'Python & Data Science', score: '98% Match' },
    ],
    'Discrete Mathematics': [
      { name: 'Elena R.', major: 'Math Major', teaches: 'Discrete Mathematics', wants: 'Python & Data Science', score: '96% Match' },
    ],
    'Git & DevOps': [
      { name: 'Marcus V.', major: 'SysAdmin Minor', teaches: 'Git & DevOps', wants: 'Python & Data Science', score: '94% Match' },
    ],
  },
  'UI/UX & Figma': {
    'Python & Data Science': [
      { name: 'Alex M.', major: 'Computer Science', teaches: 'Python & Data Science', wants: 'UI/UX & Figma', score: '99% Match' },
    ],
    'React Engineering': [
      { name: 'Chloe B.', major: 'Frontend Web', teaches: 'React Engineering', wants: 'UI/UX & Figma', score: '97% Match' },
    ],
    'Discrete Mathematics': [
      { name: 'Jason L.', major: 'Applied Math', teaches: 'Discrete Mathematics', wants: 'UI/UX & Figma', score: '92% Match' },
    ],
    'Git & DevOps': [
      { name: 'Nadia S.', major: 'Cloud Dev', teaches: 'Git & DevOps', wants: 'UI/UX & Figma', score: '91% Match' },
    ],
  },
  'React Engineering': {
    'Python & Data Science': [
      { name: 'Carlos D.', major: 'Data Analytics', teaches: 'Python & Data Science', wants: 'React Engineering', score: '98% Match' },
    ],
    'UI/UX & Figma': [
      { name: 'Maya P.', major: 'UX Research', teaches: 'UI/UX & Figma', wants: 'React Engineering', score: '97% Match' },
    ],
    'Discrete Mathematics': [
      { name: 'Elena R.', major: 'Math Major', teaches: 'Discrete Mathematics', wants: 'React Engineering', score: '95% Match' },
    ],
    'Git & DevOps': [
      { name: 'Zack W.', major: 'DevOps & CI/CD', teaches: 'Git & DevOps', wants: 'React Engineering', score: '96% Match' },
    ],
  },
};

const safetyPoints = [
  {
    icon: UserCheck,
    title: 'Verified Student ID & Email',
    desc: 'Every account is verified through official university credentials to maintain a trusted campus network.',
  },
  {
    icon: Shield,
    title: 'Private In-App Messaging',
    desc: 'Chat, plan sessions, and share study materials without revealing your phone number or personal details.',
  },
  {
    icon: Mail,
    title: 'Full Privacy Control',
    desc: 'You decide exactly when and with whom to share your contact information.',
  },
];

const comparisons = [
  {
    aspect: 'Cost',
    traditional: '$40 - $80 / hour for tutors',
    skillswap: '$0 Free (Equal Skill Exchange)',
  },
  {
    aspect: 'Learning Dynamics',
    traditional: 'Passive one-way lectures',
    skillswap: 'Active peer collaboration & reciprocal teaching',
  },
  {
    aspect: 'Networking',
    traditional: 'Isolated studying',
    skillswap: 'Build real academic & career connections',
  },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

export default function Home() {
  const [teachSkill, setTeachSkill] = useState('Python & Data Science');
  const [learnSkill, setLearnSkill] = useState('UI/UX & Figma');

  const currentMatches =
    mockMatchesDatabase[teachSkill]?.[learnSkill] || [
      {
        name: 'Jordan W.',
        major: 'Computer Science',
        teaches: learnSkill,
        wants: teachSkill,
        score: '96% Match',
      },
    ];

  return (
    <div className="overflow-x-hidden bg-white text-neutral-800">
      {/* ── Hero ── */}
      <section className="border-b border-neutral-200 bg-neutral-50/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:gap-14">
          {/* Left copy */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800 shadow-xs">
              <GraduationCap className="h-4 w-4 text-primary-600" aria-hidden="true" />
              Verified Student Skill Exchange
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              Swap Skills with Campus Peers.{' '}
              <span className="text-primary-600">Zero Tuition. Real Growth.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-700">
              Why pay for expensive tutors or online courses? Connect with verified university students who want to learn what you know — and teach what you need.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link to="/signup" className={`rounded-lg ${focusRing}`}>
                <Button size="lg" icon={ArrowRight} className="font-semibold px-6 py-3">
                  Find Your Skill Match
                </Button>
              </Link>
              <Link to="/how-it-works" className={`rounded-lg ${focusRing}`}>
                <Button variant="outline" size="lg" className="font-semibold px-6 py-3 border-neutral-300 text-neutral-800 hover:bg-neutral-100">
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-700">
              {[
                'Verified .edu Accounts',
                '100% Free Peer Exchange',
                'Safe In-App Messaging',
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 shrink-0 text-primary-600" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Interactive Match Simulator Widget */}
          <div className="mt-12 lg:mt-0 lg:flex-1">
            <Card className="p-6 border-neutral-200 bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Live Peer Match Simulator
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <Zap className="h-3 w-3 text-emerald-600 fill-emerald-600" />
                  Instant Calculation
                </span>
              </div>

              {/* Selector controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    I Can Teach:
                  </label>
                  <select
                    value={teachSkill}
                    onChange={(e) => setTeachSkill(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  >
                    {availableSkills.map((sk) => (
                      <option key={sk} value={sk} disabled={sk === learnSkill}>
                        {sk}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    I Want to Learn:
                  </label>
                  <select
                    value={learnSkill}
                    onChange={(e) => setLearnSkill(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  >
                    {availableSkills.map((sk) => (
                      <option key={sk} value={sk} disabled={sk === teachSkill}>
                        {sk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Match Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Matches in Campus Network</span>
                  <span className="font-bold text-primary-700">{currentMatches.length} Peer(s) Ready</span>
                </div>

                {currentMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 transition-all hover:bg-neutral-50 hover:border-neutral-300"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2 mb-2.5">
                      <span className="text-xs font-bold text-neutral-900">{m.name} ({m.major})</span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        {m.score}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded bg-white p-2 border border-neutral-200/70">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Teaches</span>
                        <span className="font-semibold text-emerald-700">{m.teaches}</span>
                      </div>
                      <div className="rounded bg-white p-2 border border-neutral-200/70">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Wants to Learn</span>
                        <span className="font-semibold text-primary-700">{m.wants}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">Equal 1:1 Skill Swap</span>
                <Link to="/signup">
                  <Button size="sm" icon={ArrowRight} className="font-semibold text-xs px-3.5 py-2">
                    Start Swap Free
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Value Bar ── */}
      <section className="border-b border-neutral-200 bg-neutral-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              { val: '100% Free', label: 'Peer Knowledge Swap' },
              { val: 'Verified', label: 'University Students' },
              { val: '1-on-1', label: 'Structured Sessions' },
              { val: 'Safe', label: 'In-App Collaboration' },
            ].map((item) => (
              <div key={item.label} className="p-2">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{item.val}</p>
                <p className="mt-1 text-xs font-medium text-neutral-400 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SkillSwap vs Traditional ── */}
      <section className="py-16 sm:py-24 border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
              Smarter Learning
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Why Peer Skill Swapping Beats Traditional Tutoring
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-neutral-600">
              When you teach someone else, you solidify your own understanding. SkillSwap turns learning into a reciprocal partnership.
            </p>
          </div>


            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Steps ── */}
      <section className="py-16 sm:py-24 bg-neutral-50/50 border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
              Step-by-Step
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              How SkillSwap Works in 4 Simple Steps
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Start exchanging skills in minutes with zero financial cost.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.title} className="p-6 border-neutral-200 bg-white shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 font-bold">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-neutral-400 tracking-wider">STEP {step.stepNum}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Categories ── */}
      <section className="py-16 sm:py-24 border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                Explore Categories
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
                In-Demand Skills Available on Campus
              </h2>
            </div>
            <Link to="/learning" className="mt-4 md:mt-0 text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All Skill Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/learning?category=${encodeURIComponent(cat.name)}`}
                className={`block rounded-xl ${focusRing}`}
              >
                <Card
                  variant="interactive"
                  className="flex items-center gap-4 p-4 border-neutral-200 bg-white hover:border-primary-300"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <cat.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{cat.name}</p>
                    <p className="text-xs text-neutral-500 font-medium">{cat.count}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Safety ── */}
      <section className="py-16 sm:py-24 bg-neutral-50/50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                Safety & Verification
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
                Designed for Campus Safety
              </h2>
              <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                SkillSwap ensures every interaction remains professional, verified, and safe for all participants.
              </p>
              <div className="mt-8 space-y-5">
                {safetyPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-neutral-200 text-primary-600 shadow-xs">
                      <point.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900">{point.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Shield className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-900">Official Verification Requirements</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Before matching or messaging other students, all members complete our 2-step verification process:
                </p>
                <ul className="mt-6 space-y-3.5">
                  {[
                    'Active .edu email confirmation',
                    'Student ID upload & verification',
                    'Peer review & rating system',
                    'Zero tolerance community moderation',
                  ].map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm font-medium text-neutral-800">
                      <CheckCircle className="h-4.5 w-4.5 shrink-0 text-primary-600" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-xl border border-neutral-200 bg-neutral-900 px-8 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Swap Skills with Campus Peers?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-neutral-300">
              Join verified students today. List the skills you know and start learning what you love — 100% free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Link to="/signup" className={`rounded-lg ${focusRing}`}>
                <Button size="lg" icon={ArrowRight} className="font-semibold px-6 py-3">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/how-it-works" className={`rounded-lg ${focusRing}`}>
                <Button variant="outline" size="lg" className="font-semibold px-6 py-3 border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
