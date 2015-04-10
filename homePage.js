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
	
	// should add the event to the calendar, but I haven't had time to test it
	$('#save-event').('click', function() {
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