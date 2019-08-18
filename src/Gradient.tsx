import * as React from 'react';

import {normalizeColors, getBackground, checkArrayEquality} from './helpers';

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
  private interval: number | undefined;
  private step: number[][] | undefined;
  private timer = 0;
  private colors: number[][] | undefined;
  private vector: number | undefined;
  private coords: number[] | undefined = [0,0];

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

        if (this.interval !== undefined) {
          window.clearInterval(this.interval);
          this.timer = 0;
        }

        this.colors = [...this.state.colors!];
        this.step = this.state.colors!.map((itemA: number[], keyA: number) => {
          return itemA.map((itemB: number, keyB: number) => {
            return (itemB - normalizeColors(this.props.colors, this.props.hexcolors)[keyA][keyB]) / (this.props.timer! / 10);
          })
        });
        this.vector = this.state.vector;
        this.coords = this.state.coords;

        this.interval = window.setInterval(() => {
          this.colors = this.colors!.map((itemA: number[], keyA: number) => {
            return itemA.map((itemB, keyB) => {
              return itemB - this.step![keyA][keyB]
            })
          });

          if (this.state.vector && this.props.vector) {
            this.vector = this.vector! - ((this.state.vector - this.props.vector) / (this.props.timer! / 10));
          }

          if (this.state.coords && this.props.coords) {
            this.coords = [this.coords![0] - ((this.state.coords[0] - this.props.coords[0]) / ((this.props.timer!) / 10)),this.coords![1] - ((this.state.coords[1] - this.props.coords[1]) / ((this.props.timer!) / 10))];
          }

          this.timer += 10;
          this.setState({...this.state, colors: this.colors, vector: this.vector, coords: this.coords});
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
    window.clearInterval(this.interval);
    this.interval = undefined;
    this.timer = 0;
    this.step = undefined;
    this.colors = undefined;
    this.vector = undefined;
    this.coords = [0,0]; 
  };

  public render() {

    if (this.timer === this.props.timer) {
      window.clearInterval(this.interval);
      this.interval = undefined;
      this.timer = 0;
      this.step = undefined;
      this.colors = undefined;
      this.vector = undefined;
      this.coords = [0,0];
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