$(document).ready(function() {
	
	// current functionality is completely static with non-responsive validation
	
	$('#login').click(function() {
		if ($('#login-password').val() == 'test') {
			if ($('#login-username').val() == 'restaurant') {
				window.location.href = 'restaurantMain.html';
			} else if ($('#login-username').val() == 'soupkitchen') {
				window.location.href = 'soupkitchenMain.html';
			}
		}
	});
	
	$('#signup').click(function() {
		if ($('#signup-username').val().trim() != '' && $('#signup-password').val().trim() != '') {
			if ($('.active').text().trim() == 'Restaurant') {
				window.location.href = 'restaurantMain.html';
			} else {
				window.location.href = 'soupkitchenMain.html';
			}
		}
	});
});