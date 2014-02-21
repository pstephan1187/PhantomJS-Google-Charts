PhantomJS-Google-Charts
=======================

PhantomJS-Google-Charts is a PantomJS module for creating Google charts SVG/HTML on the server. By passing a JSON object with the necessary data, the module will create an html file, create the chart, retrieve the svg data, and return it.

###A Brief History

I was enlisted to create a project that required embedding charts into a PDF and on a website. After overviewing many different javascript charting libraries for the website, I eventually went with Google charts. I, however, could not find a suitable php charting library for the demands of the software. I started exploring ways to gather the SVG data from the generate Google charts and injecting it into a PDF. I explored many different methods but none of them suited me well. So I decided to develop my own method. With this module, you simply pass the configuration in JSON form, the module spits back the SVG and voila, no weird client side hacks needed.

###Usage

The module has one method:
```Javascript
GC.generateChart(jsonConfig, callback);
```

You pass the JSON encoded configuration as the first argument and a callback that takes one argument as the second argument. The SVG is passed to the callback.

Here is an example:
```Javascript
var GC = require('./googleCharts.js');

var jsonData = {
	"type": "PieChart",
	"options": {
		"title": "Type of Fruit Eaten",
		"width": "400",
		"height": "300",
		"is3D": true,
		"pieSliceText": "value"
	},
	"columns": {
		"Type": "string",
		"Eaten": "number"
	},
	"rows": {
		"Bananas": 4,
		"Apples": 2,
		"Oranges": 6,
		"Mangoes": 3
	}
	
};

GC.generateChart(jsonData, function(svgHtml){
	console.log(svgHtml);
	phantom.exit();
});
```

The SVG for the chart created by Google's JSAPI is returned to the callback and printed to the REPL (or returned to whatever program called this file) and then the program is ended.

Information on Google's Charts JSAPI is found here: https://developers.google.com/chart/
Any of the options available in the JSAPI for supported charts can be used in this module. Currently supported Charts include:
 * Area
 * Bar
 * Bubble
 * Candlestick
 * Column
 * Histogram
 * Intervals (This is really a line chart with a specific option)
 * Line
 * Pie
 * Scatter
 * SteppedArea
 * Sankey (Google says this is likely to change in the future. At that time, it may break in this script)
 * 

If you would like to contribute to this project feel free to make a pull request or let me know of any bugs you find.
