import React from 'react';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Gradient } from '../lib/main';

describe('Gradient component', () => {
  // Happy path
  it('should render a div with the correct gradient background when hexcolors are provided', () => {
    const { container } = render(
      <Gradient hexcolors={['#ff0000', '#00ff00']} timer={1000} />
    );
    const divElement = container.firstChild;
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveStyle({
      background: 'linear-gradient(rgb(255, 0, 0), rgb(0, 255, 0))',
    });
  });
  it('should update the gradient smoothly over the specified timer duration', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Gradient
        colors={[
          [255, 0, 0],
          [0, 255, 0],
        ]}
        timer={1000}
        variant="linear"
      />
    );
    const divElement = container.firstChild;
    expect(divElement).toBeInTheDocument();

    // Initial state
    expect(divElement).toHaveStyle(
      'background: linear-gradient(rgb(255, 0, 0), rgb(0, 255, 0))'
    );

    // Fast-forward time
    vi.advanceTimersByTime(500);

    // Check intermediate state
    // Assuming a linear interpolation halfway through
    expect(divElement).toHaveStyle(
      'background: linear-gradient(rgb(128, 128, 0), rgb(128, 128, 0))'
    );

    // Fast-forward to completion
    vi.advanceTimersByTime(500);

    // Final state
    expect(divElement).toHaveStyle(
      'background: linear-gradient(rgb(0, 255, 0), rgb(0, 255, 0))'
    );

    vi.useRealTimers();
  });
  it('should render a div with the correct gradient background when hexcolors are provided', () => {
    const { container } = render(
      <Gradient hexcolors={['#ff0000', '#00ff00']} timer={1000} />
    );
    const divElement = container.firstChild;
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveStyle(
      'background: linear-gradient(rgb(255, 0, 0), rgb(0, 255, 0))'
    );
  });

  // Edge cases
  it('should throw an error when neither colors nor hexcolors are provided', () => {
    expect(() => render(<Gradient timer={1000} />)).toThrow(
      'You must provide either colors or hexcolors prop'
    );
  });
});
