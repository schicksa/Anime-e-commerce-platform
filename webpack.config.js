// "build": "webpack --config webpack.config.js",
const path = require('path');

module.exports = {
   entry: './src/main.js',
   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js'
   }
};