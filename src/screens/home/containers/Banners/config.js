
export const typeViewBanner = {
  one: 'gird',
  two: 'gird',
  three: 'gird',
  multiplecolumn: 'gird',
  carousel: 'scroll',
  flex: 'gird',
  row: 'scroll',
};

export const colBanner = (type, length) => {
  if (type === 'carousel' || type === 'multiplecolumn' || type === 'flex' || type === 'row') {
    return length > 0 ? length: 1;
  } else if (type === 'three') {
    return 3;
  } else if (type === 'two') {
    return 2;
  } else {
    return 1;
  }
};
