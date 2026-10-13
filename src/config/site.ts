export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  logo: {
    main: string;
    transparent: string;
    ogImage: string;
    icon: string;
    appleIcon: string;
  };
  contact: {
    phone: string;
    displayPhone: string;
    whatsappNumber: string; // digits only for wa.me link
    displayWhatsapp: string;
    email: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
      full: string;
    };
    googleMapsEmbedUrl: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  stats: {
    yearsOfExperience: number;
    happyCustomers: number;
    tonnesTraded: number;
    countriesServed: number;
  };
  exportCountries: Array<{
    name: string;
    code: string;
    region: string;
    flag: string;
  }>;
  announcements: string[];
  freeShippingThreshold: number; // in INR
}

export const siteConfig: SiteConfig = {
  name: "Kanani Industries",
  legalName: "Kanani Industries Pvt. Ltd.",
  tagline: "Sortex Toor Trading | Import & Export",
  description:
    "Leading Gujarat-based processor, trader, and global exporter of premium Sortex-cleaned Toor Dal (Pigeon Peas) under our own trusted brands: Savaj, Ganesh, Nilkanth, and Natural.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kananiindustries.com",
  logo: {
    main: "/brand/kanani-logo.png",
    transparent: "/brand/kanani-logo-transparent.png",
    ogImage: "/brand/og-image.png",
    icon: "/icon.png",
    appleIcon: "/apple-icon.png",
  },
  contact: {
    // [PLACEHOLDER - REPLACE WITH ACTUAL BUSINESS PHONE]
    phone: "+919876543210",
    displayPhone: "+91 98765 43210",
    // [PLACEHOLDER - REPLACE WITH ACTUAL WHATSAPP NUMBER FOR ORDERS]
    whatsappNumber: "919876543210",
    displayWhatsapp: "+91 98765 43210",
    // [PLACEHOLDER - REPLACE WITH ACTUAL BUSINESS EMAIL]
    email: "info@kananiindustries.com",
    address: {
      // [PLACEHOLDER - REPLACE WITH ACTUAL FACILITY ADDRESS]
      line1: "Plot No. 42-45, GIDC Industrial Estate",
      line2: "Junagadh National Highway Bypass",
      city: "Gondal",
      state: "Gujarat",
      pincode: "360311",
      country: "India",
      full: "Plot No. 42-45, GIDC Industrial Estate, Junagadh Highway Bypass, Gondal - 360311, Gujarat, India",
    },
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118228.31846931557!2d70.73030467711462!3d21.96349372990669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395837651a141979%3A0xb3e56a793a38d706!2sGondal%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  social: {
    facebook: "https://facebook.com/kananiindustries",
    instagram: "https://instagram.com/kananiindustries",
    linkedin: "https://linkedin.com/company/kanani-industries",
    twitter: "https://twitter.com/kananiind",
    youtube: "https://youtube.com/@kananiindustries",
  },
  // [PLACEHOLDER - REPLACE WITH REAL HISTORICAL STATS IF DESIRED]
  stats: {
    yearsOfExperience: 28,
    happyCustomers: 15000,
    tonnesTraded: 45000,
    countriesServed: 18,
  },
  exportCountries: [
    { name: "United Arab Emirates", code: "AE", region: "Middle East", flag: "🇦🇪" },
    { name: "Saudi Arabia", code: "SA", region: "Middle East", flag: "🇸🇦" },
    { name: "United Kingdom", code: "GB", region: "Europe", flag: "🇬🇧" },
    { name: "United States", code: "US", region: "North America", flag: "🇺🇸" },
    { name: "Canada", code: "CA", region: "North America", flag: "🇨🇦" },
    { name: "Singapore", code: "SG", region: "Southeast Asia", flag: "🇸🇬" },
    { name: "Malaysia", code: "MY", region: "Southeast Asia", flag: "🇲🇾" },
    { name: "Australia", code: "AU", region: "Oceania", flag: "🇦🇺" },
    { name: "Qatar", code: "QA", region: "Middle East", flag: "🇶🇦" },
    { name: "Kuwait", code: "KW", region: "Middle East", flag: "🇰🇼" },
    { name: "Oman", code: "OM", region: "Middle East", flag: "🇴🇲" },
    { name: "South Africa", code: "ZA", region: "Africa", flag: "🇿🇦" },
  ],
  announcements: [
    "🌾 Fresh Gujarat Crop Sortex Toor Dal Now Ready for Domestic & Bulk Export Dispatch",
    "✨ Multi-Camera Optical Sortex Cleaned: Guaranteed 99.8% Grain Purity",
    "📦 Heavy-Duty Bulk Packing Available in 25kg, 30kg & 50kg Bags",
    "🚚 Fast Dispatch across India | Trusted Direct Miller Pricing",
  ],
  freeShippingThreshold: 1999,
};
