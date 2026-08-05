import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated, initialized } = useAuth();

  useEffect(() => {
    if (initialized && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [initialized, isAuthenticated, navigate]);

  if (!initialized) {
    return <Loading fullScreen message="Checking authentication..." />;
  }

  function validate() {
    const e = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
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
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Welcome back</h1>
        <p className="mt-1.5 text-sm text-neutral-500">Sign in to continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="form-label">
            Email address
          </label>
          <div className="relative">
            <Mail
              className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${
                errors.email ? 'text-danger-400' : 'text-neutral-400'
              }`}
              aria-hidden="true"
            />
            <input
              id="login-email"
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="form-label mb-0">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${
                errors.password ? 'text-danger-400' : 'text-neutral-400'
              }`}
              aria-hidden="true"
            />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
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
          {errors.password && (
            <p className="mt-1.5 text-xs text-danger-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="pt-0.5">
          <Checkbox
            label="Remember me for 30 days"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            onClick={handleSubmit}
            loading={loading}
            fullWidth
            iconRight={ArrowRight}
            className="shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35"
          >
            Sign in
          </Button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium text-neutral-400">
              New to SkillSwap?
            </span>
          </div>
        </div>

        {/* Sign up link */}
        <Link to="/signup">
          <Button variant="outline" fullWidth>
            Create a free account
          </Button>
        </Link>
      </form>
    </div>
  );
}
