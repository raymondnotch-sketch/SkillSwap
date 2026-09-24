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
          <div>
            {/* badge pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-xs">
              <Heart className="h-4 w-4 text-primary-600" aria-hidden="true" />
              About Us
            </span>

            {/* display headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Empowering Students Through <span className="text-primary-600">Peer Learning</span>
            </h1>

            {/* desc */}
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              SkillSwap was born from a simple idea: the best way to learn is to teach. We bring
              verified students together to exchange knowledge, build skills, and grow as a community.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Card className="flex h-full flex-col p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 font-bold">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">
                Our Vision
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                A world where peer-to-peer learning is as natural as attending a lecture. We
                envision a global community of students who lift each other up through shared
                knowledge and collaboration.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="border-t border-neutral-100 bg-neutral-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* left = text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-md bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Our Story
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Built by Students, for Students
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>

                </p>
                <p>
                  We realized that the best learning we've done wasn't in a classroom... it was in conversations with 
                  classmates who took the time to break things down, who answered questions without judgment, who 
                  understood exactly where we were stuck. That's when we decided: what if we could make that easier? 
                  What if every student could find someone willing to teach what they know, and help with what they're 
                  learning?
                </p>
                <p>

                </p>
              </div>
            </div>

            {/* right = clean white card */}
            <div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-xs sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Heart className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-900">Why We Do This</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    Education should be collaborative, not competitive. By creating a space where
                    students can teach and learn from each other, we break down barriers and build
                    confidence. Every skill shared is a step toward a more connected and capable
                    generation.
                  </p>
                </div>
              </div>
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
