var Plotly = require('kpmp-custom-plotly.js/lib/core.js');

// Custom plotly wrapper for individual chart includes

// Load in the trace types you need from lib
Plotly.register([
    require('kpmp-custom-plotly.js/lib/box'),
    require('kpmp-custom-plotly.js/lib/pointcloud'),
    require('kpmp-custom-plotly.js/lib/scatter'), // for bubble https://plotly.com/python/bubble-charts/
    require('kpmp-custom-plotly.js/lib/scattergl'),
    require('kpmp-custom-plotly.js/lib/violin'),
    require('kpmp-custom-plotly.js/lib/bar')
]);

module.exports = Plotly;
