# svg2js-webpack-plugin
A webpack plugin to import SVG images from JS

## Installation
```
npm i --save-dev git+https://git@github.com/filmin/svg2js-webpack-plugin.git
```

## Usage
All you have to do is to add the plugin to your webpack.config.js:
```js
const SVG2JS = require('svg2js-webpack-plugin');

new SVGToJS({
    src: 'resources/assets/svg',
    dest: 'resources/assets/js/svg.js',
    watch: {
        pattern: 'resources/assets/svg/**/*.svg'
    }
})
```
In your js files
```js
// import the generated file
import {svg, collection} from './svg';

// get the SVG code for the image named `my-image.svg` inside the `src` folder.
var myImage = svg('my-image');

//contains a key/value object with all images found inside the `src` folder.
var allSVGImages = collection;

```

## TODO
- Make it available in npmjs.org
- Allow nested folders in `src`


## References
Inspired by https://github.com/douglasdc3/laravel-mix-svg
