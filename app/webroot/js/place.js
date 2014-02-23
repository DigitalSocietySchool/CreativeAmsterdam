/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	console.log($.cookie("status"));
	if($.cookie("status") == 'visiting'){		
		//$('.favorite_button').show();		
			createFavoriteButton();
	} else {
		$('.edit_button').show();
		$('.delete_button').show();
	}
	$('.close_button').show();
	getPlaceData();
	createTagsPlace();
	createSocialPlace();

});

$(document).on('click', ".delete_button", function(){
	$(".confirmation .message").html("Are you sure you want to delete this place?")
	createModal('confirmation');
	
});

$(document).on('click', '.confirmation .confirmation_icon', function(){
	url = "/Places/deletePlace";
	data = {"id": $.cookie('showID')};
	callback = handleDeleteEvent;
	ajaxCall(url, data, callback);
});

$(document).on('click', '.confirmation .cancel_icon', function(){
	$(".confirmation").dialog("close");
});

$(document).on("click", ".edit_button", function(){
	window.location.href = "/Places/editPlace";
});

function handleDeleteEvent(result){
	if(result == "loginError"){
		window.location.href = "/";
	}
	else if(result == "deletePlace"){
		window.location.href = "/Users/profile";
	}
}

function getPlaceData(){
	url = "/Places/getPlaceProfile";
	data = {"id": $.cookie('showID')};
	callback = handleGetPlaceData;
	ajaxCall(url, data, callback);
}

function handleGetPlaceData(result){
	console.log(result);
	if(result.p_picture != null)
		$('.ppicture img').attr('src', result.p_picture);
	if(result.name != null)
		$('.name').html(result.name);
	if(result.about != null)
		$('.about').html(result.about);
	if(result.email != null){
		$('#place_page .socials').append("<div class=\"col-xs-2 social\"><a href=\"mailto:" + result.email + "\"><img class=\"img-responsive\" src=\"/img/form_icons/mail.png\" /></a></div>");
	}
	if(result.website != null){
		$('#place_page .socials').append("<div class=\"col-xs-2 social\"><a href=\"" + result.website + "\"><img class=\"img-responsive\" src=\"/img/form_icons/url.png\" /></a></div>");
	}
	if(result.picture1 != null)
		$('.pictures #picture1 img').attr('src', result.picture1);
	if(result.picture2 != null)
		$('.pictures #picture2 img').attr('src', result.picture2);
	if(result.picture3 != null)
		$('.pictures #picture3 img').attr('src', result.picture3);
	createPlaceLocation(result.location_id);
}

function createTagsPlace() {
	url = "/Tags/getTags";
	//COOKIE VISTING IS NOT SET YET! ID SHOULD BE EMPTY
	data =  {"id" : $.cookie('showID'), "table" : "place"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'place'};

	//data =  {'table': 'user'};
	callback = handlecreateTagsPlace;
	ajaxCall(url, data, callback);
}

function handlecreateTagsPlace(result) {
	console.log(result);
	insert = "<div class=\"col-xs-12 title\">TAGS</div>";
	
	$.each(result, function(i, item){
		insert += "<div id=\"" + i + "\" class=\"pull-left tag\">" + item + "</div>";
	});

	$('#place_page .tags').html(insert);
}

function createSocialPlace() {
	url = "/Socials/getSocials";
	//COOKIE VISTING IS NOT SET YET! ID SHOULD BE EMPTY
	data =  {"id" :$.cookie('showID'), "table" : "place"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'place'};
	callback = handlecreateSocialPlace;
	ajaxCall(url, data, callback);
}

function handlecreateSocialPlace(result) {
	console.log(result);
	//insert = "<div class=\"col-xs-12 title\">SOCIALS</div><div class=\"col-xs-12 social-container\">";
	insert = "";
	$.each(result, function(i,item){
		$('#place_page .socials').append("<div class=\"col-xs-2 social\"><a href=\"" + item["Social"].url + "\" target=\"_blank\"><img class=\"img-responsive\" src=\"/img/social/" + item['Social'].name + ".png\" /></a></div>");
	});
	//insert += "</div>";
	
}

function createPlaceLocation(id){
	url = "/Places/getPlaceLocation";
	data =  {'id': id};
	callback = handleCreatePlaceLocation;
	ajaxCall(url, data, callback);
}

function handleCreatePlaceLocation(result){
	insert = result.street + " " +  result.house_nr;
	$('#place_page .location').html(insert);
};