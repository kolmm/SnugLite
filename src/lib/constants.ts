export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SHOP_CATEGORY: '/shop/:category',
  PRODUCT: '/products/:slug',
  ABOUT: '/about',
  SOURCING: '/sourcing',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-use',
  REFUND: '/refund-policy',
} as const;

export const BRAND = {
  NAME: 'SnugLite',
  ENTITY: 'SnugLite SRL',
  COMPANY_NUMBER: '54577220',
  TAGLINE: 'Considered Workspaces',
  SUBTITLE: 'Office Furniture & Workspace Solutions',
  YEAR_FOUNDED: 2026,
} as const;

export const CONTACT = {
  EMAIL: 'orders@snuglitesrl.com',
  DOMAIN: 'snuglitesrl.com',
  SITE_URL: 'https://snuglitesrl.com',
  // PHONE: '',
  ADDRESS_LINE_1: 'Str. Pucheni, 115B',
  ADDRESS_LINE_2: 'Sector 5, Municipiul Bucureşti',
  COUNTRY: 'Romania',
} as const;

export const STORAGE_KEYS = {
  CART: 'snuglite-cart-v1',
  COOKIE_CONSENT: 'snuglite-cookie-consent-v1',
  LAST_ORDER: 'snuglite-last-order',
} as const;

export const ORDER_NUMBER_OFFSET = 1042;
