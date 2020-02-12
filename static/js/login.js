$(document).ready(function() {
	$("#login").submit(function(e) {
		console.log("stopping submit");
		e.preventDefault();
		var form = $(this);
		
		$.ajax({
			type: "POST",
			url: "/",
			data: form.serialize(),
			success: function(data) {
				console.log(data);
				localStorage.setItem('token', data['jwt']);
				window.location = "/main_menu";
			}
		});
	});
});