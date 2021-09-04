const config = {
  NUM_ITEMS_PER_VIEW: 9,
  PAGE_INTERVAL: 5,
  CURRENCIES: {
    usd: { val: 'usd', symbol: 'USD' },
    uzsom: { val: 'uzsom', symbol: 'UZSOM' },
    eu: { val: 'eu', symbol: 'EUR' },
  },
  SORT_OPTIONS: ['-createdAt', '+createdAt', '+price', '-price']
};

export default config;