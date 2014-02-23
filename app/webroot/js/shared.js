/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
function ajaxCall(url, data, callBack){
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		dataType: "json",
		success: function(data){
			console.log("succes");
			callBack(data);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("error");
		}
	});
}

function checkLoginStatus(){
	url = "/Users/checkLogin";
	data =  {};
	callback = handleCheckLoginStatus;
	ajaxCall(url, data, callback);
}

function handleCheckLoginStatus(result) {
	if(result){
		$('#user_page .edit').show();
		$('#personal_home_page').show();
		$('#login_page').hide();
	} 
	else{
		$('#login_page').show();
		$('#personal_home_page').hide();
		$('#user_page .edit').hide();
	}

}

function logout(){
	url = "/Users/logout";
	data =  {};
	callback = handleLogout;
	ajaxCall(url, data, callback);
}

function handleLogout(result){
	$.removeCookie('user_id', {path : '/'});
	window.location.href = "/";
}

$(document).on('click', '.favorite_button', function(){
	if($(this).hasClass('selected')){		
		$(this).removeClass('selected');
		deleteUserFavorite();
	}
	else{
		$(this).addClass('selected');
		createUserFavorite();
	}
	
});

function createUserFavorite(){
	pathname = window.location.pathname.toLowerCase();
	if(pathname.indexOf("user") >= 0)
		type = "user";
	if(pathname.indexOf("place") >= 0)
		type = "place";
	if(pathname.indexOf("event") >= 0)
		type = "event";
	console.log(type);

	url = "/Favorites/addFavorite";
	data =  {'type': type,
			'id': $.cookie("showID")
	};
	callback = handleCreateUserFavorite;
	ajaxCall(url, data, callback);
}

function handleCreateUserFavorite(result) {
	$('.favorite_button img').attr('src', '/img/side_buttons/sidebuttons_left/favorite_selected.png');
}

function deleteUserFavorite(){
	pathname = window.location.pathname.toLowerCase();
	if(pathname.indexOf("user") >= 0)
		type = "user";
	else if(pathname.indexOf("place") >= 0)
		type = "place";
	else if(pathname.indexOf("event") >= 0)
		type = "event";


	url = "/Favorites/deleteFavorite";
	data =  {'type' : type,
			'id' : $.cookie("showID")
	};
	callback = handleDeleteUserFavorite;
	ajaxCall(url, data, callback);
}

function handleDeleteUserFavorite(){
	$('.favorite_button img').attr('src', '/img/side_buttons/sidebuttons_left/favorite.png');
}

function createFavoriteButton(){
	pathname = window.location.pathname.toLowerCase();
	console.log(pathname);
	type = "";
	if(pathname.indexOf("user") >= 0)
		type = "user";
	else if(pathname.indexOf("place") >= 0)
		type = "place";
	else if(pathname.indexOf("event") >= 0)
		type = "event";
	url = "/Favorites/isFavorite";
	data =  {'type' : type,
			'id' : $.cookie("showID")
	};
	callback = handleCreateFavoriteButton;
	ajaxCall(url, data, callback);
}

function handleCreateFavoriteButton(result){
	if(result != "loginError"){
		$('.favorite_button').show();
	}
	if(result.length == 0){

		$('.favorite_button img').attr('src', '/img/side_buttons/sidebuttons_left/favorite.png');
	}
	else{
		$('.favorite_button img').attr('src', '/img/side_buttons/sidebuttons_left/favorite_selected.png');
		$('.favorite_button').addClass('selected');

	}

}

$(document).on('click', '.close_button', function(){
	path = $.cookie('path');
	if(path == "map")
		window.location.href = "/Searches/searchMap";
	if(path == "favorite")
		window.location.href = "/Favorites/favoriteList";
	if(path == "personal")
		window.location.href = "/Users/profile";
})

function createModal(target){
	$("." + target).dialog({ 
		height: 500, 
		width: 300
	});
}

/*$(document).on('swipeleft', function(event){
	if($("#sidebar").is(":visible")){
		$("#sidebar").hide();
	}
});
/*var userAgent = navigator.userAgent.toLowerCase();
var isiPhone = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1) ? true : false;
clickEvent = isiPhone ? 'tap' : 'click';*/