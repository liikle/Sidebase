/** Single source of truth for the report price. Keep in sync with STRIPE_PRICE_ID if you use one. */
export const REPORT_PRICE = {
  amount: 799,
  currency: 'usd',
  display: '$7.99',
  productName: 'Sidebase Full Side Hustle Report',
  productDescription:
    'Your top 10 personalized side hustle matches with launch plans, tools, first-customer strategies and a downloadable PDF. One-time purchase.',
} as const
