/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	if($.cookie("status") == 'visiting'){
		$('#sidebar').hide();
		$('.sidebar_button').hide();
		createUserProfile();
		createSocialUser();
		createTagsUser();
		createUserPlace();	
		createUserWorks();
		createFavoriteButton();

	}
	else{
		checkLoginStatus();
		createUserProfile();
		createSocialUser();
		createTagsUser();
		createUserPlace();
		createUserEvents();
		createUserPlaces();		
		createUserWorks();
		$('.close_button').hide();
	}
});
$(document).on('click', '#user', function(){

	if($('#user_dropdown').is(':visible'))
		$('#user_dropdown').hide();
	else	
		$('#user_dropdown').show();
});
$(document).on('click', '#event', function(){
	$.cookie("path", "personal", {path: '/'});
	if($('#event_dropdown').is(':visible'))
		$('#event_dropdown').hide();
	else	
		$('#event_dropdown').show();
});
$(document).on('click', '#place', function(){
	$.cookie("path", "personal", {path: '/'});
	if($('#place_dropdown').is(':visible'))
		$('#place_dropdown').hide();
	else	
		$('#place_dropdown').show();
});

$(document).on('click', '#user_page .addTag', function(){
	url = "/Tags/addTag";
	data =  {'id': '3', 'table': 'user'};
	callback = handleAddTag;
	ajaxCall(url, data, callback);
});

$(document).on('click', '#user_page .edit', function(){
	$('#user_page .edit').hide();
	$('#user_page .save').show();

	name = $('#user_page .name').html();
	email = $('#user_page .email').html();
	website = $('#user_page .website').html();
	
	insert_name = "<input type=\"text\" value=\"" + name + "\" />";
	$('#user_page .name').html(insert_name);
	insert_email = "<input type=\"text\" id=\"email\" value=\"" + email + "\" />";
	$('#user_page .email').html(insert_email);
	if(website != '') {
		insert_website = "<input type=\"text\" id=\"website\" value=\"" + website + "\" /	>";
		$('#user_page .website').html(insert_website);
	}
});
$(document).on('click', '#user_page', function() {
	if($('#sidebar').is(':visible')) {
		$('#sidebar').hide();
	}
});
$(document).on('click', '.sidebar_button', function() {
	$('#sidebar').show();
});

$(document).on('click', '#user_page .save', function(){
	website = $('#email').val();
	url = "/Users/editWebsite";
	data =  {'website': website};
	callback = handleEditWebsite;
	ajaxCall(url, data, callback);
});

$(document).on('click', '#event_dropdown .event', function(){
	 $.cookie("showID", $(this).attr('id'), {path: '/'});
	 window.location.href = "/Events/profile";
});

$(document).on('click', '#place_dropdown .place', function(){
	$.cookie("showID", $(this).attr('id'), {path: '/'});
	 window.location.href = "/Places/profile";
	
});

$(document).on('click', '#logout', function(){
	logout();
});

$(document).on('click', '.social', function(){
	url = $(this).attr('id');
	window.open(url, "");
});
$(document).on('click', '#sidebar .edit', function(){
	window.location.href = '/Users/editProfile';
});

$(document).on('click', '#sidebar .delete', function(){
	$(".confirmation .message").html("Are you sure you want to delete this profile?")
	createModal('confirmation');
	
});

$(document).on('click', '.confirmation .confirmation_icon', function(){
	url = "/Users/deleteProfile";
	data =  {};
	callback = handleDeleteUser;
	ajaxCall(url, data, callback);
});

$(document).on('click', '.confirmation .cancel_icon', function(){
	$(".confirmation").dialog("close");
});


function handleDeleteUser(){
	$.removeCookie('user_id', {path : '/'});
	window.location.href = "/";
}

function handleEditWebsite(result) {
	if(result == "SUCCESS") {
		$('#user_page .save').hide();
		$('#user_page .saved_profile').show();
		createUserProfile();
	}
}

function checkLoginStatus(){
	url = "/Users/checkLogin";
	data =  {};
	callback = handleCheckLoginStatus;
	ajaxCall(url, data, callback);
}
function handleCheckLoginStatus(result) {
	if(result) $('#user_page .edit').show();
}
function createUserPlace() {
	url = "/Places/getPlace";
	data =  {"id" : ""};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID')};
	callback = handlecreateUserPlace;
	ajaxCall(url, data, callback);
}

function handlecreateUserPlace(result) {
	insert = result.Location.street + " " +  result.Location.house_nr;
	$('#user_page .location').html(insert);
}
function handleAddTag(result) {
}

function createTagsUser() {
	url = "/Tags/getTags";

	data =  {"id" : "", "table" : "user"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'user'};

	//data =  {'table': 'user'};
	callback = handlecreateTagsUser;
	ajaxCall(url, data, callback);
}

function handlecreateTagsUser(result) {
	insert = "<div class=\"col-xs-12 title\">TAGS</div>";
	
	$.each(result, function(i, item){
		insert += "<div id=\"" + i + "\" class=\"pull-left tag\">" + item + "</div>";
	});

	$('#user_page .tags').html(insert);
}

