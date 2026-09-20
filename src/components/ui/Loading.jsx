import { motion } from 'framer-motion';

export default function Loading({ fullScreen = false, message = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <LoadingSpinner message={message} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner message={message} />
    </div>
  );
}

function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-12 w-12">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Spinning gradient ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-primary-600"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-primary-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-neutral-600"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Logo-based loading animation
export function LoadingLogo({ message = 'Loading SkillSwap...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-2xl font-bold text-white shadow-xs">
            S
          </div>
        </motion.div>
        
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-neutral-900"
          >
            SkillSwap
          </motion.h1>
          
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-neutral-600"
            >
              {message}
            </motion.p>
          )}
          
          <motion.div
            className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-neutral-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Dots loading indicator
export function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-primary-600"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
