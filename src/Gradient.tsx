import * as React from 'react';

import {normalizeColors, getBackground, checkArrayEquality} from './helpers';

let step: number[][] | undefined;
let timer = 0;
let interval: number | undefined;
let colors: number[][] | undefined;
let vector: number | undefined;
let coords: number[] | undefined = [0,0];

interface Props {
  colors?: number[][];
  hexcolors?: string[];
  vector?: number;
  variant?: 'linear' | 'radial';
  coords?: number[];
  timer?: number;
  style?: React.CSSProperties;
}

interface State {
  colors: number[][] | undefined;
  vector?: number;
  variant?: 'linear' | 'radial';
  coords?: number[];
}

export default class Gradient extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      colors: normalizeColors(props.colors, props.hexcolors),
      vector: props.vector,
      variant: props.variant,
      coords: props.coords,
    }
  }

  public componentDidUpdate() {
    // const newColors = normalizeColors(props.colors, props.hexcolors);
    if (
      !checkArrayEquality(this.state.colors,normalizeColors(this.props.colors, this.props.hexcolors)) ||
      this.state.vector !== this.props.vector ||
      this.state.coords !== this.props.coords
    ) {
      if (this.props.timer) {

        if (interval !== undefined) {
          window.clearInterval(interval);
          timer = 0;
        }

        colors = [...this.state.colors!];
        step = this.state.colors!.map((itemA: number[], keyA: number) => {
          return itemA.map((itemB: number, keyB: number) => {
            return (itemB - normalizeColors(this.props.colors, this.props.hexcolors)[keyA][keyB]) / (this.props.timer! / 10);
          })
        });
        vector = this.state.vector;
        coords = this.state.coords;

        interval = window.setInterval(() => {
          colors = colors!.map((itemA: number[], keyA: number) => {
            return itemA.map((itemB, keyB) => {
              return itemB - step![keyA][keyB]
            })
          });

          if (this.state.vector && this.props.vector) {
            vector = vector! - ((this.state.vector - this.props.vector) / (this.props.timer! / 10));
          }

          if (this.state.coords && this.props.coords) {
            coords = [coords![0] - ((this.state.coords[0] - this.props.coords[0]) / ((this.props.timer!) / 10)),coords![1] - ((this.state.coords[1] - this.props.coords[1]) / ((this.props.timer!) / 10))];
          }

          timer += 10;
          this.setState({...this.state, colors, vector, coords});
        }, 10);

      } else {
        this.setState({
          ...this.state,
          colors: normalizeColors(this.props.colors, this.props.hexcolors),
          vector: this.props.vector,
          coords: this.props.coords
        })
      }
    }
  };

  componentWillUnmount() {
    window.clearInterval(interval);
    interval = undefined;
    timer = 0;
    step = undefined;
    colors = undefined;
    vector = undefined;
    coords = [0,0]; 
  };

  public render() {

    if (timer === this.props.timer) {
      window.clearInterval(interval);
      interval = undefined;
      timer = 0;
      step = undefined;
      colors = undefined;
      vector = undefined;
      coords = [0,0];
    }

    return (
      <div {...this.props} style={{
        ...this.props.style,
        background: getBackground(this.state.colors!, this.state.vector, this.state.variant, this.state.coords)
      }}>
        {
          this.props.children
        }
      </div>
    );
  };
};