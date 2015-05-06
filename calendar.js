function addPickup(){
    var dayOfWeek = $("#days").children().eq($(this).index()).html();
    var firstThreeLetters = dayOfWeek.substring(0,3);
    var dayButton = "button"+firstThreeLetters;
    $('#scheduleModal').modal('show');
    $("#"+dayButton).addClass("active");
    $("#"+dayButton).prop("checked","checked");
    $("#pickup-start").val("6:00");
    $("#pickup-end").val("7:00");
    $(".foodQuantity").val("0");
}

$(document).ready(function() {
    
    $(".day").on("click", addPickup);
    $(".pickup").on("click", addPickup);
    
    $('#scheduleModal').on('hidden.bs.modal', function () {
        var daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        for(var threeDay in daysOfWeek){
            $("#button"+daysOfWeek[threeDay]).removeClass("active");
            $("#button"+daysOfWeek[threeDay]).prop("checked","unchecked");    
        }
    })
    
    $( "#draggable" ).sortable({
          connectWith: ".connectedSortable", update: updatePickups
        }).disableSelection();
    
    $( ".droppable" ).sortable({
          connectWith: ".connectedSortable", update: updatePickups
    }).disableSelection();
});