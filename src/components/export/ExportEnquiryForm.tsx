'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

export function ExportEnquiryForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    quantityTonnes: 25,
    packingPreference: '50kg Jute Bags' as const,
    portOfDestination: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
          type: 'export',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
      }
      setLoading(false);
    } catch {
      setError('A network error occurred. Please try submitting again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white border border-border shadow-navy-md">
      <div className="mb-8">
        <h3 className="font-heading font-black text-2xl text-primary-dark">
          International Trade &amp; Bulk Enquiry Desk
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          Direct communication with our Gondal export operations division. We reply with CIF/FOB
          quotations within 24 hours.
        </p>
      </div>

      {success ? (
        <div className="p-8 rounded-3xl bg-secondary-light/15 border border-secondary/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-heading font-black text-2xl text-primary-dark">
            Enquiry Successfully Registered
          </h4>
          <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
            Thank you! Our international commodity trading desk has received your container enquiry
            and will prepare technical specifications and pricing for your destination port.
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
                <span>Open Instant Discussion on WhatsApp</span>
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

          {/* Honeypot field (hidden from real users) */}
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
                Company / Importer Name *
              </label>
              <input
                type="text"
                name="companyName"
                required
                placeholder="e.g. Al-Mansoor Foodstuff LLC"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Contact Person Name *
              </label>
              <input
                type="text"
                name="contactPerson"
                required
                placeholder="e.g. Tariq Mansoor"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Corporate Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="trade@yourcompany.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Phone / WhatsApp with Country Code *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+971 50 123 4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Destination Country *
              </label>
              <input
                type="text"
                name="country"
                required
                placeholder="e.g. UAE / Saudi Arabia / UK"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Order Quantity (Metric Tonnes) *
              </label>
              <input
                type="number"
                name="quantityTonnes"
                min={1}
                required
                value={formData.quantityTonnes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Packing Preference *
              </label>
              <select
                name="packingPreference"
                value={formData.packingPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="50kg Jute Bags">50kg Jute Bags (Global Std)</option>
                <option value="25kg PP Bags">25kg PP Bags (Moisture Proof)</option>
                <option value="30kg PP Bags">30kg PP Bags (Gulf Std)</option>
                <option value="Custom Packaging">Custom Branded Pouches</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
              Destination Port (Optional)
            </label>
            <input
              type="text"
              name="portOfDestination"
              placeholder="e.g. Jebel Ali / Dammam / Felixstowe"
              value={formData.portOfDestination}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
              Technical Specifications / Incoterms Required *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Specify required grades (Savaj / Nilkanth / Varjin), target shipment period, FOB or CIF terms, and special inspection requirements."
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
                  <span>Transmit Export Order Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
