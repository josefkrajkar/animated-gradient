## Animated gradient

This is a simple React component for state controlled animated gradient inside of the div element. Component is able to receive all the props and is fully stylable (But remember, that if you change the style of background-image, the gradient will not work).

To send colors to the component, use either prop colors (where you will send array of arrays of numbers as color channels - [r,g,b,alpha], for example: [255,43,12,0.5] for one color), or hexcolors, where you can define colors as array of strings ['ff0000', '009900'].

## Props

|  Prop  |  Required  |  Type  |  Description  |
| :--------: |:---------:| -----:| ---------------------|
|  colors  |  required *  |  number[][]  |  arrays of numbers representing color channels (rgba)  |
|  hexcolors  |  required *  |  string[]  |  array of strings representing hex values of colors  |
|  variant  |  not-required  |  linear / radial  |  variant of the used gradient  |
|  vector  |  not-required  |  number  |  vector of linear gradient  |
|  coords  |  not-required  |  number[]  |  X and Y coordinates of the center of radial gradient  |
|  timer  |  required  |  number  |  duration of the animation  |

* Either prop colors or hexcolors is required.

## Demo
Github: [link](https://github.com/josefkrajkar/animated-gradient-demo)
Live Example: [link](http://grandiose-activity.surge.sh/)
