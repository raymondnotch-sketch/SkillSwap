import { motion } from 'framer-motion';
import { Mail, Clock, MessageSquare, Globe, ExternalLink, Link2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Card from '../components/ui/Card';

export default function Contact() {
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
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
            Have a question, suggestion, or just want to say hello? We would love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-neutral-900">Send us a message</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  We typically respond within 24 hours.
                </p>
                <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Name"
                      placeholder="Your full name"
                      id="contact-name"
                      required
                    />
                    <Input
                      label="Email"
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
                    rows={5}
                    required
                  />
                  <Button type="submit" icon={MessageSquare}>
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <Mail className="h-5 w-5 text-primary-600" />
                <h3 className="mt-3 text-sm font-semibold text-neutral-900">Email</h3>
                <p className="mt-1 text-sm text-neutral-500">support@skillswap.dev</p>
              </Card>

              <Card className="p-6">
                <Clock className="h-5 w-5 text-primary-600" />
                <h3 className="mt-3 text-sm font-semibold text-neutral-900">Response Time</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  We aim to respond within 24 hours during business days.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-semibold text-neutral-900">Follow Us</h3>
                <div className="mt-3 flex gap-3">
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 transition-colors hover:border-primary-200 hover:text-primary-600"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 transition-colors hover:border-primary-200 hover:text-primary-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 transition-colors hover:border-primary-200 hover:text-primary-600"
                  >
                    <Link2 className="h-4 w-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
