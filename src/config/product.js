export const VARIABLE = 'variable';
export const EXTERNAL = 'external';
export const GROUPED = 'grouped';
export const SIMPLE = 'simple';

export const productTypes = [VARIABLE, EXTERNAL, GROUPED, SIMPLE];

export const productListTypes = {
  latest: 'latest',
  best_sales: 'best_sales',
  custom: 'custom',
};

// export const productListLayout = {
//   default: 'default',
//   onecolumn: 'onecolumn',
//   twocolumns: 'twocolumns',
//   threecolumns: 'threecolumns',
//   grid: 'grid',
// };

export const productListLayout= {
  onecolumn: 'grid',
  twocolumns: 'carousel',
  threecolumns: 'carousel',
  grid: 'grid',
  list: 'list',
};

export const colProductLayout= {
  onecolumn: 1,
  twocolumns: 1.5,
  threecolumns: 2.5,
  grid: 2,
  list: 1,
};
