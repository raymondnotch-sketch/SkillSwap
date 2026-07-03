import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { useToast } from '../components/ui/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();

  function validate() {
    const e = {};
    if (!name) e.name = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    if (!confirm) e.confirm = 'Please confirm your password';
    if (password && confirm && password !== confirm) e.confirm = 'Passwords do not match';
    if (!agree) e.agree = 'You must agree to the terms';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // UI-only placeholder: simulate signup
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created (placeholder)');
      navigate('/login');
    }, 1000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="w-full"
    >
      <h1 className="text-center text-2xl font-bold tracking-tight text-neutral-900">
        Create your account
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-500">Start learning and sharing skills</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

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
          autoComplete="new-password"
        />

        <Input
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          required
          autoComplete="new-password"
        />

        <div>
          <Checkbox
            label="I agree to the Terms and Privacy"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            error={errors.agree}
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Create account
        </Button>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
