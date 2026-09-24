import { motion } from 'framer-motion';
import { Mail, Clock, MessageSquare, Globe, ExternalLink, Link2, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

const contactItems = [
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Our friendly team is here to help.',
    value: 'support@skillswap.dev',
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    icon: Clock,
    title: 'Response Time',
    desc: 'We typically respond within',
    value: '24 hours',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Globe,
    title: 'Community Forum',
    desc: 'Get answers from the community',
    value: 'Visit Forum →',
    gradient: 'from-accent-500 to-accent-600',
  },
];

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-hidden"
    >
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-xs">
            <MessageSquare className="h-4 w-4 text-primary-600" />
            Contact Us
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Let&apos;s <span className="text-primary-600">Talk</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Have a question, suggestion, or feedback? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Info Cards Row */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-neutral-200/60 bg-white p-7 shadow-card transition-all hover:border-neutral-300 hover:shadow-card-hover"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-base font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500">{item.desc}</p>
                <p className="mt-1.5 text-base font-semibold text-neutral-900">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Social */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Form — takes 2/3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-xl sm:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Send us a message
                </h2>
                <p className="mt-2 text-base text-neutral-600">
                  Fill in the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      id="contact-name"
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@university.edu"
                      id="contact-email"
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    id="contact-subject"
                    required
                  />
                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your question or feedback..."
                    id="contact-message"
                    rows={6}
                    required
                  />
                  <div className="pt-3">
                    <Button type="submit" icon={Send} size="lg" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Sidebar — 1/3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Social links */}
              <div className="rounded-2xl border border-neutral-200/60 bg-white p-7 shadow-card">
                <h3 className="text-base font-bold text-neutral-900">Follow Us</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Stay up to date with the latest from SkillSwap.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    { icon: Globe, label: 'Website', href: '#' },
                    { icon: ExternalLink, label: 'Twitter', href: '#' },
                    { icon: Link2, label: 'LinkedIn', href: '#' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-600 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                    >
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ link */}
              <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-7">
                <h3 className="text-base font-bold text-neutral-900">Check the FAQ first</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Many common questions are already answered in our FAQ section. Take a look before
                  reaching out — you might find your answer instantly.
                </p>
                <a
                  href="/faq"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Browse FAQ →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
