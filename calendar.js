$(document).ready(function() {
    
    function addPickup(){
        var dayOfWeek = $("#days").children().eq($(this).index()).html();
        var firstThreeLetters = dayOfWeek.substring(0,3);
        var dayButton = "button"+firstThreeLetters;
        $('#scheduleModal').modal('show');
        $("#"+dayButton).parent().addClass("active");
        $("#"+dayButton).prop("checked","checked");
    }
    
    $(".day").on("click", addPickup);
    $(".pickup").on("click", addPickup);
    
    $('#scheduleModal').on('hidden.bs.modal', function () {
        var daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        for(var threeDay in daysOfWeek){
            $("#button"+daysOfWeek[threeDay]).parent().removeClass("active");
            $("#button"+daysOfWeek[threeDay]).prop("checked","unchecked");    
        }
    })
    
    
});