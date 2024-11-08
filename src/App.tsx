import Radial from './components/Radial';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: 500,
          marginTop: '50px',
        }}
      >
        Animated gradient
      </div>
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '26px',
          fontWeight: 500,
          marginTop: '30px',
        }}
      >
        <div
          style={{
            flex: '0 0 300px',
            height: '300px',
            border: '1px solid #3C3C3C',
            margin: '10px',
          }}
        >
          <Radial>Click me!</Radial>
        </div>
      </div>
    </div>
  );
}

export default App;
