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

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            About Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Empowering Students Through Peer Learning
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
            SkillSwap was born from a simple idea: the best way to learn is to teach. We bring
            verified students together to exchange knowledge, build skills, and grow as a community.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="info" className="h-full">
                <Target className="h-8 w-8 text-primary-600" />
                <h2 className="mt-4 text-xl font-bold text-neutral-900">Our Mission</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  To create a trusted platform where every student can freely share their knowledge,
                  learn new skills, and build meaningful connections — regardless of their background
                  or experience level.
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card variant="info" className="h-full">
                <Eye className="h-8 w-8 text-primary-600" />
                <h2 className="mt-4 text-xl font-bold text-neutral-900">Our Vision</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  A world where peer-to-peer learning is as natural as attending a lecture. We
                  envision a global community of students who lift each other up through shared
                  knowledge and collaboration.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                Our Story
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                From a Dorm Room to a Movement
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-500">
                <p>
                  SkillSwap started in 2024 when a group of university students realized that the
                  most effective study sessions happened outside the classroom — between peers
                  teaching each other.
                </p>
                <p>
                  We noticed that students who explained concepts to others retained information far
                  better, and those who struggled found more patience and clarity from fellow
                  students than from traditional resources.
                </p>
                <p>
                  What began as a small pilot program in a single dormitory has grown into a
                  platform serving thousands of students across hundreds of universities. Our mission
                  remains the same: make peer learning accessible, safe, and rewarding for everyone.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 lg:mt-0"
            >
              <div className="rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-soft-lg">
                <Heart className="h-10 w-10 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Why We Do This</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Education should be collaborative, not competitive. By creating a space where
                  students can teach and learn from each other, we break down barriers and build
                  confidence. Every skill shared is a step toward a more connected and capable
                  generation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
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
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
              These principles guide every decision we make and every feature we build.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
                    <value.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-neutral-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{value.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
