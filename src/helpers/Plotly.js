var Plotly = require('plotly.js/lib/core.js');

// Custom plotly wrapper for individual chart includes

// Load in the trace types you need from lib
Plotly.register([
    require('plotly.js/lib/box'),
    require('plotly.js/lib/pointcloud'),
    require('plotly.js/lib/scatter'), // for bubble https://plotly.com/python/bubble-charts/
    require('plotly.js/lib/scattergl'),
    require('plotly.js/lib/violin'),
]);

module.exports = Plotly;
