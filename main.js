var foodItems = ["Salad", "Side Dish", "Main Course", "Dessert"];
var setDay;
var calendarIDs = ["#sundayCal","#mondayCal","#tuesdayCal","#wednesdayCal","#thursdayCal","#fridayCal","#saturdayCal"];
var rawCalendarIDs = ["sundayCal","mondayCal","tuesdayCal","wednesdayCal","thursdayCal","fridayCal","saturdayCal"];
var abbrDates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var calButtons = ['#buttonSun','#buttonMon','#buttonTue','#buttonWed','#buttonThu','#buttonFri','#buttonSat'];

function fillFuturePickups(){
    $('.futureList').empty();
    var date = new Date();
    var todayIndex = date.getDay();

    for(var i = 0; i < 7-todayIndex-1; i++){
        var pickup = $(".future").eq(i)[0];

        var foodsForPickup = $(pickup).children().children('.event').children('.eventHeader');

        
        var dayIndex = todayIndex + i+1;
        
        var dayFormatted = $("#days").children().eq(dayIndex).html();

        for( var index =0; index < foodsForPickup.length; index ++){
            var foodForPickup = $(foodsForPickup[index]).html();

            if(foodForPickup){
				var newListElement = "<li>On: "+dayFormatted+", "+foodForPickup+"</li>";
            $('.futureList').append(newListElement);
            }
        }
    }
}

/**function addFuturePickup(date, foodstring){
	 var newListElement = "<li>On: "+date+", "+foodstring+"</li>";
     $('.futureList').append(newListElement);
} 

//parses the date from the user's input
function dateParser(d){
	var monthDict = {'jan':1, 'feb':2, 'mar':3, 'apr':4, 'may':5, 'jun':6, 'jul':7, 'aug':8, 'sep':9, 'oct':10, 'nov':11, 'dec':12}
	var monthToString = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"}
	d = d.replace(',', '');
	if ((d.indexOf('-')==-1)&&(d.indexOf('/')==-1)){
		d = d.split(" ");
		var day = d[1];
		if (d.length <2 || d.length>3){
			throw "Improper date"
		}
		var month = d[0];
		if (isNaN(month)){
			monthstring = month.substring(0,3).toLowerCase();
			console.log(monthstring + " is the monthstring");
			if (monthstring in monthDict) {
				monthnum = monthDict[monthstring];
			} else{
				throw "Improper date"
			}
		} else {
			monthnum = month;
		}
		if (monthnum in monthToString){
			displaymonth = monthToString[monthnum]
		} else {
			throw "Improper date"
		}
		if (d.length == 3){
			var year = d[2]
		} else{
			var year = ''
		}
	}else{
		d = d.replace('/','-');
		d = d.replace('/','-');
		d = d.split('-');
		var day = d[1];
		if (d.length < 2 || d.length > 3){
			throw "Improper date"
		}
		var month = parseInt(d[0])
		console.log("month is " + month);
		if (month in monthToString){
			var displaymonth = monthToString[month]
		} else {
			throw "Improper date"
		}
		if (d.length == 3){
			var year = d[2]
		} else{
			var year = ''
		}
	}
	
	if ((year != '') &&(year < 2015 || year >2020)){
		throw "Improper date"
	}
	
	if (year == ''){
		yearstring = year;
	} else{
		yearstring = ', ' + year.toString();
	}
	
	console.log("date being returned is " + displaymonth + ' ' + day.toString(day) + yearstring);
	
	return monthstring + ' ' + day.toString(day) + yearstring;
} **/

function fillTodaysPickup(){
    $('.todayList').empty();
    var date = new Date();
    var todayIndex = date.getDay();

    var pickup = $(".pickup").eq(todayIndex)[0];
    var foodsForPickup = $(pickup).children().children('.event').children('.eventHeader');
    var pickupTimes = $(pickup).children().children('.event').children('p');
    
    for( var index =0; index < foodsForPickup.length; index ++){
        var pickupTime = $(pickupTimes[index]).html();
        var foodForPickup = $(foodsForPickup[index]).html();
        
        if(foodForPickup){
            var newListElement = "<li>From: "+pickupTime+", "+foodForPickup+"<span class='icons'><a class = 'editButton edit"+index+"' data-pickupNum="+index+" href='#'><i class='fa fa-pencil'></i></a><a class = 'deleteButton delete"+index+"' data-pickupNum="+index+" href='#'><i class='fa fa-times'></i></a></span></li>";
            $('.todayList').append(newListElement);
        }
    }
    
    $(".deleteButton").on("click",function(){
        var index = $(this).data().pickupnum;
        deleteTodaysPickup(index);
    });
    
    $('.editButton').on("click",function(){
        var index = $(this).data().pickupnum;
        editTodaysPickup(index);
    });

}

function editTodaysPickup(index){
    $('#scheduleModal').modal('toggle');
    deleteTodaysPickup(index);
    
    var date = new Date();
    var todayIndex = date.getDay();
        
    $(calButtons[todayIndex]).addClass('active');
}

function deleteTodaysPickup(index){
    var date = new Date();
    var todayIndex = date.getDay();

    var pickup = $(".pickup").eq(todayIndex)[0];
    var foodForPickup = $(pickup).children().children('.event')[index].remove();
    
    
    updatePickups();
}


