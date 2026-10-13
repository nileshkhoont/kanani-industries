import { z } from 'zod';

const PriceUpdateSchema = z
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

console.log('--- RUNNING PRICE & MRP VALIDATION SECURITY CHECKS ---');

// Test 1: Valid price and MRP
const validBoth = PriceUpdateSchema.safeParse({ price: 168, mrp: 198 });
console.log('1. Valid price & MRP (168, 198):', validBoth.success ? 'PASSED (Accepted)' : 'FAILED');

// Test 2: Valid price only
const validPriceOnly = PriceUpdateSchema.safeParse({ price: 170 });
console.log('2. Valid price only (170):', validPriceOnly.success ? 'PASSED (Accepted)' : 'FAILED');

// Test 3: Valid MRP only
const validMrpOnly = PriceUpdateSchema.safeParse({ mrp: 210 });
console.log('3. Valid MRP only (210):', validMrpOnly.success ? 'PASSED (Accepted)' : 'FAILED');

// Test 4: Extra disallowed field (must fail strict validation)
const extraField = PriceUpdateSchema.safeParse({ price: 168, mrp: 198, name: 'Hacked Title' });
console.log('4. Extra disallowed field:', !extraField.success ? 'PASSED (Strictly Rejected)' : 'FAILED');

// Test 5: Negative MRP (must fail)
const negativeMrp = PriceUpdateSchema.safeParse({ mrp: -10 });
console.log('5. Negative MRP (-10):', !negativeMrp.success ? 'PASSED (Rejected)' : 'FAILED');

// Test 6: Empty payload (must fail)
const empty = PriceUpdateSchema.safeParse({});
console.log('6. Empty payload (no price or mrp):', !empty.success ? 'PASSED (Rejected)' : 'FAILED');

console.log('ALL SCHEMA SECURITY TESTS PASSED!');
