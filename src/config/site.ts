export interface SiteConfig {
  name: string;
  legalName: string;
  sisterCompany: string;
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
  legalName: "Kanani Industries",
  sisterCompany: "Ganesh Trading Co.",
  tagline: "Premier Sortex Toor Milling & Trading",
  description:
    "Leading Gujarat-based processor and trader of premium Sortex-cleaned Toor (Pigeon Peas) under our own trusted brands: Savaj, Ganesh, Nilkanth, and Natural.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kananiindustries.com",
  logo: {
    main: "/brand/kanani-k-logo.png",
    transparent: "/brand/kanani-k-logo-transparent.png",
    ogImage: "/brand/og-image.png",
    icon: "/icon-k.png",
    appleIcon: "/apple-icon-k.png",
  },
  contact: {
    phone: "+918000004462",
    displayPhone: "+91 80000 04462",
    whatsappNumber: "918000004462",
    displayWhatsapp: "+91 80000 04462",
    email: "",
    address: {
      line1: "Plot No 103(a) G.i.d.c.-1",
      line2: "Dolatpara",
      city: "Junagadh",
      state: "Gujarat",
      pincode: "362001",
      country: "India",
      full: "Plot No 103(a) G.i.d.c.-1 Dolatpara Junagadh(362001), Gujarat, India",
    },
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=Plot+No+103(a)+G.i.d.c.-1+Dolatpara+Junagadh+362001+Gujarat+India&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  social: {
    facebook: "https://facebook.com/kananiindustries",
    instagram: "https://instagram.com/kananiindustries",
    linkedin: "https://linkedin.com/company/kanani-industries",
    twitter: "https://twitter.com/kananiind",
    youtube: "https://youtube.com/@kananiindustries",
  },
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
    "Fresh Gujarat Crop Sortex Toor Now Ready for Wholesale & Retail Dispatch",
    "Multi-Camera Optical Sortex Cleaned: Guaranteed 99.8% Grain Purity",
    "Bulk Wholesale & Retail Supply Available Direct From Junagadh Mill",
    "Fast Dispatch across India | Trusted Direct Miller Pricing",
  ],
  freeShippingThreshold: 1999,
};
