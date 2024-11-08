import * as React from 'react';
import { Gradient } from '../../';

function Radial(props: { children: string }) {
  const [state, setState] = React.useState({
    colors: [
      ['ffffff', 'ffffff'],
      ['00ff00', 'ff0000'],
      ['ff0000', '0000ff'],
    ],
    coords: [
      [0, 0],
      [400, 0],
      [0, 400],
    ],
    textColors: ['#000', '#fff', '#fff'],
    active: 0,
  });

  return (
    <Gradient
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      timer={500}
      hexcolors={state.colors[state.active]}
      variant="radial"
      coords={state.coords[state.active]}
      onMouseEnter={() => setState({ ...state, active: 1 })}
      onMouseLeave={() => setState({ ...state, active: 0 })}
      onClick={() => setState({ ...state, active: state.active === 1 ? 2 : 1 })}
    >
      <div
        style={{
          transition: '300ms ease-in-out',
          color: state.textColors[state.active],
        }}
      >
        {props.children}
      </div>
    </Gradient>
  );
}

export default Radial;
