import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Users, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

const features = [
  {
    icon: Shield,
    title: 'Verified Student Network',
    description: 'Verified institutional identity for a safe learning environment',
  },
  {
    icon: Users,
    title: 'Peer-to-Peer Exchange',
    description: 'Learn directly from students who specialize in your target topics',
  },
  {
    icon: TrendingUp,
    title: 'Collaborative Growth',
    description: 'Build practical skills while helping fellow students excel',
  },
];

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen overflow-hidden">

      {/* ── Left: form panel ── */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Logo bar */}
        <div className="flex items-center px-6 py-5 sm:px-8 sm:py-6">
          <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-xs">
              S
            </div>
            <span className="font-bold text-neutral-900 text-base tracking-tight">{APP_NAME}</span>
          </Link>
        </div>

        {/* Form area — vertically centred */}
        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-8">
          <div className="w-full max-w-[400px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right: visual panel (lg+) ── */}
      <div className="relative hidden flex-1 overflow-hidden bg-neutral-900 lg:flex lg:flex-col lg:justify-center">
        {/* Content */}
        <div className="relative z-10 px-10 py-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
              Verified Student Skill Exchange
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Exchange Skills,<br />
              <span className="text-primary-400">Grow Together</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-neutral-400 max-w-md">
              Connect with verified students on campus. Learn what you love while teaching what you
              know — in a safe, peer-to-peer environment.
            </p>
          </motion.div>

          {/* Feature pills */}
          <div className="mt-8 space-y-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3.5 rounded-lg border border-neutral-800 bg-neutral-800/50 px-4 py-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-primary-400">
                  <feature.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-neutral-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Highlights */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { value: 'Verified', label: 'Students' },
              { value: '100% Free', label: 'Peer Learning' },
              { value: 'Safe', label: 'In-App Chat' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-neutral-800 bg-neutral-800/50 px-3 py-3 text-center"
              >
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


