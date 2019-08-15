import * as convert from 'color-convert';

export const getBackground = (colorsParam: number[][], vectorParam?: number, variant?: 'linear' | 'radial', coordsParam?: number[]) => {
  let background = '#fff';
  if (colorsParam && colorsParam.length > 1) {
    background = `${variant || 'linear'}-gradient(${variant !== 'radial' ? (vectorParam !== undefined ? vectorParam : 0) + 'deg,' : (coordsParam ? `circle at ${coordsParam[0]}px ${coordsParam[1]}px,` : '')}`;
    colorsParam.forEach((item, key) => {
      background += `rgba(${item[0]},${item[1]},${item[2]},${item[3]})` + (colorsParam[key + 1] !== undefined ? ',' : ')');
    });
  };
  return background;
};

export const checkArrayEquality = (ArrA?: any[], ArrB?: any[]) => {
  if (ArrA && ArrB) {
    if (ArrA.length !== ArrB.length) {
      return false;
    }
    ArrA.forEach((item: any, key: number) => {
      if (item[0] !== undefined && ArrB[key][0] !== undefined) {
        return checkArrayEquality(item, ArrB[key]);
      }
      if (item !== ArrB[key]) {
        return false;
      }
      return true;
    });
  };
  return true;
};

export const normalizeColors = (colorsParam: number[][] | undefined, hexColorsParam: string[] | undefined) => {
  let colorsResult: number[][] = [];
  if (colorsParam || hexColorsParam) {
    if (colorsParam) {
      colorsResult = colorsParam;
    }
    if (hexColorsParam) {
      hexColorsParam.forEach(item => {
        const newColor = convert.hex.rgb(item);
        newColor.push(1);
        colorsResult.push(newColor);
      })
    }
  };
  return colorsResult;
};