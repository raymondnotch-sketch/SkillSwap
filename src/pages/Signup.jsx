import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react';
import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../hooks/useAuth';

// Password strength helpers
function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
const strengthColors = [
  '',
  'bg-danger-500',
  'bg-warning-500',
  'bg-warning-400',
  'bg-success-500',
  'bg-success-600',
];
const strengthTextColors = [
  '',
  'text-danger-600',
  'text-warning-600',
  'text-warning-500',
  'text-success-600',
  'text-success-700',
];

const requirements = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, isAuthenticated, initialized } = useAuth();

  useEffect(() => {
    if (initialized && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [initialized, isAuthenticated, navigate]);

  if (!initialized) {
    return <Loading fullScreen message="Checking authentication..." />;
  }

  const strength = useMemo(() => getStrength(password), [password]);
  const strengthWidth = `${(strength / 5) * 100}%`;

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!confirm) e.confirm = 'Please confirm your password';
    else if (password !== confirm) e.confirm = 'Passwords do not match';
    if (!agree) e.agree = 'You must agree to the terms';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);
    try {
      await register({
        full_name: name,
        email,
        password,
        school: '',
        department: '',
        level: '',
      });
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      setServerError(error.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-neutral-500">Start exchanging skills today — it's free</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}
        {/* Full name */}
        <div>
          <label htmlFor="signup-name" className="form-label">
            Full name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoComplete="name"
              required
              aria-invalid={errors.name ? 'true' : undefined}
              className={`form-input pl-10 ${errors.name ? 'error' : ''}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-danger-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="signup-email" className="form-label">
            Email address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              autoComplete="email"
              required
              aria-invalid={errors.email ? 'true' : undefined}
              className={`form-input pl-10 ${errors.email ? 'error' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-danger-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password + strength meter */}
        <div>
          <label htmlFor="signup-password" className="form-label">
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              aria-invalid={errors.password ? 'true' : undefined}
              className={`form-input pl-10 pr-10 ${errors.password ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Strength meter */}
          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2.5 space-y-2"
              >
                {/* Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i < strength ? strengthColors[strength] : 'bg-neutral-100'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${strengthTextColors[strength]}`}>
                    {strengthLabels[strength]}
                  </span>
                </div>

                {/* Requirements checklist */}
                <div className="space-y-1">
                  {requirements.map((req) => {
                    const met = req.test(password);
                    return (
                      <div key={req.label} className="flex items-center gap-2">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-200 ${met ? 'bg-success-100' : 'bg-neutral-100'}`}
                        >
                          {met ? (
                            <Check className="h-2.5 w-2.5 text-success-600" aria-hidden="true" />
                          ) : (
                            <X className="h-2.5 w-2.5 text-neutral-400" aria-hidden="true" />
                          )}
                        </div>
                        <span
                          className={`text-xs transition-colors duration-200 ${met ? 'text-success-700' : 'text-neutral-400'}`}
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errors.password && (
            <p className="mt-1.5 text-xs text-danger-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="signup-confirm" className="form-label">
            Confirm password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              aria-invalid={errors.confirm ? 'true' : undefined}
              className={`form-input pl-10 pr-10 ${errors.confirm ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirm && (
            <p className="mt-1.5 text-xs text-danger-600" role="alert">
              {errors.confirm}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="pt-1">
          <Checkbox
            label={
              <span className="text-sm text-neutral-600">
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="font-medium text-primary-600 hover:underline underline-offset-2"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="font-medium text-primary-600 hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
              </span>
            }
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            error={errors.agree}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            loading={loading}
            fullWidth
            iconRight={ArrowRight}
            className="shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35"
          >
            Create account
          </Button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium text-neutral-400">
              Already have an account?
            </span>
          </div>
        </div>

        <Link to="/login">
          <Button variant="outline" fullWidth>
            Sign in instead
          </Button>
        </Link>
      </form>
    </div>
  );
}
