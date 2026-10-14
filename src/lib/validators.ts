import { z } from 'zod';

export const PriceUpdateSchema = z
  .object({
    price: z
      .number()
      .positive('Price must be greater than 0')
      .max(100000, 'Price must not exceed ₹1,00,000')
      .refine(
        (val) => Number(val.toFixed(2)) === val,
        'Price can have at most 2 decimal places'
      )
      .optional(),
    mrp: z
      .number()
      .positive('MRP must be greater than 0')
      .max(100000, 'MRP must not exceed ₹1,00,000')
      .refine(
        (val) => Number(val.toFixed(2)) === val,
        'MRP can have at most 2 decimal places'
      )
      .optional(),
  })
  .strict()
  .refine(
    (data) => data.price !== undefined || data.mrp !== undefined,
    'Either price or mrp must be provided'
  );

export const AdminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{8,15}$/, 'Please enter a valid phone number'),
  email: z.string().trim().email('Please enter a valid email address'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
});


export const ExportEnquirySchema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required'),
  contactPerson: z.string().trim().min(2, 'Contact person name is required'),
  email: z.string().trim().email('Valid email address is required'),
  phone: z.string().trim().min(8, 'Contact phone number is required'),
  country: z.string().trim().min(2, 'Destination country is required'),
  quantityTonnes: z.coerce.number().positive('Quantity must be greater than 0'),
  packingPreference: z.enum(['25kg PP Bags', '30kg PP Bags', '50kg Jute Bags', 'Custom Packaging']),
  portOfDestination: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please describe your requirement in detail'),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
});
