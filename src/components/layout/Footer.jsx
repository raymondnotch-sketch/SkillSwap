import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Mail, Share2, MessageCircle, Send } from 'lucide-react';
import { APP_NAME, FOOTER_LINKS } from '../../constants';

const socials = [
  { icon: Send, href: '#', label: 'Twitter' },
  { icon: Share2, href: '#', label: 'GitHub' },
  { icon: MessageCircle, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── Newsletter / CTA strip ── */}
        <div className="py-10">
          <div className="rounded-xl border border-neutral-200 bg-neutral-900 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white">Stay updated with SkillSwap</h3>
                <p className="mt-1 text-sm text-neutral-400">New skill categories, platform updates, and learning guides.</p>
              </div>
              <div className="flex w-full max-w-xs shrink-0 items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-9 pr-3 text-sm text-white placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Email for newsletter"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 md:grid-cols-5 md:gap-x-10">
          {/* Brand col — spans 2 on md */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-xs">
                S
              </div>
              <span className="font-bold text-neutral-900 text-base tracking-tight">
                {APP_NAME}
              </span>
            </Link>

            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-neutral-500">
              Exchange skills, grow together. Connect with verified students who want to learn what
              you know — completely free.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-1.5 text-xs text-neutral-400">
              Made with{' '}
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500" aria-hidden="true" />
              {' '}for learners everywhere
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Product
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-100 py-6 sm:flex-row">
          <p className="text-xs text-neutral-400">
            &copy; {currentYear} {APP_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-neutral-400 transition-colors hover:text-neutral-600">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-neutral-400 transition-colors hover:text-neutral-600">
              Terms
            </Link>
            <Link to="/contact" className="text-xs text-neutral-400 transition-colors hover:text-neutral-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
