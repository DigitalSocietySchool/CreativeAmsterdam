/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	if($.cookie("status") == 'visiting'){		
		//$('.favorite_button').show();
		
		createFavoriteButton();
	} else {
		$('.edit_button').show();
		$('.delete_button').show();
	}
	//createFavoriteButton();
	$('.close_button').show();
	getEventData();
	createTagsEvent();

	createSocialEvent();
	createEventLocation();
});

$(document).on('click', ".delete_button", function(){
	$(".confirmation .message").html("Are you sure you want to delete this event?")
	createModal('confirmation');
	
});

$(document).on('click', '.confirmation .confirmation_icon', function(){
	url = "/Events/deleteEvent";
	data = {"id": $.cookie('showID')};
	callback = handleDeleteEvent;
	ajaxCall(url, data, callback);
});

$(document).on('click', '.confirmation .cancel_icon', function(){
	$(".confirmation").dialog("close");
});

$(document).on("click", ".edit_button", function(){
	window.location.href = "/Events/editEvent";
});

$(document).on('click', '.close_button', function(){
	if($.cookie('user_id') == "login" && $.cookie('status') != "visiting"){
		window.location.href = "/Users/profile";		
	} 
});

function handleDeleteEvent(result){
	if(result == "loginError"){
		window.location.href = "/";
	}
	else if(result == "deleteEvent"){
		window.location.href = "/Users/profile";
	}
}

function getEventData(){
	url = "/Events/getEventProfile";
	data = {"id": $.cookie('showID')};
	callback = handleGetEventData;
	ajaxCall(url, data, callback);
}

function handleGetEventData(result){
	console.log(result);
	if(result.p_picture != null)
		$('.ppicture img').attr('src', result.p_picture);
	if(result.name != null)
		$('.name').html(result.name);
	if(result.about != null)
		$('.about').html(result.about);
	if(result.email != null)
		$('.social-container').append("<div class=\"col-xs-2 social\"><a href=\"mailto:" + result.email + "\"><img class=\"img-responsive\" src=\"/img/form_icons/mail.png\" /></a></div>");
	if(result.website != null)
		$('.social-container').append("<div class=\"col-xs-2 social\"><a href=\"" + result.website + "\"><img class=\"img-responsive\" src=\"/img/form_icons/url.png\" /></a></div>");
	if(result.start != null) {
		spaces = result.start.split(' ');
		date = spaces[0].split('-');
		time = spaces[1].split(':');
		$('.date_day').html(date[2] + "-" + date[1]);
		$('.time_start').html(time[0] + ":" + time[1]);
	}
	if(result.end != null) {
		spaces = result.end.split(' ');
		time = spaces[1].split(':');
		$('.time_end').html(time[0] + ":" + time[1]);
	}

}

function createTagsEvent() {
	url = "/Tags/getTags";
	data =  {"id" : $.cookie('showID'), "table" : "event"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'event'};

	//data =  {'table': 'user'};
	callback = handlecreateTagsEvent;
	ajaxCall(url, data, callback);
}

function handlecreateTagsEvent(result) {
	$.each(result, function(i, item){
		$('#event_page .tags').append("<div id=\"" + i + "\" class=\"pull-left tag\">" + item + "</div>");
	});
}
function createSocialEvent() {
	url = "/Socials/getSocials";
	data =  {"id" : $.cookie('showID'), "table" : "event"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'event'};
	callback = handlecreateSocialEvent;
	ajaxCall(url, data, callback);
}

function handlecreateSocialEvent(result) {
	console.log(result);
	insert = "<div class=\"col-xs-12 title\">SOCIALS</div><div class=\"col-xs-12 social-container\">";
	$.each(result, function(i,item){
		insert += "<div class=\"col-xs-2 social\"><a href=\"" + item["Social"].url + "\" target=\"_blank\"><img class=\"img-responsive\" src=\"/img/social/" + item['Social'].name + ".png\" /></a></div>";
	});
	insert += "</div>";
	$('#event_page .socials').html(insert);
}
function createEventLocation(){
	url = "/Events/getEventLocation";
	data =  {"id" : $.cookie('showID'), "table" : "event"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'event'};
	callback = handleCreateEventLocation;
	ajaxCall(url, data, callback);

}

function handleCreateEventLocation(result){
	insert = result.street + " " +  result.house_nr;
	$('#event_page .location').html(insert);
}