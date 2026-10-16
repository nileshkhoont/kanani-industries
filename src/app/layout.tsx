import type { Metadata } from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Sortex Toor',
    'Kanani Industries',
    'Gujarat Toor',
    'Pigeon Peas Exporter',
    'Savaj Brand Toor',
    'Ganesh Brand Toor',
    'Nilkanth Brand Toor',
    'Natural Brand Unpolished Toor',
    'Junagadh Pulse Trading',
    'Pulses Import Export India',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Sortex Toor Trading | Import & Export`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logo.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon-k.ico', sizes: '48x48' },
      { url: '/icon-k.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon-k.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.main}`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'sales and customer service',
      areaServed: 'IN, AE, SA, GB, US, CA',
      availableLanguage: ['English', 'Gujarati', 'Hindi'],
    },
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-ink font-sans selection:bg-secondary-light selection:text-primary-dark">
        <SmoothScroll>
          <LoadingScreen />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </SmoothScroll>
      </body>
    </html>
  );
}
