import { useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, Send } from 'lucide-react';
import { personal } from '../data/personal.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { cn } from '../utils/cn.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please add a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  if (values.message.trim().length < 12) errors.message = 'Please write at least a short message.';
  return errors;
}

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | mailto | unconfigured
  const [copied, setCopied] = useState(false);

  const update = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // 1) Real backend configured (Formspree / Formspark / own API).
    if (personal.contactEndpoint) {
      setStatus('sending');
      try {
        const response = await fetch(personal.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        setStatus('success');
        setValues(EMPTY);
      } catch {
        setStatus('error');
      }
      return;
    }

    // 2) No backend: hand the message to the visitor's mail client instead
    //    of faking a successful submission.
    if (personal.email) {
      const subject = encodeURIComponent(values.subject || 'Portfolio enquiry');
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    // 3) Nothing configured yet.
    setStatus('unconfigured');
  };

  const copyEmail = async () => {
    if (!personal.email) return;
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const channels = [
    personal.email && {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    personal.github && { icon: GithubIcon, label: 'GitHub', value: 'View repositories', href: personal.github },
    personal.linkedin && {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: personal.linkedin,
    },
  ].filter(Boolean);

  const inputClass = (field) =>
    cn(
      'w-full rounded-lg border bg-base/60 px-3.5 py-2.5 text-[0.88rem] text-fg placeholder:text-fg-subtle/70 transition-colors duration-200',
      errors[field]
        ? 'border-[#ef4444]/60 focus:border-[#ef4444]'
        : 'border-line/70 hover:border-line focus:border-accent/60',
    );

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_100%,rgba(56,189,248,0.10),transparent_70%)]"
      />

      <div className="container-page">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's build something worth shipping."
          description="I am open to software development internships and junior roles. Send a message and I will reply as soon as I can."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Reveal className="panel p-6">
              <h3 className="font-display text-sm font-semibold text-fg">Direct channels</h3>
              <div className="mt-4 space-y-3">
                {channels.length ? (
                  channels.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={label === 'Email' ? undefined : '_blank'}
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 rounded-lg border border-line/60 bg-elevated/40 p-3 transition-colors hover:border-accent/50 hover:bg-accent/5"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/70 bg-base/70 text-accent-soft">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.58rem] tracking-[0.16em] text-fg-subtle uppercase">
                          {label}
                        </span>
                        <span className="block truncate text-[0.85rem] font-medium text-fg">{value}</span>
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="rounded-lg border border-dashed border-line/70 bg-elevated/30 p-3 text-[0.8rem] leading-relaxed text-fg-subtle">
                    Direct contact links are being updated. Use the form to reach out.
                  </p>
                )}
              </div>

              {personal.email ? (
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-4 inline-flex items-center gap-2 text-[0.78rem] text-fg-muted transition-colors hover:text-fg"
                >
                  {copied ? <CheckCircle2 size={14} className="text-success" /> : <Copy size={14} />}
                  {copied ? 'Email copied' : 'Copy email address'}
                </button>
              ) : null}
            </Reveal>

            <Reveal className="panel p-6" delay={0.08}>
              <h3 className="font-display text-sm font-semibold text-fg">Availability</h3>
              <p className="mt-3 flex items-start gap-2 text-[0.85rem] leading-relaxed text-fg-muted">
                <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                {personal.availability}
              </p>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-fg-subtle">
                {personal.location
                  ? `${personal.location} · open to remote and on-site opportunities.`
                  : 'Open to remote and on-site opportunities.'}
              </p>
            </Reveal>
          </div>

          <Reveal className="panel p-6 sm:p-7" delay={0.12}>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-[0.78rem] font-medium text-fg-muted">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className={inputClass('name')}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p id="error-name" className="mt-1.5 flex items-center gap-1 text-[0.72rem] text-[#f87171]">
                      <AlertCircle size={11} /> {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-[0.78rem] font-medium text-fg-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={inputClass('email')}
                    placeholder="you@company.com"
                  />
                  {errors.email ? (
                    <p id="error-email" className="mt-1.5 flex items-center gap-1 text-[0.72rem] text-[#f87171]">
                      <AlertCircle size={11} /> {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-[0.78rem] font-medium text-fg-muted">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={update('subject')}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className={inputClass('subject')}
                  placeholder="Internship opportunity, project enquiry…"
                />
                {errors.subject ? (
                  <p id="error-subject" className="mt-1.5 flex items-center gap-1 text-[0.72rem] text-[#f87171]">
                    <AlertCircle size={11} /> {errors.subject}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-[0.78rem] font-medium text-fg-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={cn(inputClass('message'), 'resize-y')}
                  placeholder="Tell me about the role, the team or the problem you want solved."
                />
                {errors.message ? (
                  <p id="error-message" className="mt-1.5 flex items-center gap-1 text-[0.72rem] text-[#f87171]">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p className="text-[0.72rem] text-fg-subtle">
                  {personal.contactEndpoint
                    ? 'Delivered to a configured form endpoint.'
                    : personal.email
                      ? 'Opens your mail app with the message ready to send.'
                      : 'Form delivery is not configured yet.'}
                </p>
              </div>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status === 'success' ? (
                  <p className="flex items-center gap-1.5 text-[0.78rem] text-success">
                    <CheckCircle2 size={14} /> Message sent. Thank you — I will reply soon.
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p className="flex items-center gap-1.5 text-[0.78rem] text-[#f87171]">
                    <AlertCircle size={14} /> The message could not be sent. Please email me directly instead.
                  </p>
                ) : null}
                {status === 'mailto' ? (
                  <p className="flex items-center gap-1.5 text-[0.78rem] text-fg-muted">
                    <CheckCircle2 size={14} className="text-accent-soft" /> Your mail app should now be open with
                    the message prepared.
                  </p>
                ) : null}
                {status === 'unconfigured' ? (
                  <p className="flex items-center gap-1.5 text-[0.78rem] text-fg-muted">
                    <AlertCircle size={14} /> No delivery channel is configured. Set an email or
                    <code className="font-mono text-[0.72rem] text-accent-soft">VITE_CONTACT_ENDPOINT</code> to
                    enable sending.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
