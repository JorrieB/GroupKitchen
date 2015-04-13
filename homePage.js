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
    
    setupTable();
	
	$('#tabcal').fullCalendar({
		header: {
			left: 'prev, next today',
			center: 'title',
			right: 'month, basicWeek, basicDay'
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
		var start = 'start time';
		var end = 'end time';
		var title = 'title';
		
		var e = {
			title: title,
			start: start,
			end: end
		};
		
		$('#tabcal').fullCalendar('renderEvent', e, true);
	});
});