/**
 * Generates a CSS gradient background string based on the provided parameters.
 *
 * @param colorsParam - An array of color arrays, where each color is represented by an array of four numbers [R, G, B, A].
 * @param vectorParam - An optional number representing the angle in degrees for linear gradients.
 * @param variant - An optional string specifying the type of gradient, either 'linear' or 'radial'.
 * @param coordsParam - An optional array of two numbers specifying the x and y coordinates for the center of a radial gradient.
 * @returns A string representing the CSS gradient background.
 */
export function getBackground(
  colorsParam: number[][],
  vectorParam: number = 0,
  variant: 'linear' | 'radial' = 'linear',
  coordsParam: number[] = []
): string {
  if (!colorsParam || colorsParam.length <= 1) {
    return '#fff';
  }

  const gradientType = `${variant}-gradient`;

  const direction =
    variant === 'linear'
      ? `${vectorParam}deg,`
      : coordsParam.length === 2
        ? `circle at ${coordsParam[0]}px ${coordsParam[1]}px,`
        : '';

  const colors = colorsParam
    .map((color) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`)
    .join(', ');

  return `${gradientType}(${direction}${colors})`;
}

/**
 * Compares two arrays for equality, including nested arrays.
 *
 * @param arrA - The first array to compare. Optional.
 * @param arrB - The second array to compare. Optional.
 * @returns A boolean indicating whether the two arrays are equal.
 *          Returns true if both arrays are undefined or null.
 *          Performs a deep comparison for nested arrays.
 */
export function checkArrayEquality(
  arrA?: unknown[],
  arrB?: unknown[]
): boolean {
  if (!arrA || !arrB) return arrA === arrB;

  if (arrA.length !== arrB.length) return false;

  return arrA.every((item, index) => {
    const otherItem = arrB[index];

    if (Array.isArray(item) && Array.isArray(otherItem)) {
      return checkArrayEquality(item, otherItem);
    }

    return item === otherItem;
  });
}

/**
 * Converts a hex color string to an RGBA array.
 *
 * @param hex - A string representing a hex color.
 * @param alpha - An optional number representing the alpha value.
 * @returns An array of four numbers representing the RGBA values.
 */
function hexToRgba(hex: string, alpha = 1) {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b, alpha];
}

/**
 * Normalizes color values into an array of RGBA color arrays.
 *
 * @param colorsParam - An optional array of color arrays, where each color is represented by an array of four numbers [R, G, B, A].
 * @param hexColorsParam - An optional array of hex color strings.
 * @returns An array of RGBA color arrays.
 */
export function normalizeColors(
  colorsParam?: number[][],
  hexColorsParam?: string[]
) {
  if (!colorsParam && !hexColorsParam) {
    return [];
  }

  if (hexColorsParam) {
    const colorsResult: number[][] = [];

    hexColorsParam.forEach((item) => {
      const newColor = hexToRgba(item);
      colorsResult.push(newColor);
    });

    return colorsResult;
  }

  return colorsParam || [];
}
