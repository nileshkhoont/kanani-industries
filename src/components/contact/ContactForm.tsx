'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'contact',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send message. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
      }
      setLoading(false);
    } catch {
      setError('A network error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white border border-border shadow-navy-md">
      <div className="mb-8">
        <h3 className="font-heading font-black text-2xl text-primary-dark">
          Send Us a Direct Message
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          For distributor inquiries, bulk supply quotes, or general consumer questions.
        </p>
      </div>

      {success ? (
        <div className="p-8 rounded-3xl bg-secondary-light/15 border border-secondary/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-heading font-black text-2xl text-primary-dark">
            Message Successfully Dispatched
          </h4>
          <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
            Thank you for connecting with Kanani Industries. Our customer care desk in Gondal will
            review your message and get in touch with you shortly.
          </p>

          {whatsappUrl && (
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary-dark text-white font-heading font-bold text-sm shadow-navy-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Follow Up on WhatsApp Instantly</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-3 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Honeypot */}
          <div className="hidden">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ketan Kanani"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
              Message / Inquiry Details *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us what you need — brand preference (Savaj / Ganesh / Nilkanth / Natural), bag quantity, delivery destination, etc."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-light text-white font-heading font-extrabold text-sm shadow-navy-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
