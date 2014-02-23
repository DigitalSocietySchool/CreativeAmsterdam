/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on("click", ".signup", function(){
	$("#login_page").hide();
	$("#register_as").show();
});
$(document).on('mouseover', '.user', function(){
	$('.frame').css('background', 'url(\'/img/login/user.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.user', function (){
	$('.frame').css('background', 'url(\'/img/login/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('mouseover', '.org', function(){
	$('.frame').css('background', 'url(\'/img/login/org.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.org', function (){
	$('.frame').css('background', 'url(\'/img/login/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('click', '#login_form .user', function(){
	$.cookie("type", "user", {path: '/'});
	window.location.href("/Users/registerForm");
});
$(document).on('click', '#login_form .org', function(){
	$.cookie("type", "org", {path: '/'});
	window.location.href("/Users/registerForm");
});
$(document).on("click", "#submit_login", function(){
	validateLogin();
});

$(document).on("click", "#submit_register", function() {
	$('#register_form').validate({
		rules: {
			name: "required",
			email: "required",
			password: "required",
			password_retype: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please enter a valid email",
			password: "Please provide a password",
			password_retype: {
				required: "Please provide a password",
				equalTo: "Please enter the same password as above",
			}
		}
	});
	if($('#register_form').valid()) 
		registerUser();
});

$(document).keydown(function(e){
	if($("#login_page").is(":visible")){ 
	    var code = e.which; // recommended to use e.which, it's normalized across browsers
	    //if(code==13)e.preventDefault();
	    if(code==32||code==13||code==188||code==186){
	       validateLogin();
	    } // missing closing if brace
	}
});

function createLogin(){
	insert = "";
	insert += ""
	$("#login_page").html(insert);
	$("#login_page").show();
}

function validateLogin(){
	username = $("#login_input").val();
	password = $("#password_input").val();
	url = "/Users/validateLogin";
	data =  {'username' : username, 'password' : password};
	callback = handleValidateLogin;
	ajaxCall(url, data, callback);
}

function handleValidateLogin(result){
	if(result.hasOwnProperty('id') == true){
		$('#login_page').hide();
		$('#personal_home_page').show();
		$.cookie('user_id', 'login', {path : '/'});
	} 
	else if(result == "wrong credentials"){
		$("#errormessage").html(result);
	}	
}

function handleContinue(){}

function registerUser(){
	name = $("#name").val();
	surname = $("#surname").val();
	phone = $("#phone").val();
	email = $("#email").val();
	website = $("#website").val();
	password = $("#password").val();
	street = $('#street').val();
	city = $('#city').val();
	house_nr = $('#house_nr').val();
	postalcode = $('#postalcode').val();
	location_radius = $('#location_radius').val();
	place_name = $('#place_name').val();
	place_website = $('#place_website').val();
	place_email = $('#place_email').val();
	place_about = $('#place_about').val();
	
	url = "/Users/registerUser";
	data =  {'name' : name, 'surname' : surname, 'phone' : phone, 'email' : email, 'website' : website, 'password' : password, 'street': street, 'postalcode': postalcode, 'house_nr': house_nr, 'city': city, 'location_radius': location_radius, 'place_name': place_name, 'place_about': place_about, 'place_email': place_email, 'place_website': place_website};
	callback = handleRegisterUser;
	ajaxCall(url, data, callback);
}

function handleRegisterUser(result){
	if(result.hasOwnProperty('id') == true){
		$('#personal_home_page').show();
		$('#login_page input').val('');
		$('#login_page').hide();		
	} 	
}