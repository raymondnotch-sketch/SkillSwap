import { motion } from 'framer-motion';
import { UserPlus, Share2, Users, Calendar, BookOpen, Star, Award, ArrowDown } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Create Profile', desc: 'Sign up and build your profile. List the skills you can teach and the skills you want to learn.' },
  { icon: Share2, title: 'Share Skills', desc: 'Showcase your expertise. Describe what you can teach, your experience level, and your teaching style.' },
  { icon: Users, title: 'Find Matches', desc: 'Browse skill categories and connect with peers who complement your learning goals.' },
  { icon: Calendar, title: 'Book Sessions', desc: 'Schedule a time that works for both of you. Virtual or in-person, it is up to you.' },
  { icon: BookOpen, title: 'Exchange Knowledge', desc: 'Teach your skill, learn theirs. Each session is a collaborative exchange of knowledge.' },
  { icon: Star, title: 'Leave Reviews', desc: 'Share feedback after each session. Help others find great peers and build trust in the community.' },
  { icon: Award, title: 'Earn Reputation', desc: 'Build your reputation with every successful session. Earn badges and become a trusted member.' },
];

export default function HowItWorks() {
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
            How It Works
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Your Journey Starts Here
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            From creating your profile to earning reputation, here is exactly how SkillSwap works
            step by step.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center gap-6 sm:flex-row"
              >
                {/* Timeline line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-8 top-16 hidden h-12 w-px border-l border-dashed border-neutral-300 sm:block" />
                )}
                {/* Step number + icon */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-neutral-200/60">
                  <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <step.icon className="h-7 w-7 text-primary-600" />
                </div>
                {/* Content */}
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
