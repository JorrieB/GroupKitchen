var foodItems = ["Salad", "Side Dish", "Main Course", "Dessert"];

$(document).ready( function(){
    $('#graphTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
        
    function setupTable(){
        $(".scheduling-table").append("<thead><tr><th>Quantity</th><th>Food Item</th></thead><tbody class ='scheduling-body'></tbody>");
        
        for(var foodItem in foodItems){
            $(".scheduling-body").append("<tr><td class='quantity_cell'><input type='text' class='form-control quantity-input' id='foodQuantity'></td><td>" + foodItems[foodItem] + "</td></tr>");
        }
    }
    
    setupTable();
});