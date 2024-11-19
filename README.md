# Animated Gradient

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

A powerful and customizable React component that creates smooth, animated gradients for modern web applications. Perfect for creating dynamic, eye-catching backgrounds and UI elements.

## ✨ Features

- 🎨 Support for both RGB and HEX color formats
- 🔄 Smooth, customizable animations
- 📐 Linear and radial gradient variants
- 🎯 Configurable gradient positioning
- 💪 TypeScript support
- 🎮 Full control over animation timing
- 🎯 Fully stylable with standard div props

## 🚀 Installation

```bash
npm install animated-gradient
# or
yarn add animated-gradient
```

## 📖 Usage

### Basic Example

```tsx
import { Gradient } from 'animated-gradient';

// Using RGB colors
const RGBExample = () => (
  <Gradient
    colors={[
      [255, 0, 0, 1], // Red
      [0, 255, 0, 1], // Green
      [0, 0, 255, 1], // Blue
    ]}
    timer={3000}
  >
    Content goes here
  </Gradient>
);

// Using HEX colors
const HEXExample = () => (
  <Gradient hexcolors={['ff0000', '00ff00', '0000ff']} timer={3000}>
    Content goes here
  </Gradient>
);
```

### Advanced Example

```tsx
import { Gradient } from 'animated-gradient';

const AdvancedExample = () => (
  <Gradient
    hexcolors={['ff0000', '00ff00', '0000ff']}
    variant="radial"
    coords={[50, 50]} // Center position
    timer={5000}
    style={{
      width: '300px',
      height: '300px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h1>Dynamic Background</h1>
  </Gradient>
);
```

## 📚 Props

| Prop      | Required   | Type                 | Description                                                |
| :-------- | :--------- | :------------------- | :--------------------------------------------------------- |
| colors    | required\* | number[][]           | Arrays of RGBA color channels (e.g., `[255, 43, 12, 0.5]`) |
| hexcolors | required\* | string[]             | Array of HEX color values (e.g., `['ff0000', '009900']`)   |
| variant   | optional   | 'linear' \| 'radial' | Type of gradient. Defaults to 'linear'                     |
| vector    | optional   | number               | Direction angle for linear gradient                        |
| coords    | optional   | number[]             | Center coordinates [x, y] for radial gradient              |
| timer     | required   | number               | Animation duration in milliseconds                         |

\* Either `colors` or `hexcolors` is required.

## 🛠️ Development

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```

## 🔍 Examples

Check out these live examples:

- [Demo Repository](https://github.com/josefkrajkar/animated-gradient-demo)
- [Live Example](https://green-world.surge.sh/)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## 📄 License

MIT License - feel free to use this component in your projects.
