import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Check, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollSectionHeader } from './FadeInSection';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    // Client-side validations
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('A valid email address is required.');
      return;
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      setErrorMessage('Message cannot be empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error || 'Failed to send — please try again');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage('Failed to send — please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-28 bg-[#F5F0E6] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          badge="Get In Touch"
          title="LET'S CONNECT"
          subtitle="I'm always interested in learning, building and working on practical AI projects."
          id="contact-heading"
          className="mb-16"
        />

        {/* Contact Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels (5 cols - Slide in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -25, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#263238]/15 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#C58B3A]">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F5F0E6] dark:bg-[#1E282E] border border-[#263238]/15 dark:border-white/15 text-[11px] font-mono text-[#263238] dark:text-[#FFFDF8] hover:bg-[#263238] hover:text-[#FFFDF8] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <h4 className="text-sm font-bold text-[#263238] dark:text-[#FFFDF8]">Email Address</h4>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs font-mono text-[#4F7CAC] dark:text-[#7CA2D6] hover:underline mt-1 block break-all font-semibold"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#263238]/15 hover:border-[#C58B3A]/60 shadow-sm transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] dark:bg-[#1E282E] border border-[#263238]/10 dark:border-white/10 flex items-center justify-center text-[#263238] dark:text-[#FFFDF8]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238] dark:text-[#FFFDF8]">GitHub</h4>
                  <span className="text-xs text-[#4F5961] dark:text-[#D8D3C8]">Explore repositories and code</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#68747C] dark:text-[#9EADB6] group-hover:text-[#C58B3A] transition-colors" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#263238]/15 hover:border-[#C58B3A]/60 shadow-sm transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] dark:bg-[#1E282E] border border-[#263238]/10 dark:border-white/10 flex items-center justify-center text-[#4F7CAC] dark:text-[#7CA2D6]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238] dark:text-[#FFFDF8]">LinkedIn</h4>
                  <span className="text-xs text-[#4F5961] dark:text-[#D8D3C8]">Connect professionally</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#68747C] dark:text-[#9EADB6] group-hover:text-[#C58B3A] transition-colors" />
            </a>
          </motion.div>

          {/* Simple Contact Form (7 cols - Slide in from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 25, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-[#FFFDF8] border border-[#263238]/15 shadow-sm"
          >
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#263238] dark:text-[#FFFDF8] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#4F5961] dark:text-[#D8D3C8] mb-6">
              Have a question, feedback or want to collaborate on an AI project?
            </p>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-[#F5F0E6] border border-[#263238]/10 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#C58B3A] mx-auto mb-2" />
                <h4 className="text-base font-bold text-[#263238]">Message Sent Successfully</h4>
                <p className="text-xs text-[#4F5961] mt-1">
                  Thank you! Your message has been sent to Naga Sankar (vankamallanagasankar33@gmail.com). I will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-md bg-[#263238] text-[#FFFDF8] text-xs font-bold uppercase tracking-wider hover:bg-[#C58B3A] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-[#F5F0E6] border border-[#263238]/18 text-[#263238] placeholder-[#68747C] dark:bg-[#141C20] dark:border-white/20 dark:text-[#FFFDF8] dark:placeholder-[#8B9DA6] text-sm focus:outline-none focus:border-[#C58B3A] disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#F5F0E6] border border-[#263238]/18 text-[#263238] placeholder-[#68747C] dark:bg-[#141C20] dark:border-white/20 dark:text-[#FFFDF8] dark:placeholder-[#8B9DA6] text-sm focus:outline-none focus:border-[#C58B3A] disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-lg bg-[#F5F0E6] border border-[#263238]/18 text-[#263238] placeholder-[#68747C] dark:bg-[#141C20] dark:border-white/20 dark:text-[#FFFDF8] dark:placeholder-[#8B9DA6] text-sm focus:outline-none focus:border-[#C58B3A] resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-md bg-[#263238] dark:bg-[#E5A955] hover:bg-[#C58B3A] dark:hover:bg-[#F0BC6D] text-[#FFFDF8] dark:text-[#12181B] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C58B3A] dark:text-[#12181B]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
