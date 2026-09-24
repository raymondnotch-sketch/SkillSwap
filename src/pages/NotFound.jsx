import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Map } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex-1 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-10"
      >
        {/* 404 Text */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight text-neutral-900 select-none">
            404
          </h1>
        </div>

        {/* Illustration - Simple SVG Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-50 p-8 ring-8 ring-primary-50/50">
              <Map className="h-20 w-20 text-primary-600" strokeWidth={1.5} />
            </div>
            {/* Animated dots */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary-400"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-primary-300"
            />
          </div>
        </motion.div>

        {/* Friendly Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Oops! It looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <Button
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 px-8 py-4 text-base font-semibold transition-all hover:scale-[1.05] active:scale-[0.98]"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 rounded-xl border-2 border-neutral-200 bg-white px-8 py-4 text-base font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md hover:scale-[1.05] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 border-t border-neutral-200"
        >
          <p className="text-sm text-neutral-500 mb-4">
            Need help finding what you're looking for?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              Explore Skills
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
