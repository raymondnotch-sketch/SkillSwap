import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();

  function validate() {
    const e = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // UI-only placeholder: simulate login loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged in (placeholder)');
      navigate('/dashboard');
    }, 900);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="w-full"
    >
      <h1 className="text-center text-2xl font-bold tracking-tight text-neutral-900">
        Welcome back
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-500">Sign in to your account</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
            Forgot?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Sign in
        </Button>

        <p className="text-center text-sm text-neutral-500">
          New here?{' '}
          <Link to="/signup" className="font-medium text-primary-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
