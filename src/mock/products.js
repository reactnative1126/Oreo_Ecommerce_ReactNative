export const productSimple = {
  id: 100,
  type: 'simple',
  price: '18',
  regular_price: '20',
  sale_price: '18',
  'multi-currency-prices': {
    VND: {
      regular_price: 400000,
      sale_price: 360000,
    },
    EUR: {
      regular_price: 16,
      sale_price: 14.4,
    },
  },
};

export const productSimple2 = {
  id: 101,
  type: 'simple',
  price: '18',
  regular_price: '18',
  sale_price: '',
  'multi-currency-prices': {
    VND: {
      regular_price: 360000,
    },
    EUR: {
      regular_price: 14.4,
    },
  },
};

export const productVariation = {
  id: 200,
  type: 'variable',
  price: '34',
  regular_price: '',
  sale_price: '',
  'multi-currency-prices': {
    VND: {
      regular_price: 0,
    },
    EUR: {
      regular_price: 0,
    },
  },
  'from-multi-currency-prices': {
    VND: {
      price: 680000,
    },
    EUR: {
      price: 27.2,
    },
  },
};

export const productGrouped = {
  id: 300,
  type: 'grouped',
  price: '18',
  regular_price: '',
  sale_price: '',
  'multi-currency-prices': {
    VND: {
      regular_price: 0,
    },
    EUR: {
      regular_price: 0,
    },
  },
  'from-multi-currency-prices': {
    VND: {
      price: 360000,
    },
    EUR: {
      price: 14.4,
    },
  },
};

export const productExternal = {
  id: 400,
  type: 'external',
  price: '11.05',
  regular_price: '11.05',
  sale_price: '',
  'multi-currency-prices': {
    VND: {
      regular_price: 221000,
    },
    EUR: {
      regular_price: 8.84,
    },
  },
};
