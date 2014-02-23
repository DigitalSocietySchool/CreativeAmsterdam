/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
active = '';

$(document).on('ready', function(){
	$.removeCookie('fav_search');
	getFavorites();
	$.cookie('fav_search', '', {path: '/'});
});
$(document).on('click', '.sidebar_button', function() {
	$('#sidebar').show();
});
$(document).on('click', '#search', function(){
	if($('#search_dropdown').is(':visible'))
		$('#search_dropdown').hide();
	else	
		$('#search_dropdown').show();
});
$(document).on('click', '#categories', function(){
	if($('#categories_dropdown').is(':visible'))
		$('#categories_dropdown').hide();
	else	
		$('#categories_dropdown').show();
});
$(document).on('click', '.submit_search', function(){
	$("#sidebar").hide();
	$("#clear_search").show();
	searchFavorites();
});
$(document).on('click', '#clear_search', function(){
	$(".favorite_item").each(function(){
		$(this).show();
	});
	$("#clear_search").hide();
	$("#search_fav_input").val("");
});
$(document).on('click', '#close_menu', function(){
	$("#sidebar").hide();
});
$(document).on('click', '#favorite_list .favorite_item', function(){
	$.cookie("showID", $(this).attr('id'), {path: '/'});
	$.cookie("path", "favorite", {path: '/'});
	$.cookie("status", "visiting", {path: '/'});

	classes = $(this).attr('class').split(' ');
	window.location.href = "/" + classes[2] + "s/profile";
});
$(document).on('click', '#categories_dropdown .col-xs-6', function(){
	active = '';
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		classes = $(this).attr('class').split(" ");
		temp_class = classes[1];
		src = $("." + temp_class + " img").attr('src');
		src = src.slice(0, -13);
		src += ".png";
		$("." + temp_class + " img").attr('src', src);
	}
	else{
		$(this).addClass('active');
		classes = $(this).attr('class').split(" ");
		temp_class = classes[1];
		src = $("." + temp_class + " img").attr('src');
		src = src.slice(0, -4);
		src += "_selected.png";
		$("." + temp_class + " img").attr('src', src);
	}

	$("#categories_dropdown .active").each(function(){
		classes = $(this).attr('class').split(' ');
		class_selected = classes[1];
		active += class_selected + ' ';
	});
	//$.cookie('fav_search', active, {path: '/'});
	searchFavorites();	
});

function searchFavorites(){
	args = $("#search_fav_input").val();
	$(".favorite_message").show();
	$(".favorite_item").each(function(){
		fav_item = $(this);
		classes = $(this).attr('class').split(' ');
		compare_type = classes[2];
		text = $(this).text().toLowerCase();
		if(text.indexOf(args) < 0){
			fav_item.hide();
		}
		else{
			
			if(active != ""){
				fav_item.hide();
				temp = active.split(' ');
				$.each(temp, function(i,item){
					if(compare_type.toLowerCase() == item){
						$(".favorite_message").hide();
						fav_item.show();
						return false;
					}
				});
			}
			else{
				$(".favorite_message").hide();
				fav_item.show();
			}			
		}
	});
}


function getFavorites(){
	url = "/Favorites/getFavorites"
	data = {};
	callback = handleGetFavorites;
	ajaxCall(url, data, callback);
}

function handleGetFavorites(result){
	console.log(result);
	insert = "";
	$.each(result, function(i, item){
		$.each(item, function(j, favorite){
			$(".favorite_message").hide();
			insert += "<div class=\"favorite_item col-xs-6 " + i + " col-sm-2\" id=\"" + favorite.id + "\"><div class=\"fav_image\"><img class=\"img-responsive img-circle\" src=\"" + favorite.ppicture + "\"></div><div class=\"col-xs-12 fav_text\">" + favorite.name + "</div></div>";
		});
	});
	$("#favorite_list").append(insert);
}