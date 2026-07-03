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
  { icon: Search, title: 'Discover Skills', desc: 'Browse a wide range of skills shared by verified students in your community.' },
  { icon: Users, title: 'Match with a Peer', desc: 'Connect with someone who wants to learn what you know — and teach what you want to learn.' },
  { icon: BookOpen, title: 'Learn Together', desc: 'Exchange knowledge through structured sessions, collaborative projects, and real-time feedback.' },
  { icon: Star, title: 'Grow Your Network', desc: 'Build lasting connections, earn reputation, and expand your skill set with every interaction.' },
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
  { icon: UserCheck, title: 'Verified Students', desc: 'Every member is verified to ensure a trusted learning environment.' },
  { icon: MessageSquare, title: 'Private Messaging', desc: 'Communicate securely with built-in messaging — no need to share personal details.' },
  { icon: Mail, title: 'Optional Contact Sharing', desc: 'You control when and how to share your contact information.' },
  { icon: Shield, title: 'Safe Online-First Experience', desc: 'All interactions happen within our platform until you are ready to take the next step.' },
];

const testimonials = [
  { name: 'Sarah Mitchell', role: 'Computer Science Student', quote: 'SkillSwap helped me master Python while teaching someone else Git. The peer learning model is incredibly effective.' },
  { name: 'James Rodriguez', role: 'Design Student', quote: 'I joined to learn frontend development and ended up finding a study partner who became a close friend. The community is amazing.' },
  { name: 'Priya Patel', role: 'Mathematics Major', quote: 'The verification system made me feel safe from day one. Knowing everyone is a real student takes the anxiety out of connecting.' },
  { name: 'Alex Kim', role: 'Engineering Student', quote: 'Teaching web development to others solidified my own knowledge. SkillSwap is a win-win for everyone involved.' },
];

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-6xl lg:flex lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
              Peer-to-Peer Learning Platform
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-5xl">
              Learn What You Love,{' '}
              <span className="text-primary-600">Teach What You Know</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">
              SkillSwap connects verified students for peer-to-peer learning. Discover skills, find
              matches, and grow together — all in a safe, trusted environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" icon={ArrowRight}>
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 hidden lg:mt-0 lg:block lg:flex-1"
          >
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {[Code, Palette, Globe, Sigma, GitBranch, Cpu].map((Icon, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-2xl border border-neutral-200/60 bg-white shadow-soft transition-shadow hover:shadow-md"
                  >
                    <Icon className="h-8 w-8 text-primary-500" />
                  </div>
                ))}
              </div>
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary-100/50 via-transparent to-transparent blur-2xl" />
            </div>
          </motion.div>
        </div>
        <div className="absolute -bottom-6 left-1/2 h-24 w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-to-t from-neutral-100/50 to-transparent blur-3xl" />
      </section>

      {/* Trusted Community */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              A Community Built on Trust
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-neutral-500">
              SkillSwap is more than a platform — it is a community of verified students committed to
              helping each other grow. Every member is authenticated, every interaction is safe.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { value: '10,000+', label: 'Verified Students' },
              { value: '500+', label: 'Skills Shared' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '150+', label: 'Universities' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="rounded-2xl border border-neutral-200/60 bg-white p-6 text-center shadow-soft"
              >
                <p className="text-3xl font-bold tracking-tight text-primary-600">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
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
              How SkillSwap Works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
              Four simple steps to start exchanging skills with peers who share your passion for
              learning.
            </p>
          </motion.div>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-8 hidden h-px w-8 border-t border-dashed border-neutral-300 lg:block" />
                )}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 shadow-soft">
                  <step.icon className="h-7 w-7 text-primary-600" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary-600">
                  Step {step.title === 'Grow Your Network' ? '04' : step.title === 'Learn Together' ? '03' : step.title === 'Match with a Peer' ? '02' : '01'}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skill Categories */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
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
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
              Explore skills across a wide range of categories — from programming to design and
              everything in between.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={item}>
                <Card variant="interactive" hover className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <cat.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-900">{cat.name}</span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety First */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                Safety First
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                A Safe Space for Learning
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-500">
                We prioritize your safety with robust verification, private communication, and full
                control over your personal information.
              </p>
              <div className="mt-8 space-y-6">
                {safetyPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-soft">
                      <point.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{point.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">{point.desc}</p>
                    </div>
                  </div>
                ))}
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
                <Shield className="h-12 w-12 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Verified by Design</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Our multi-step verification process ensures that every member is who they say they
                  are. From institutional email verification to profile reviews, we maintain a
                    community you can trust.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Institutional email verification',
                    'Profile review and approval',
                    'Activity monitoring for safety',
                    'Reporting and moderation tools',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 shrink-0 text-success-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
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
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
              Hear from students who have transformed their learning experience through SkillSwap.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={item}>
                <Card variant="default" className="flex h-full flex-col">
                  <Quote className="h-6 w-6 text-primary-200" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">"{t.quote}"</p>
                  <div className="mt-4 border-t border-neutral-100 pt-4">
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-14 text-center shadow-soft-xl sm:px-14"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-primary-100">
            Join thousands of verified students already exchanging skills and growing together. It is
            free to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800"
                icon={ArrowRight}
              >
                Join SkillSwap
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-400 text-white hover:bg-primary-700 hover:text-white"
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
