import { useEffect, useRef } from 'react';
import {
  normalizeColors,
  getBackground,
  checkArrayEquality,
} from '../utils/helpers';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  colors?: number[][];
  hexcolors?: string[];
  vector?: number;
  variant?: 'linear' | 'radial';
  coords?: number[];
  timer: number;
}

let currentColors: number[][] = [];
let currentVector: number | undefined;
let currentCoords: number[] | undefined;

export function Gradient(props: Props) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const { colors, hexcolors, vector, variant, coords, timer, ...restProps } =
    props;

  if (!colors && !hexcolors) {
    throw new Error('You must provide either colors or hexcolors prop');
  }

  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;
    currentColors = normalizeColors(colors, hexcolors);
    currentVector = vector;
    currentCoords = coords;

    element.style.background = getBackground(
      currentColors,
      currentVector,
      variant,
      currentCoords
    );
  }, []);

  useEffect(() => {
    const newColors = normalizeColors(colors, hexcolors);
    const newVector = vector;
    const newCoords = coords;

    if (
      !gradientRef.current ||
      (checkArrayEquality(currentColors, newColors) &&
        checkArrayEquality(currentCoords, newCoords) &&
        currentVector === newVector)
    )
      return;

    let start: number | undefined;
    let animationFrameId: number | undefined;

    function step(timestamp: number) {
      if (!start) {
        start = timestamp;
      }
      const elapsed = timestamp - start;

      const element = gradientRef.current;
      if (!element) return;

      const colorSteps = newColors.map((color, index) => {
        const currentColor = currentColors[index];
        return color.map((c, i) => {
          const diff = c - currentColor[i];
          return currentColor[i] + (diff * elapsed) / timer;
        });
      });

      const vectorStep =
        (currentVector || 0) +
        (((newVector || 0) - (currentVector || 0)) * elapsed) / timer;

      const coordsStep = newCoords?.map((coord, index) => {
        const currentCoord = currentCoords?.[index] || 0;
        return currentCoord + ((coord - currentCoord) * elapsed) / timer;
      });

      element.style.background = getBackground(
        colorSteps,
        vectorStep,
        variant,
        coordsStep
      );

      if (elapsed < timer) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId!);
      currentColors = newColors;
      currentVector = newVector;
      currentCoords = newCoords;
    };
  }, [colors, hexcolors, vector, coords, timer, variant]);

  return (
    <div {...restProps} ref={gradientRef}>
      {restProps.children}
    </div>
  );
}
