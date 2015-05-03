$(document).ready(function() {
    
    function addPickup(){
        var dayOfWeek = $("#days").children().eq($(this).index()).html();
        $('#scheduleModal').modal('show');
    }
    
    $(".day").on("click", addPickup);
    $(".pickup").on("click", addPickup);
    
});