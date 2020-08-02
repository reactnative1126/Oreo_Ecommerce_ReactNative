import clone from 'lodash/clone';
import fonts, {sizes, lineHeights} from 'src/components/config/fonts';

export const changeSize = (type) => {
  if (!sizes[type]) {
    return {};
  }
  const style = {
    fontSize: sizes[type],
    lineHeight: lineHeights[type]
  };
  return {
    div: clone(style),
    span: clone(style),
    p: clone(style),
    a: clone(style),
  }
};

export const changeFont = (type) => {
  if (!fonts[type]) {
    return {};
  }
  return {
    div: clone(fonts[type]),
    span: clone(fonts[type]),
    p: clone(fonts[type]),
    a: clone(fonts[type]),
  }
};

export const changeLineHeight = (number) => {
  const style = {
    lineHeight: number,
  };
  return {
    div: clone(style),
    span: clone(style),
    p: clone(style),
    a: clone(style),
  }
};

export const changeColor = (color) => {
  return {
    div: {color},
    span: {color},
    p: {color},
  }
};
