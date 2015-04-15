var foodItems = ["Salad", "Side Dish", "Main Course", "Dessert"];

$(document).ready( function(){
    $('#graphTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
        
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
		
		if (parseInt(hour) < 12 && pm == 1){
			hour = parseInt(hour) + 12;
			hour = hour.toString();
		}
		
		if (hour.length == 1){
			hour = "0" + hour;
		}
		if (minute.length == 1){
			minute = "0" + min;
		}
		
		return hour + ":" + minute;
	}
	
	console.log("whee " + timeParser("12:14", false));
    
    setupTable();
	
	$('#tabcal').fullCalendar({
		header: {
			left: 'prev, next today',
			center: 'title',
			right: ''/*'month, basicWeek, basicDay'*/
		},
		editable: true,
		eventLimit: true,
		height: 800
		/*
		--example events
		events: [
			{
				title: 'Long Event',
				start: '2015-02-07',
				end: '2015-02-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2015-02-09T16:00:00'
			}
		]
		*/
	});
	
	// TODO: fix adding of events
	// There needs to be some logic built into this to figure out the correct date
	// to add the pick-ups. This shouldn't be too hard, as it's simply choosing the
	// next weekday from the current date. If no weekday is selected, then a pick-up
	// should be added for the current day. The repeat weekly functionality might be
	// harder to add in, but we can not include it if need be for GR4.
	//
	// The sequence for adding an event is roughly as follows:
	//   - click the schedule button
	//   - fill in the necessary information in the modal
	//   - convert that information into an event using the renderEvent function for fullCalendar
	//   - close the modal
	//
	// Once that basic functionality is in place, it would be best to add in some basic
	// error checking/validation.
	$('#save-event').click(function() {
		var start = $("#pickup-start").val();
		//TODO: make it so that f doesn't have to be filled in
		var end = $("#pickup-end").val();
		
		try {
			start = timeParser(start, $('#startPM').prop('checked'));
		} catch (err) {
			console.log("ruh roh, not a good time");
		}
		
		console.log("this is a string parsing victory" + start);
		
		
        //console.log($('#startPM').prop('checked'));
        //console.log($('#endPM').prop('checked'));
        
        //console.log('start = '+start+' end = '+end);
        
		var title = 'Food Pickup';
        var today = new Date();
        
        //retrieve the check boxes' data
        var dayArray = [$('#buttonSun').prop('checked'),$('#buttonMon').prop('checked'),$('#buttonTue').prop('checked'),$('#buttonWed').prop('checked'),$('#buttonThu').prop('checked'),$('#buttonFri').prop('checked'),$('#buttonSat').prop('checked')];
        
		
		if (dayArray.indexOf(true) == -1 ){
			dayArray[today.getDay()] = true;
			console.log("beep boop");
		}
		
        var dateBeingAdded = new Date();
        var monthNumber;
    
        console.log(dayArray);
        
        for (var i = 0; i < 7; i++){
            //the day we're on is checked, so we render an event
            if (dayArray[i]){
                if (today.getDay() > i){
                    dateBeingAdded.setDate(today.getDate() - today.getDay() + i + 7);
                } else if (today.getDay() < i){
                    dateBeingAdded.setDate(today.getDate() - today.getDay() + i);
                } else{
                    if (today.getHours() <= start){
                        dateBeingAdded.setDate(today.getDate() - today.getDay() + i);
                    } else {
                        dateBeingAdded.setDate(today.getDate() - today.getDay() + i + 7);
                    }
                }

                //make sure the month is formatted for the time stamp
                monthNumber = (dateBeingAdded.getMonth()+1);
                if(monthNumber < 10){
                    monthNumber = '0'+monthNumber.toString();
                }
                
                var e = {
                    title: title,
                    start: dateBeingAdded.getFullYear()+'-'+monthNumber+'-'+dateBeingAdded.getDate()+'T'+start +':00',
                    end: dateBeingAdded.getFullYear()+'-'+monthNumber+'-'+dateBeingAdded.getDate()+'T'+end+':00:00'
                };
                
                //console.log(e);
                //render the event on the calendar
                $('#tabcal').fullCalendar('renderEvent', e, true);

            }
        }
        
//        $('#buttonMon').prop('checked');
//        console.log();

		
		var e = {
			title: title,
			start: "2015-4-15T1:00:00",
			end: "2015-4-15T5:00:00"
		};
		
		$('#tabcal').fullCalendar('renderEvent', e, true);
        
        $('#scheduleModal').modal('toggle');
        
	});
});