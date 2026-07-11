import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Users, BookOpen, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';

const values = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    desc: 'We prioritize creating a secure environment where students can learn without concern.',
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Learning is social. We build tools that foster genuine connections between peers.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Exchange',
    desc: 'Everyone has something to teach and something to learn. We make that exchange seamless.',
  },
  {
    icon: Sparkles,
    title: 'Continuous Growth',
    desc: 'We believe in lifelong learning and empower students to grow at every stage.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-hidden"
    >
      
      {/* ── Hero ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* badge pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-700">
              <Heart className="h-4 w-4" aria-hidden="true" />
              About Us
            </span>

            {/* display headline */}
            <h1 className="mt-7 text-[2.5rem] font-black tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.5rem]">
              Empowering Students Through{' '}
              <span className="text-gradient">Peer Learning</span>
            </h1>

            {/* desc */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              SkillSwap was born from a simple idea: the best way to learn is to teach. We bring
              verified students together to exchange knowledge, build skills, and grow as a community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="info" hover className="flex h-full flex-col p-8 shadow-card hover:shadow-card-hover sm:p-10">
                {/* gradient icon container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                  <Target className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">
                  Our Mission
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  To create a trusted platform where every student can freely share their knowledge,
                  learn new skills, and build meaningful connections, regardless of their background
                  or experience level.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card variant="info" hover className="flex h-full flex-col p-8 shadow-card hover:shadow-card-hover sm:p-10">
                {/* gradient icon container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30">
                  <Eye className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">
                  Our Vision
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  A world where peer-to-peer learning is as natural as attending a lecture. We
                  envision a global community of students who lift each other up through shared
                  knowledge and collaboration.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* left = text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Our Story
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                From a Dorm Room to a Movement
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>
                  We've all been there: staring at a concept that just won't click, sitting through a lecture 
                  that moves too fast, or struggling alone when you needed someone to just slow down and explain 
                  it their way. That's where peer learning is different. When a fellow student teaches you, someone 
                  who remembers what it felt like not to understand, patience replaces pressure. Time becomes something 
                  shared, not wasted. And understanding actually sticks.
                </p>
                <p>
                  We realized that the best learning we've done wasn't in a classroom... it was in conversations with 
                  classmates who took the time to break things down, who answered questions without judgment, who 
                  understood exactly where we were stuck. That's when we decided: what if we could make that easier? 
                  What if every student could find someone willing to teach what they know, and help with what they're 
                  learning?
                </p>
                <p>
                  SkillSwap exists to do exactly that. We're building a space where you can find the help you need, 
                  when you need it... from someone who's been through it. Because learning together works better.
                </p>
              </div>
            </motion.div>

            {/* right = elevated white card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-xl sm:p-10">
                {/* decorative blob */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20 blur-2xl" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-danger-500 to-danger-600 shadow-lg shadow-danger-500/30">
                    <Heart className="h-7 w-7 fill-white text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-neutral-900">Why We Do This</h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    Education should be collaborative, not competitive. By creating a space where
                    students can teach and learn from each other, we break down barriers and build
                    confidence. Every skill shared is a step toward a more connected and capable
                    generation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
              These principles guide every decision we make and every feature we build.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={item} className="flex">
                <Card hover className="flex w-full flex-col p-7 text-center shadow-card hover:shadow-card-hover">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
                    <value.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-neutral-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{value.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
