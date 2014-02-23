/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	searchItem();

	$(".selected_user .favorite").on("click", function(){

		url = "/Favorites/addFavorite";
		data = {'type': $('.item_type').val()};
		callback = handleAddFavorite;
		ajaxCall(url, data, callback);
	})
});

function handleAddFavorite(){
	$(".favorite").css("color" , "yellow");
}

function searchItem(){
	type = $('.item_type').val();
	url = "/Searches/searchItem";
	data = {'type' : type};
	console.log(data);
	callback = handleSearchItem;
	ajaxCall(url, data, callback);
}

function handleSearchItem(result){
	console.log(result);
	type = $('.item_type').val();
	if(type == 'User')
		fillUserPage(result);
	else if(type == 'Event')
		fillEventPage(result);
	else if(type == 'Place')
		fillPlacePage(result)
}

function fillUserPage(result){
	$(".name").html(result.name);
	$(".email").html(result.email);
	$(".website").html(result.website);
	$(".").html(result.website);
}

function fillEventPage(result){
	console.log(result);
	$(".name").html(result.name);
	$(".email").html(result.email);
	$(".website").html(result.website);
	$(".about").html(result.about);	
}