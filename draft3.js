$(document).ready(function() {
	var dataset = [2, 3, 3, 1, 1, 2, 3];
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	var width = $('#history')[0].offsetWidth;
	var height = 150;
	var padding = 10;
	
	/*
	The graph shows, but I'm having trouble with the axes.
	Refer to this page for tutorial: http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5
	*/
	var x = d3.scale.ordinal()
					.domain(days)
					.rangeRoundBands([0, width], .1);
	
	var y = d3.scale.linear()
					.range([Math.max(dataset), 0]);
    
    console.log(y);
	
	var xAxis = d3.svg.axis()
					  .scale(x)
					  .orient('bottom');
					  
	var yAxis = d3.svg.axis()
					  .scale(y)
					  .orient('left');
	
	var svg = d3.select('#history')
				.append('svg')
				.attr('width', width)
				.attr('height', height);
	
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 100 + ")")
        .call(xAxis);

//    svg.append("g")
//        .attr("class", "y axis")
//        .call(yAxis);

	svg.selectAll('rect')
	   .data(dataset)
	   .enter()
       .append('rect')
	   .attr('class', 'bar')
       .attr('x', function(d, i) {
		   return i * (width / dataset.length);
	   })
       .attr('y', function(d) {
		   return height - (d * 30) - 50;
	   })
       .attr('width', (width / dataset.length) - padding)
       .attr('height', function(d) {
		   return d * 30;
	   });
});