function createSocialUser() {
	url = "/Socials/getSocials";
	data =  {"id" : "", "table" : "user"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'user'};
	callback = handlecreateSocialUser;
	ajaxCall(url, data, callback);
}

function handlecreateSocialUser(result) {
	insert = "<div class=\"col-xs-12 title\">SOCIALS</div><div class=\"col-xs-12 social-container\">";
	$.each(result, function(i,item){
		insert += "<div class=\"col-xs-2 social\" id=\"" + item["Social"].url + "\"><img class=\"img-responsive\" src=\"/img/social/" + item['Social'].name + ".png\" /></div>";
	});
	insert += "</div>";
	$('#user_page .socials').html(insert);
}

function createUserEvents(){
	url = "/Events/getUserEvents";
	data =  {};
	callback = handleCreateUserEvents;
	ajaxCall(url, data, callback);
}

function handleCreateUserEvents(result){
	console.log(result);
	if(result.length > 0) {
		$('.add_event').hide();
		insert = "";
		$.each(result, function(i,item){
			insert += "<div class=\"col-xs-12 event\" id=\"" + item.id + "\"><div class=\"event_image col-xs-4\"><img src=\"" + item.p_picture + "\" class=\"img-responsive\"></div><div class=\"text col-xs-8\">" + item.name + "</div></div>"
		});
		$('#event_dropdown').append(insert);
	}
};

function createUserPlaces(){
	url = "/Places/getUserPlaces";
	data =  {};
	callback = handleCreateUserPlaces;
	ajaxCall(url, data, callback);
}

function handleCreateUserPlaces(result){
	if(result.length > 0) {
		$('.add_place').hide();
		insert = "";
		$.each(result, function(i,item){
			insert += "<div class=\"col-xs-12 place\" id=\"" + item.id + "\"><div class=\"place_image col-xs-4\"><img src=\"" + item.p_picture + "\" class=\"img-responsive\"></div><div class=\"text col-xs-8\">" + item.name + "</div></div>"
		});
		$('#place_dropdown').append(insert);
	}
};

function createUserWorks(){
	data =  {"id" : ""};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID')};
	url = "/Users/getWorks";
	callback = handleCreateUserWorks;
	ajaxCall(url, data, callback);

}

function handleCreateUserWorks(result){
	counter = 0;
	insert = "<div class=\"col-xs-12 title\">WORK SAMPLES</div>";
	$.each(result, function(i, item){
		counter++;
		if(item.path.indexOf('.png') >= 0  || item.path.indexOf('.jp') >= 0 || item.path.indexOf('.JP') >= 0 ){
			insert += "<div class=\"work col-xs-4\"><img class=\"img-responsive img-circle\" src=\"/img/uploads/" + item.path + "\" /></div>";
		}
		else if(item.path.indexOf('youtube') >= 0){
			insert += "<div class=\"work col-xs-4\"><a href=\"" + item.path + "\" target=\"_blank\"><img class=\"img-responsive img-circle\" src=\"/img/social/youtube.png\" /></a></div>";
		}
		else if(item.path.indexOf('vimeo') >= 0){
			insert += "<div class=\"work col-xs-4\"><a href=\"" + item.path + "\" target=\"_blank\"><img class=\"img-responsive img-circle\" src=\"/img/social/vimeo.png\" /></a></div>";
		}
		else if(item.path.indexOf('soundcloud') >= 0){
			insert += "<div class=\"work col-xs-4\"><a href=\"" + item.path + "\" target=\"_blank\"><img class=\"img-responsive img-circle\" src=\"/img/social/soundcloud.png\" /></a></div>";
		}

	});
	if(counter > 0){
		$("#user_page .works").show();
	}
	$("#user_page .works").html(insert);
}


function createUserProfile() {
	data =  {"id" : ""};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID')};
	url = "/Users/getUser";	
	callback = handleCreateUserProfile;
	ajaxCall(url, data, callback);
}

function handleCreateUserProfile(result) {
	works = 0;
	console.log(result);
	if(result.rights == "admin") {
		$('#sidebar').append("<a href=\"/Users/adminPage\"><div class=\"col-xs-12 sidebar_row\"><div class=\"text col-xs-8\">ADMIN PAGE</div></div></a>");
	}
	if(result.p_picture != null) {
		$('#user_page .ppicture img').attr('src', result.p_picture);
	}
	if(result.type == "user") {
		$('#user_page .ppicture').css('border', '3px solid #FF3333');
		name = result.name;
	}
	else {
		$('#user_page .ppicture').css('border', '3px solid #339999');
		name = result.name;
	}
	$('#user_page .name').html(name);
	if(result.website) {
		insert = "<a href=\"" + result.website + "\">" + result.website + "</a>";
		$('#user_page .website').html(insert);
	} else {
		console.log("in else");
		$('#tr_website').hide();
	}
	if(result.email) {
		insert = "<a href=\"mailto:" + result.email + "\">" + result.email + "</a>";
		$('#user_page .email').html(insert);
	} else {
		$('#tr_email').hide();
	}
	if(result.phone) {
		insert = "<a href=\"tel:" + result.phone + "\">" + result.phone + "</a>";
		$('#user_page .phone').html(insert);
	} else {
		$('#tr_phone').hide();
	}
}
