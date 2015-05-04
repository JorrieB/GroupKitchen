$(document).ready(function() {
	
	//TODO: MAKE THIS WORK
	//Called when the "save changes" button is clicked on the scheduling modal and populates the calendar with the pickup
	function addPickup() {
		var dayArray = [$('#buttonSun').prop('checked'),$('#buttonMon').prop('checked'),$('#buttonTue').prop('checked'),$('#buttonWed').prop('checked'),$('#buttonThu').prop('checked'),$('#buttonFri').prop('checked'),$('#buttonSat').prop('checked')];
		console.log(dayArray + " beep boop");
	}
	
	var dataset = [2, 3, 3, 1, 1, 2, 3];
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	var outer_width = $('#history')[0].offsetWidth;
	var outer_height = 150;
	var padding = 10;      
    
    var margin = { top: 10, right: 10, bottom: 10, left: 10 }
    var width = outer_width - margin.left - margin.right;
    var height = outer_height -margin.top - margin.bottom;
    
	/*
	The graph shows, but I'm having trouble with the axes.
	Refer to this page for tutorial: http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5
	*/
	var x = d3.scale.ordinal()
					.domain(days)
					.rangeRoundBands([0, width], .1);
	
	var y = d3.scale.linear()
					.range([height, 0]);

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

    var tip = d3.tip().attr('class', 'd3-tip')
      .html(function(d) {
        return "Meals: <span style='color:red'>" + d + "</span>";
      })
    
    svg.call(tip);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 100 + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	svg.selectAll('rect')
	   .data(dataset)
	   .enter()
       .append('rect')
	   .attr('class', 'bar')
       .attr('x', function(d, i) {
		   return i * (width / dataset.length);
	   })
       .attr('y', function(d) {
		   return height - ((d+1) * 30);
	   })
       .attr('width', (width / dataset.length) - padding)
       .attr('height', function(d) {
		   return d * 30;
	   })
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide);
	   

	$('#profileModal').on('shown.bs.modal', function() {
		$('#profile-website').val($('#website').text());
		$('#profile-address').val($('#address').text());
		$('#profile-phone').val($('#phone').text());
		$('#profile-hours').val($('#hours').text().trim());
	});
	
	$('#save-event-profile').on('click', function() {
		$('#website').text($('#profile-website').val());
		$('#address').text($('#profile-address').val());
		$('#phone').text($('#profile-phone').val());
		$('#profile-hours').text($('#profile-hours').val());
		$('#profileModal').modal('hide');
	})
	
	$("#save-event-schedule").on('click', function(){
		addPickup();
	});

});