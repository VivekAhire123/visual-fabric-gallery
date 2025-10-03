// Test the cleaned schema without aggregateRating
const cleanSchema = {
  "@type": "Product",
  "name": "Designer Fabrics",
  "description": "Premium designer fabrics for special occasions",
  "image": "https://tata-matching-center.vercel.app/designer-fabrics.jpg",
  "offers": {
    "@type": "Offer",
    "price": "500",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "INR"
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7
    }
  }
};

console.log('🧹 Clean Schema Validation:');
console.log('============================');

// Check required fields
const requiredFields = {
  'Product Name': !!cleanSchema.name,
  'Description': !!cleanSchema.description,
  'Image': !!cleanSchema.image,
  'Price': !!cleanSchema.offers.price,
  'Currency': !!cleanSchema.offers.priceCurrency,
  'Availability': !!cleanSchema.offers.availability
};

// Check optional fields
const optionalFields = {
  'Price Valid Until': !!cleanSchema.offers.priceValidUntil,
  'Shipping Details': !!cleanSchema.offers.shippingDetails,
  'Return Policy': !!cleanSchema.offers.hasMerchantReturnPolicy
};

console.log('\n✅ Required Fields:');
Object.entries(requiredFields).forEach(([field, present]) => {
  console.log(`  ${present ? '✅' : '❌'} ${field}`);
});

console.log('\n📋 Optional Fields:');
Object.entries(optionalFields).forEach(([field, present]) => {
  console.log(`  ${present ? '✅' : '❌'} ${field}`);
});

console.log('\n🚫 Removed Fields:');
console.log('  ❌ AggregateRating (removed - requires positive reviewCount)');

const allRequired = Object.values(requiredFields).every(Boolean);
const allOptional = Object.values(optionalFields).every(Boolean);

console.log(`\n🏆 Schema Status:`);
console.log(`  Required Fields: ${allRequired ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);
console.log(`  Optional Fields: ${allOptional ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);

if (allRequired && allOptional) {
  console.log('\n🎉 SUCCESS! Schema is now clean and should pass Google Search Console validation!');
  console.log('\n📝 Note: Add aggregateRating back when you have real customer reviews (reviewCount > 0)');
}
