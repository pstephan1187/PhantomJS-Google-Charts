/*
 * Copyright 2014 Patrick Stephan <pstephan1187@gmail.com>
 * PhantomJS GoogleCharts Module
 * 
 * The purpose of this module is to generate Google Charts
 * and return the generated SVG data.
 * 
 * This module is free to use both commercially and personally.
 * Attribution is not necessary. You may use this software
 * however you like so long as you don't sell it as-is. This
 * software is licensed under the 
 * 
 * 
 * BY USING THIS SOFTWARE, YOU AGREE TO GOOGLE'S TERMS OF USE
 * FOR THE GOOGLE CHARTS JAVASCRIPT APIS FOUND HERE:
 * https://google-developers.appspot.com/chart/terms
 * 
 * Currently Supported Chart Types:
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
 * 
 */

exports.generateChart = function(jsonData, callback){
	var page = require('webpage').create();
	
	//create a viewport size
	page.viewportSize = {width: jsonData.options.width, height: jsonData.options.height};
	
	//create and html document with jquery and the Google JSAPI and Visualization scripts all loaded
	page.content = '<html><head><title></title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script><script src="https://www.google.com/jsapi"></script><script>google.load("visualization", "1.0", {"packages":["corechart"]});</script></head><body><div id="chart">Chart did not generate</div></body></html>';
	
	//once the page is loaded, run the generation process
	page.onLoadFinished = function(){
		info = page.evaluate(function(jsonData){
			var chartData = new google.visualization.DataTable();
			
			switch(jsonData.type){
				case 'AreaChart':
				case 'BarChart':
				case 'BubbleChart':
				case 'CandlestickChart':
				case 'ColumnChart':
				case 'Histogram':
				case 'LineChart':
				case 'ScatterChart':
				case 'SteppedAreaChart':
					if(typeof jsonData.datatable != undefined){
						chartData = google.visualization.arrayToDataTable(jsonData.datatable);
					}
				break;
				case 'PieChart':
				case 'Sankey':
					if(typeof jsonData.columns == 'array' || typeof jsonData.columns == 'object'){
						for(var i in jsonData.columns){
							chartData.addColumn(jsonData.columns[i], i);
						}
					}
					
					if(typeof jsonData.rows == 'array' || typeof jsonData.rows == 'object'){
						for(var i in jsonData.rows){
							chartData.addRows([[i, jsonData.rows[i]]]);
						}
					}
				break;
			}
			
			var options = jsonData.options;
			
			// Instantiate and draw our chart, passing in some options.
			//var chart = new google.visualization.PieChart(document.getElementById('chart'));
			var chart = new google.visualization[jsonData.type](document.getElementById('chart'));
			chart.draw(chartData, options);
			
			
			//return $('#chart').html();
			
			var serializer = new XMLSerializer();
			return serializer.serializeToString($('#chart svg')[0]);
		}, jsonData);
		
		if(typeof callback === 'function'){
			callback(info);
		}
	}
}
