import { describe, it, expect } from 'vitest';
import {
  normalizeColors,
  hexToRgba,
  checkArrayEquality,
  getBackground,
} from '../lib/utils/helpers';

describe('normalizeColors function', () => {
  // Happy path
  it('should convert hex color strings to RGBA format when valid hex colors are provided', () => {
    const hexColors = ['#ff5733', '#33ff57'];
    const expected = [
      [255, 87, 51, 1],
      [51, 255, 87, 1],
    ];
    const result = normalizeColors(undefined, hexColors);
    expect(result).toEqual(expected);
  });
  it('should return an empty array when both parameters are undefined', () => {
    const result = normalizeColors();
    expect(result).toEqual([]);
  });
  it('should return colorsParam when hexColorsParam is undefined', () => {
    const colorsParam = [
      [255, 0, 0, 1],
      [0, 255, 0, 1],
    ];
    const result = normalizeColors(colorsParam, undefined);
    expect(result).toEqual(colorsParam);
  });

  // Edge cases
  it('should return NaN values in RGBA format when invalid hex colors are provided', () => {
    const hexColors = ['#zzzzzz', '#test'];
    const expected = [
      [NaN, NaN, NaN, 1],
      [NaN, NaN, NaN, 1],
    ];
    const result = normalizeColors(undefined, hexColors);
    expect(result).toEqual(expected);
  });
});

describe('hexToRgba function', () => {
  // Happy path
  it('should convert a valid 6-character hex color code to RGBA format', () => {
    const hex = '#ff5733';
    const expectedRgba = [255, 87, 51, 1];
    const result = hexToRgba(hex);
    expect(result).toEqual(expectedRgba);
  });
  it('should default alpha to 1 when not provided', () => {
    const hex = '#abcdef';
    const expectedRgba = [171, 205, 239, 1];
    const result = hexToRgba(hex);
    expect(result).toEqual(expectedRgba);
  });
  it('should return correct RGBA array when hex color code has a leading "#"', () => {
    const hex = '#1a2b3c';
    const expectedRgba = [26, 43, 60, 1];
    const result = hexToRgba(hex);
    expect(result).toEqual(expectedRgba);
  });

  // Edge cases
  it('should return NaN values when given an invalid hex string', () => {
    const invalidHex = '#zzzzzz';
    const result = hexToRgba(invalidHex);
    expect(result).toEqual([NaN, NaN, NaN, 1]);
  });
});

describe('checkArrayEquality function', () => {
  // Happy path
  it('should return true when both arrays are identical', () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2, 3];
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(true);
  });
  it('should return false when arrays have different lengths', () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2];
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(false);
  });
  it('should return true when both arrays are undefined', () => {
    const arrA = undefined;
    const arrB = undefined;
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(true);
  });
  it('should return true for identical nested arrays', () => {
    const arrA = [1, [2, 3], [4, [5, 6]]];
    const arrB = [1, [2, 3], [4, [5, 6]]];
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(true);
  });
  it('should return false when nested arrays differ at any level', () => {
    const arrA = [1, [2, 3], 4];
    const arrB = [1, [2, 4], 4];
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(false);
  });

  // Edge cases
  it('should return false when one array is undefined and the other is not', () => {
    const arrA = undefined;
    const arrB = [1, 2, 3];
    const result = checkArrayEquality(arrA, arrB);
    expect(result).toEqual(false);
  });
});

describe('getBackground function', () => {
  // Happy path
  it('should return a linear gradient with default vector when only colors are provided', () => {
    const colors = [
      [255, 0, 0, 1],
      [0, 255, 0, 1],
    ];
    const result = getBackground(colors);
    expect(result).toBe(
      'linear-gradient(0deg,rgba(255, 0, 0, 1), rgba(0, 255, 0, 1))'
    );
  });
  it('should return a radial gradient with specified coordinates when variant is radial', () => {
    const colors = [
      [255, 0, 0, 1],
      [0, 255, 0, 1],
    ];
    const coords = [50, 50];
    const result = getBackground(colors, 0, 'radial', coords);
    expect(result).toBe(
      'radial-gradient(circle at 50px 50px,rgba(255, 0, 0, 1), rgba(0, 255, 0, 1))'
    );
  });
  it('should return a linear gradient with specified vector and colors', () => {
    const colors = [
      [255, 0, 0, 0.5],
      [0, 255, 0, 0.75],
    ];
    const vector = 45;
    const result = getBackground(colors, vector);
    expect(result).toBe(
      'linear-gradient(45deg,rgba(255, 0, 0, 0.5), rgba(0, 255, 0, 0.75))'
    );
  });
  it('should return a linear gradient with specified vector and multiple colors', () => {
    const colors = [
      [255, 0, 0, 1],
      [0, 255, 0, 1],
      [0, 0, 255, 1],
    ];
    const vector = 45;
    const result = getBackground(colors, vector);
    expect(result).toBe(
      'linear-gradient(45deg,rgba(255, 0, 0, 1), rgba(0, 255, 0, 1), rgba(0, 0, 255, 1))'
    );
  });

  // // Edge cases
  it('should return white color when colorsParam is empty or has one color', () => {
    const emptyColors = [];
    const singleColor = [[255, 255, 255, 1]];
    expect(getBackground(emptyColors)).toEqual('#fff');
    expect(getBackground(singleColor)).toEqual('#fff');
  });
});