function updatePickups(){
    fillTodaysPickup();
    fillFuturePickups();
}

$(document).ready(function() {
    
//    Calendar creator
    var date = new Date();
    var today = date.getDate();
    var weekDay = date.getDay();
    var dayTable = document.getElementById('days');
    var monthInt;
    for (var i = 0;i < 7;i++){
        date = new Date();
        date.setDate(today+(i-date.getDay()));

        monthInt = date.getMonth() + 1;
        if(i < weekDay){
            $('#days').append('<td class="day past">'+abbrDates[i]+' '+monthInt+'/'+date.getDate()+'</td>');
            $('#pickups').append('<td class="pickup past connectedSortable droppable" id='+rawCalendarIDs[i]+'></td>');
        }else if (i == weekDay){
            $('#days').append('<td class="day today">'+abbrDates[i]+' '+monthInt+'/'+date.getDate()+'</td>');
            $('#pickups').append('<td class="pickup today connectedSortable droppable" id='+rawCalendarIDs[i]+'></td>');
        }else{
            $('#days').append('<td class="day">'+abbrDates[i]+' '+monthInt+'/'+date.getDate()+'</td>');
            $('#pickups').append('<td class="pickup future connectedSortable droppable" id='+rawCalendarIDs[i]+'></td>');
        }
    }
    
    $(".scheduleButton").on("click",function(){
        $("#scheduleModal").show();
        var firstThreeLetters = abbrDates[weekDay];
        var dayButton = "button"+firstThreeLetters;
        $('#scheduleModal').modal('show');
        $("#"+dayButton).addClass("active");
        $("#"+dayButton).prop("checked","checked");
        $("#pickup-start").val("6:00");
        $("#pickup-end").val("7:00");
        $(".foodQuantity").val("0");
    });
    
//    Modal creator and parser
    function setupTable(){
        $(".scheduling-table").append("<thead><tr><th>Food Item</th><th>Quantity</th></thead><tbody class ='scheduling-body'></tbody>");
        
        for(var foodItem in foodItems){
            var firstWordFood = foodItems[foodItem].split(" ")[0];
            $(".scheduling-body").append("<tr><td>" + foodItems[foodItem] + "</td><td class='quantity_cell'><input type='text' class='form-control quantity-input foodQuantity "+firstWordFood+"'></td></tr>");
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
		
		
		if (str.match(/^[:0-9]+$/) == null){
			console.log("butts");
			throw "Improper time"
		}
		
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
        
        var dayArray = [$('#buttonSun').hasClass('active'),$('#buttonMon').hasClass('active'),$('#buttonTue').hasClass('active'),$('#buttonWed').hasClass('active'),$('#buttonThu').hasClass('active'),$('#buttonFri').hasClass('active'),$('#buttonSat').hasClass('active')];
        
//        console.log(document.getElementById('repeatCheckbox').checked);
//        console.log(dayArray);
        
        var foodValues = []
        
        for(var foodItem in foodItems){
            var firstWordFood = foodItems[foodItem].split(" ")[0];
            var numberOfThisFood = $("."+firstWordFood).val();
            foodValues.push(numberOfThisFood);
        }
        
        var foodString = "";
        for(var foodItem in foodItems){
            var numberOfThisFood = parseInt(foodValues[foodItem]);
            if(numberOfThisFood>0){
                foodString += foodItems[foodItem] + ": " + numberOfThisFood + " ";
            }
        }


			for (var i = 0; i < dayArray.length; i++){
				if (dayArray[i]){
					$(calendarIDs[i]).append('<ul class="connectedSortable" id="draggable"><div class="event"><div class="eventHeader">'+foodString+'<i class="fa fa-times eventDelete"></i></a></div><p>' + start + startPM + '-' + end + endPM + '</p></div></ul>');
	//                if(document.getElementById('repeatCheckbox').checked){
	//                    //give repeat weekly affordance/class
	//                }
				}
			}
		
        updatePickups();
        
        $(".eventDelete").click(function(event) {
            event.preventDefault();
            event.target.parentNode.parentNode.parentNode.remove(event.target.parentNode.parentNode);
            event.stopPropagation();
            updatePickups();
        });
        
        $('#scheduleModal').modal('toggle');
			
        
	});
	
	$(".fc-future").click(function(){
			setDay = $(this).data("date");
			$('#scheduleModal').modal('toggle');
			 
	});
    
//    End modal parser/creator
	

	
	var dataset = [2, 3, 3, 1, 1, 2, 3];
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	var outer_width = $('#history')[0].offsetWidth;
	var outer_height = 150;
	var padding = 10;      
    
    var margin = { top: 10, right: 10, bottom: 10, left: 10 }
    var width = outer_width - margin.left - margin.right;
    var height = outer_height - margin.top - margin.bottom;
    
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
	
    /*
	$("#save-event-schedule").on('click', function(){
		addPickup();
	});
    */
    
    $(".eventDelete").click(function(event) {
        event.preventDefault();
        event.target.parentNode.parentNode.parentNode.remove(event.target.parentNode.parentNode);
        event.stopPropagation();
    });
    

    fillFuturePickups();
});