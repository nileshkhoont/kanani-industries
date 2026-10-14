import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema, ExportEnquirySchema } from '@/lib/validators';
import { siteConfig } from '@/config/site';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const type = body.type === 'export' ? 'export' : 'contact';

    if (type === 'export') {
      const parsed = ExportEnquirySchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues.map((e) => e.message).join(', ') },
          { status: 400 }
        );
      }

      if (parsed.data.honeypot) {
        return NextResponse.json({ success: true, message: 'Enquiry received' });
      }

      const enquiry = parsed.data;
      console.log('--- [NEW EXPORT ENQUIRY RECEIVED] ---');
      console.log(JSON.stringify(enquiry, null, 2));

      // Build WhatsApp message text fallback
      const waText = encodeURIComponent(
        `*New Bulk Trade Enquiry - Kanani Industries*\n\n` +
          `Company: ${enquiry.companyName}\n` +
          `Contact: ${enquiry.contactPerson}\n` +
          `Country: ${enquiry.country}\n` +
          `Quantity: ${enquiry.quantityTonnes} Tonnes\n` +
          `Packaging: ${enquiry.packingPreference}\n` +
          `Destination Port: ${enquiry.portOfDestination || 'N/A'}\n` +
          `Phone: ${enquiry.phone}\n` +
          `Email: ${enquiry.email}\n` +
          `Requirements: ${enquiry.message}`
      );
      const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${waText}`;

      return NextResponse.json({
        success: true,
        message: 'Your export enquiry has been received. Our trade desk will contact you within 24 hours.',
        whatsappUrl: waUrl,
      });
    } else {
      const parsed = ContactFormSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues.map((e) => e.message).join(', ') },
          { status: 400 }
        );
      }

      if (parsed.data.honeypot) {
        return NextResponse.json({ success: true, message: 'Message received' });
      }

      const contact = parsed.data;
      console.log('--- [NEW CONTACT MESSAGE RECEIVED] ---');
      console.log(JSON.stringify(contact, null, 2));

      const waText = encodeURIComponent(
        `*Customer Enquiry - Kanani Industries*\n\n` +
          `Name: ${contact.name}\n` +
          `Phone: ${contact.phone}\n` +
          `Email: ${contact.email}\n` +
          `Message: ${contact.message}`
      );
      const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${waText}`;

      return NextResponse.json({
        success: true,
        message: 'Thank you for reaching out! We have received your message and will respond shortly.',
        whatsappUrl: waUrl,
      });
    }
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json({ error: 'Server error processing enquiry' }, { status: 500 });
  }
}
