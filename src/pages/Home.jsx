import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Users,
  BookOpen,
  Search,
  MessageSquare,
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
  Quote,
  Play,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  {
    icon: Search,
    title: 'Discover Skills',
    desc: 'Browse a wide range of skills shared by verified students in your community.',
  },
  {
    icon: Users,
    title: 'Match with a Peer',
    desc: 'Connect with someone who wants to learn what you know — and teach what you want to learn.',
  },
  {
    icon: BookOpen,
    title: 'Learn Together',
    desc: 'Exchange knowledge through structured sessions, collaborative projects, and real-time feedback.',
  },
  {
    icon: Star,
    title: 'Grow Your Network',
    desc: 'Build lasting connections, earn reputation, and expand your skill set with every interaction.',
  },
];

const categories = [
  { name: 'Programming', icon: Code },
  { name: 'Graphic Design', icon: Palette },
  { name: 'C++', icon: Layers },
  { name: 'Python', icon: Layers },
  { name: 'Git & GitHub', icon: GitBranch },
  { name: 'Web Development', icon: Globe },
  { name: 'Discrete Maths', icon: Sigma },
  { name: 'Mathematics', icon: Cpu },
];

const safetyPoints = [
  {
    icon: UserCheck,
    title: 'Verified Students',
    desc: 'Every member is verified to ensure a trusted learning environment.',
  },
  {
    icon: MessageSquare,
    title: 'Private Messaging',
    desc: 'Communicate securely with built-in messaging — no need to share personal details.',
  },
  {
    icon: Mail,
    title: 'Optional Contact Sharing',
    desc: 'You control when and how to share your contact information.',
  },
  {
    icon: Shield,
    title: 'Safe Online-First Experience',
    desc: 'All interactions happen within our platform until you are ready to take the next step.',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Computer Science Student',
    quote:
      'SkillSwap helped me master Python while teaching someone else Git. The peer learning model is incredibly effective.',
  },
  {
    name: 'James Rodriguez',
    role: 'Design Student',
    quote:
      'I joined to learn frontend development and ended up finding a study partner who became a close friend. The community is amazing.',
  },
  {
    name: 'Priya Patel',
    role: 'Mathematics Major',
    quote:
      'The verification system made me feel safe from day one. Knowing everyone is a real student takes the anxiety out of connecting.',
  },
  {
    name: 'Alex Kim',
    role: 'Engineering Student',
    quote:
      'Teaching web development to others solidified my own knowledge. SkillSwap is a win-win for everyone involved.',
  },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

const heroSkillCards = [
  { icon: Code, label: 'Python', sub: 'Programming', gradient: 'from-blue-500 to-indigo-600' },
  { icon: Palette, label: 'UI Design', sub: 'Creative', gradient: 'from-pink-500 to-rose-600' },
  { icon: Globe, label: 'Web Dev', sub: 'Frontend', gradient: 'from-emerald-500 to-teal-600' },
  { icon: GitBranch, label: 'Git & GitHub', sub: 'DevOps', gradient: 'from-orange-500 to-amber-600' },
  { icon: Sigma, label: 'Discrete Maths', sub: 'Mathematics', gradient: 'from-violet-500 to-purple-600' },
  { icon: Cpu, label: 'Algorithms', sub: 'CS Theory', gradient: 'from-cyan-500 to-sky-600' },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden"
    >

      {/* ── Hero ── */}
      <section className="gradient-mesh relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24 sm:pb-24 lg:pb-28">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-accent-300/20 to-primary-300/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:gap-14">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            {/* Live status badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-success-200/70 bg-success-50/80 px-4 py-2 text-xs font-semibold text-success-700 shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
              </span>
              1,000+ students learning now
            </motion.div>

            <h1 className="mt-7 text-[2.5rem] font-black leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.5rem]">
              Learn What You Love,{' '}
              <span className="text-gradient">Teach What You Know</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              SkillSwap connects verified students for peer-to-peer learning. Discover skills,
              find matches, and grow together — all in a safe, trusted environment.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className={`rounded-xl ${focusRing}`}>
                <Button
                  size="lg"
                  icon={ArrowRight}
                  className="shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works" className={`rounded-xl ${focusRing}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-neutral-500"
            >
              {[
                'No credit card required',
                '10,000+ verified students',
                'Fully free to use',
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-success-500" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: stacked skill cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 hidden lg:mt-0 lg:block lg:flex-1"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="grid grid-cols-2 gap-4">
                {heroSkillCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    className="group relative flex items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-card transition-all duration-300 hover:shadow-card-hover"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-md`}
                    >
                      <card.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{card.label}</p>
                      <p className="text-xs text-neutral-400">{card.sub}</p>
                    </div>
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary-100/0 to-primary-100/40 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
              {/* glow */}
              <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-primary-300/30 via-accent-300/15 to-transparent blur-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-neutral-900 py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {[
              { value: '10,000+', label: 'Verified Students' },
              { value: '500+',    label: 'Skills Available' },
              { value: '98%',     label: 'Satisfaction Rate' },
              { value: '150+',    label: 'Universities' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <p className="text-3xl font-black text-gradient sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-medium text-neutral-400 sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center rounded-full border border-primary-200/60 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700">
              How it works
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Four steps to start learning
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
              From discovery to real skill exchange — it takes just minutes to begin.
            </p>
          </motion.div>

          <div className="relative mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {/* connecting dashed line on desktop */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-5 top-9 hidden h-px w-10 border-t-2 border-dashed border-primary-200 lg:block" />
                )}
                {/* large gradient circle number */}
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 4 }}
                  className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg shadow-primary-500/30"
                >
                 <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary-600 shadow-md select-none">
                   {i + 1}
                </span>
                 <step.icon className="h-9 w-9 text-white" aria-hidden="true" />
                  <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 opacity-50 blur-lg" />
                </motion.div>
                <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary-600">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Categories ── */}
      <section className="bg-neutral-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Featured Skill Categories
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
              Explore skills across a wide range of categories — from programming to design and
              everything in between.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={item}
                whileHover={{ scale: 1.04 }}
                className="transition-transform duration-200"
              >
                <Link
                  to={`/learning?category=${encodeURIComponent(cat.name)}`}
                  className={`block rounded-2xl ${focusRing}`}
                >
                  <Card
                    variant="interactive"
                    hover
                    className="flex items-center gap-4 p-5 transition-all hover:border-primary-200 hover:shadow-card-hover"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-accent-100">
                      <cat.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">{cat.name}</span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Safety First ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: text + checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700">
                Safety First
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                A Safe Space for Learning
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                We prioritize your safety with robust verification, private communication, and full
                control over your personal information.
              </p>
              <div className="mt-8 space-y-6">
                {safetyPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-accent-50 shadow-sm">
                      <point.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{point.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: white card with shield */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 lg:mt-0"
            >
              <div className="relative rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-card-hover sm:p-10">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20 blur-2xl" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 shadow-lg shadow-primary-500/30">
                    <Shield className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-neutral-900">Verified by Design</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    Our multi-step verification process ensures that every member is who they say
                    they are. From institutional email verification to profile reviews, we maintain
                    a community you can trust.
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {[
                      'Institutional email verification',
                      'Profile review and approval',
                      'Activity monitoring for safety',
                      'Reporting and moderation tools',
                    ].map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm text-neutral-600">
                        <CheckCircle className="h-4 w-4 shrink-0 text-success-500" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-neutral-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              What Our Community Says
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
              Hear from students who have transformed their learning experience through SkillSwap.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={item} className="flex">
                <Card
                  variant="default"
                  className="flex w-full flex-col p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  {/* quote icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100">
                    <Quote className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">{t.quote}</p>
                  <div className="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-4">
                    {/* avatar placeholder circle */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-accent-500 text-xs font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-primary relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-12 sm:py-16"
          >
            {/* subtle dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* extra glow blobs */}
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-primary-100 sm:text-base">
                Join thousands of verified students already exchanging skills and growing together.
                It is free to get started.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700"
                >
                  <Button
                    size="lg"
                    icon={ArrowRight}
                    className="bg-white text-primary-700 shadow-xl hover:bg-primary-50 hover:text-primary-800 hover:shadow-2xl"
                  >
                    Join SkillSwap
                  </Button>
                </Link>
                <Link
                  to="/how-it-works"
                  className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
