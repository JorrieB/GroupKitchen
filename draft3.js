var foodItems = ["Salad", "Side Dish", "Main Course", "Dessert"];
var setDay;
var calendarIDs = ["#sundayCal","#mondayCal","#tuesdayCal","#wednesdayCal","#thursdayCal","#fridayCal","#saturdayCal"];

$(document).ready(function() {
    
//    Modal creator and parser
    function setupTable(){
        $(".scheduling-table").append("<thead><tr><th>Food Item</th><th>Quantity</th></thead><tbody class ='scheduling-body'></tbody>");
        
        for(var foodItem in foodItems){
            $(".scheduling-body").append("<tr><td>" + foodItems[foodItem] + "</td><td class='quantity_cell'><input type='text' class='form-control quantity-input' id='foodQuantity'></td></tr>");
        }
    }
    
    //takes a input string and outputs an integer array containing the hour and minute
	//INPUT: str representing the user's input
	//INPUT: pm: 1 if pm, 0 if am
	//THROWS: invalid input exception
	function timeParser(str, pm){
		str = str.replace(/\s+/g, '');
		var hour;
		var minute;
		
		console.log("in parser");
		
		if (str.match(/^[:0-9]+$/) == null){
			console.log("butts");
			throw "Improper time"
		}
		
		console.log("string is " + str.split(":"));
		if (str.indexOf(":") == -1) {
			hour = str;
			minute = "0";
		}else if (str.split(":").length == 2){
			hour = str.split(":")[0]
			minute = str.split(":")[1]
		} else {
			throw "Improper time"
		}
		
		
		if (!(parseInt(hour) >= 0 && parseInt(hour) < 24) && hour.length <= 2 && !(parseInt(hour) === NaN)){
			throw "Improper time";
		}
		
		if (!(parseInt(minute) >= 0 || parseInt(hour) < 60) && minute.length <= 2 && !(parseInt(minute) === NaN)){
			throw "Improper time";
		}
		
//		if (parseInt(hour) < 12 && pm == 1){
//			hour = parseInt(hour) + 12;
//			hour = hour.toString();
//		}
		
//		if (hour.length == 1){
//			hour = "0" + hour;
//		}
		if (minute.length == 1){
			minute = "0" + minute;
		}
		
		return hour + ":" + minute;
	}
	
    setupTable();
    
    $('#save-event-schedule').click(function() {
		var start = $("#pickup-start").val();
		var end = $("#pickup-end").val();
		$("#time_warning").css("display", "hidden");
		
		//check to make sure that the input gives integer hour or HH:MM format
		try {
			start = timeParser(start, $('#startPM').prop('checked'));
		} catch (err) {
			$("#time_warning").css("display", "inline");
		}
		
        var startPM = ($('#startPM').prop('checked')) ? 'pm':'am';
        var endPM = ($('#endPM').prop('checked')) ? 'pm':'am';
		//if no value entered for end, make end be 1 hour from start
		if (end == ''){
			var h = start.substr(0,2);
			var m = start.substr(2);
			end = ((parseInt(h)+1)%24).toString() + m
		}
		
		try{
			end = timeParser(end, $('#endPM').prop('checked'));
		} catch(err) {
			$("#time_warning").css("display", "inline");
		}
		
		var title = 'Food Pickup';
        var today = new Date();
        
        //retrieve the check boxes' data
        
        var dayArray = [$('#buttonSun').prop('checked'),$('#buttonMon').prop('checked'),$('#buttonTue').prop('checked'),$('#buttonWed').prop('checked'),$('#buttonThu').prop('checked'),$('#buttonFri').prop('checked'),$('#buttonSat').prop('checked')];
        
        for (var i = 0; i < dayArray.length; i++){
            if (dayArray[i]){
                $(calendarIDs[i]).append("<div class='event'><div class='eventHeader'><a href='#'><i class='fa fa-times eventDelete'></i></a></div><p>Pickup: "+start+startPM+"-"+end+endPM+"</p></div>");
            }
        }
        
		
//		if (dayArray.indexOf(true) == -1 ){
//			dayArray[today.getDay()] = true;
//		}
//		
//        var monthNumber;
//    
//        console.log(dayArray);
//        if (setDay == null) {
//			$("#daysOfWeek").css("display", "inline-block")
//			//console.log("setDay was null");
//			var dateBeingAdded = new Date();
//			for (var i = 0; i < 7; i++){
//				//the day we're on is checked, so we render an event
//				if (dayArray[i]){
//					if (today.getDay() > i){
//						dateBeingAdded.setDate(today.getDate() - today.getDay() + i + 7);
//					} else if (today.getDay() < i){
//						dateBeingAdded.setDate(today.getDate() - today.getDay() + i);
//					} else{
//						if (today.getHours() <= start){
//							dateBeingAdded.setDate(today.getDate() - today.getDay() + i);
//						} else {
//							dateBeingAdded.setDate(today.getDate() - today.getDay() + i + 7);
//						}
//					}
//
//					//make sure the month is formatted for the time stamp
//					monthNumber = (dateBeingAdded.getMonth()+1);
//					if(monthNumber < 10){
//						monthNumber = '0'+monthNumber.toString();
//					}
//					
//					var e = {
//						title: title,
//						start: dateBeingAdded.getFullYear()+'-'+monthNumber+'-'+dateBeingAdded.getDate()+'T'+start +':00',
//						end: dateBeingAdded.getFullYear()+'-'+monthNumber+'-'+dateBeingAdded.getDate()+'T'+end+':00'
//					};
//					
//					//console.log(e);
//					//render the event on the calendar
//					$('#tabcal').fullCalendar('renderEvent', e, true);
//
//				}
//			}
//		} else {
//			//console.log("setDay was not null");
//			$("#daysOfWeek").css("display", "none");
//			var e = {
//				title: title,
//				start: setDay + 'T'+start +':00',
//				end: setDay + 'T'+end +':00'
//			}
//			$('#tabcal').fullCalendar('renderEvent', e, true);
//		}
        
		
		//setDay format: "2015-04-20"
		
//        $('#buttonMon').prop('checked');
//        console.log();

		
//		var e = {
//			title: title,
//			start: "2015-4-15T1:00:00",
//			end: "2015-4-15T5:00:00"
//		};
//		
//		$('#tabcal').fullCalendar('renderEvent', e, true);
//        
        $('#scheduleModal').modal('toggle');
			
        
	});
	
	$(".fc-future").click(function(){
			setDay = $(this).data("date");
			console.log(setDay + "we set the day");
			$('#scheduleModal').modal('toggle');
			 
	});
    
//    End modal parser/creator
	
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
		$('#profile-hours').val($('#hours').html().replace('<br>', '\n'));
	});
	
	$('#save-event-profile').on('click', function() {
		var website = $('#profile-website').val();
		if (website.indexOf('http') == -1) {
			website = 'http://' + website.substring(website.indexOf('www'));
		}
		$('#website').text(website);
		$('#website').attr('href', website);
		$('#address').text($('#profile-address').val());
		$('#phone').text($('#profile-phone').val());
		$('#hours').html($('#profile-hours').val().replace('\n', '<br>'));
		$('#profileModal').modal('hide');
	})
	
	$("#save-event-schedule").on('click', function(){
		addPickup();
	});
    
    
    $(".eventDelete").click(function(event) {
        event.preventDefault();
        event.target.parentNode.parentNode.parentNode.remove(event.target.parentNode.parentNode);
        event.stopPropagation();
    });

});