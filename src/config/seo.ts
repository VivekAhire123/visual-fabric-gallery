// SEO Configuration for Tata Matching Center
export const SEO_CONFIG = {
  // Primary Keywords
  primaryKeywords: [
    'tata matching center',
    'bilimora fabric shop',
    'kapad dukan bilimora',
    'astar dukaan bilimora',
    'best fabric in bilimora',
    'fabric matching center',
    'bilimora textile shop'
  ],

  // Secondary Keywords
  secondaryKeywords: [
    'kapad wholesale bilimora',
    'designer fabric bilimora',
    'wedding fabric bilimora',
    'party wear fabric bilimora',
    'fabric dealer bilimora',
    'textile dealer bilimora',
    'bilimora fabric market',
    'kapad store bilimora',
    'fabric retail bilimora',
    'custom fabric bilimora',
    'premium fabric bilimora',
    'fabric consultation bilimora'
  ],

  // Long-tail Keywords
  longTailKeywords: [
    'best fabric shop near bilimora station',
    'kapad dukan bilimora gujarat',
    'fabric matching center bilimora',
    'wholesale fabric bilimora',
    'retail fabric store bilimora',
    'designer kapad bilimora',
    'wedding kapad bilimora',
    'party wear kapad bilimora',
    'fabric shop bilimora gujarat',
    'textile market bilimora',
    'kapad wholesale dealer bilimora',
    'fabric matching service bilimora'
  ],

  // Gujarati/Hindi Keywords
  gujaratiKeywords: [
    'બિલિમોરા કપડા દુકાન',
    'બિલિમોરા ફેબ્રિક સ્ટોર',
    'કપડા મિલાન કેન્દ્ર બિલિમોરા',
    'બિલિમોરા કપડા બજાર',
    'કપડા ડીલર બિલિમોરા',
    'બિલિમોરા ટેક્સટાઇલ શોપ',
    'કપડા વ્હોલસેલ બિલિમોરા'
  ],

  // Meta Information
  meta: {
    title: 'Tata Matching Center - Best Fabric Shop in Bilimora',
    description: 'Premier fabric shop in Bilimora offering premium kapad, astar, and textile collection. Best fabric matching center with wholesale and retail services.',
    keywords: 'tata matching center, bilimora fabric shop, kapad dukan bilimora, astar dukaan bilimora, best fabric in bilimora, fabric matching center, bilimora textile shop, kapad wholesale bilimora, designer fabric bilimora, wedding fabric bilimora, party wear fabric bilimora, fabric dealer bilimora, textile dealer bilimora, bilimora fabric market, kapad store bilimora',
    author: 'Tata Matching Center',
    robots: 'index, follow',
    language: 'English',
    revisitAfter: '7 days'
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://tata-matching-center.vercel.app/',
    title: 'Tata Matching Center - Best Fabric Shop in Bilimora | Kapad Dukan',
    description: 'Premier fabric shop in Bilimora offering premium kapad, astar, and textile collection. Best fabric matching center with wholesale and retail services.',
    image: '/favicon.jpg',
    siteName: 'Tata Matching Center',
    locale: 'en_US'
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    url: 'https://tata-matching-center.vercel.app/',
    title: 'Tata Matching Center - Best Fabric Shop in Bilimora',
    description: 'Premier fabric shop in Bilimora offering premium kapad, astar, and textile collection. Best fabric matching center with wholesale and retail services.',
    image: '/favicon.jpg',
    site: '@tatamatchingcenter'
  },

  // Geographic Information
  geo: {
    region: 'IN-GJ',
    placename: 'Bilimora',
    position: '20.7500;72.9500',
    ICBM: '20.7500, 72.9500'
  },

  // Business Information
  business: {
    name: 'Tata Matching Center',
    description: 'Premier fabric shop in Bilimora offering premium kapad, astar, and textile collection',
    url: 'https://tata-matching-center.vercel.app',
    telephone: '+91-7490836570',
    address: {
      streetAddress: 'Bilimora',
      addressLocality: 'Bilimora',
      addressRegion: 'Gujarat',
      postalCode: '396321',
      addressCountry: 'IN'
    },
    geo: {
      latitude: '20.7500',
      longitude: '72.9500'
    },
    openingHours: {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00'
    },
    priceRange: '$$',
    servedArea: 'Bilimora',
    socialMedia: [
      'https://www.instagram.com/tata_matching_center/',
      'https://in.pinterest.com/tatamatchingcenter/',
    ]
  },

  // Content Strategy
  contentStrategy: {
    blogTopics: [
      'Best Fabric Shops in Bilimora - Complete Guide',
      'Wedding Fabric Selection Guide - Bilimora',
      'How to Choose Perfect Fabric for Your Outfit',
      'Fabric Matching Tips for Perfect Outfits',
      'Seasonal Fabric Trends in Bilimora',
      'Wholesale vs Retail Fabric Shopping Guide',
      'Fabric Care and Maintenance Tips',
      'Designer Fabric Trends 2024'
    ],
    servicePages: [
      'Fabric Matching Service',
      'Custom Fabric Design',
      'Wholesale Fabric Supply',
      'Wedding Fabric Consultation',
      'Party Wear Fabric Selection'
    ],
    locationPages: [
      'Fabric Shops Near Bilimora Station',
      'Best Textile Markets in Bilimora',
      'Kapad Dukan in Bilimora Area',
      'Astar Dukaan Near Me'
    ]
  },

  // Technical SEO
  technical: {
    canonicalUrl: 'https://tata-matching-center.vercel.app/',
    sitemapUrl: 'https://tata-matching-center.vercel.app/sitemap.xml',
    robotsTxtUrl: 'https://tata-matching-center.vercel.app/robots.txt',
    themeColor: '#8B4513',
    msApplicationTileColor: '#8B4513',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    appleMobileWebAppTitle: 'Tata Matching Center'
  }
};

// SEO Helper Functions
export const generateMetaTitle = (pageName?: string): string => {
  if (pageName) {
    return `${pageName} | Tata Matching Center - Best Fabric Shop in Bilimora`;
  }
  return SEO_CONFIG.meta.title;
};

export const generateMetaDescription = (pageName?: string, additionalInfo?: string): string => {
  let description = SEO_CONFIG.meta.description;
  
  if (pageName) {
    description = `${pageName} at Tata Matching Center - ${description}`;
  }
  
  if (additionalInfo) {
    description += ` ${additionalInfo}`;
  }
  
  return description;
};

export const generateKeywords = (additionalKeywords: string[] = []): string => {
  const allKeywords = [
    ...SEO_CONFIG.primaryKeywords,
    ...SEO_CONFIG.secondaryKeywords,
    ...additionalKeywords
  ];
  
  return allKeywords.join(', ');
};

// Schema.org Structured Data Generator
export const generateStructuredData = (pageType: 'homepage' | 'service' | 'product' | 'article', additionalData?: any) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    ...SEO_CONFIG.business
  };

  switch (pageType) {
    case 'homepage':
      return {
        ...baseSchema,
        '@type': 'LocalBusiness',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Fabric Collection',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Designer Fabrics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Wedding Fabrics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Party Wear Fabrics'
              }
            }
          ]
        }
      };
    
    case 'service':
      return {
        ...baseSchema,
        '@type': 'Service',
        ...additionalData
      };
    
    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        ...additionalData
      };
    
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        ...additionalData
      };
    
    default:
      return baseSchema;
  }
};
