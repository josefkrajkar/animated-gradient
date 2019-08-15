import * as React from 'react';
import * as convert from 'color-convert';

const normalizeColors = (colorsParam: number[][], hexColorsParam: string[]) => {
  let colorsResult: number[][] = []
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
  return colorsResult;
}

const getBackground = (colorsParam: number[][], vectorParam?: number, variant?: 'linear' | 'radial', coordsParam?: number[]) => {
  let background = '#fff';
  if (colorsParam && colorsParam.length > 1) {
    background = `${variant || 'linear'}-gradient(${variant !== 'radial' ? (vectorParam !== undefined ? vectorParam : 0) + 'deg,' : (coordsParam ? `circle at ${coordsParam[0]}px ${coordsParam[1]}px,` : '')}`;
    colorsParam.forEach((item, key) => {
      background += `rgba(${item[0]},${item[1]},${item[2]},${item[3]})` + (colorsParam[key + 1] !== undefined ? ',' : ')');
    });
  };
  return background;
};

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
}

interface State {
  colors: number[][] | undefined;
  vector?: number;
  variant?: 'linear' | 'radial';
  coords?: number[];
}

export default (props: Props & any) => {
  const [state, setState]: [State, (newState: any) => void] = React.useState({
    colors: normalizeColors(props.colors, props.hexcolors),
    vector: props.vector,
    variant: props.variant,
    coords: props.coords,
  })

  React.useEffect(() => {
    const newColors = normalizeColors(props.colors, props.hexcolors);
    if (
      state.colors !== newColors ||
      state.vector !== props.vector ||
      state.coords !== props.coords
    ) {

      if (props.timer) {

        if (interval !== undefined) {
          window.clearInterval(interval);
          timer = 0;
        }

        colors = [...state.colors!];
        step = state.colors!.map((itemA: number[], keyA: number) => {
          return itemA.map((itemB: number, keyB: number) => {
            return (itemB - newColors[keyA][keyB]) / (props.timer! / 10);
          })
        });
        vector = state.vector;
        coords = state.coords;

        interval = window.setInterval(() => {
          colors = colors!.map((itemA: number[], keyA: number) => {
            return itemA.map((itemB, keyB) => {
              return itemB - step![keyA][keyB]
            })
          });

          if (state.vector && props.vector) {
            vector = vector! - ((state.vector - props.vector) / (props.timer! / 10));
          }

          if (state.coords && props.coords) {
            coords = [coords![0] - ((state.coords[0] - props.coords[0]) / ((props.timer!) / 10)),coords![1] - ((state.coords[1] - props.coords[1]) / ((props.timer!) / 10))];
          }

          timer += 10;
          setState({...state, colors, vector, coords});
        }, 10);

      } else {
        setState({
          ...state,
          colors: newColors,
          vector: props.vector,
          coords: props.coords
        })
      }
    }
  },[state, props.colors, props.hexColors, props.vector, props.coords, props.timer]);

  if (timer === props.timer) {
    window.clearInterval(interval);
    interval = undefined;
    timer = 0;
    step = undefined;
    colors = undefined;
    vector = undefined;
    coords = [0,0];
  }

  return (
    <div {...props} style={{
      ...props.style,
      background: getBackground(state.colors!, state.vector, state.variant, state.coords)
    }}>
      {
        props.children
      }
    </div>
  );
};