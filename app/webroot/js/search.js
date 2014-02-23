/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('click', '#search_page .org', function(){
	if($('#search_page .org').hasClass('active')) {
		$('#search_page .org').removeClass('active');
		$('.org img.visible-xs').attr('src', '/img/search/organization.png');
		$('.org img.hidden-xs').attr('src', '/img/laptop/search/organization.png');
	}
	else {
		$('#search_page .org').addClass('active');
		$('.org img.visible-xs').attr('src', '/img/search/organization_selected.png');
		$('.org img.hidden-xs').attr('src', '/img/laptop/search/organization_selected.png');
	}
});
$(document).on('click', '#search_page .user', function(){
	if($('#search_page .user').hasClass('active')) {
		$('#search_page .user').removeClass('active');
		$('.user img.visible-xs').attr('src', '/img/search/user.png');
		$('.user img.hidden-xs').attr('src', '/img/laptop/search/user.png');
	}
	else {
		$('#search_page .user').addClass('active');
		$('.user img.visible-xs').attr('src', '/img/search/user_selected.png');
		$('.user img.hidden-xs').attr('src', '/img/laptop/search/user_selected.png');
	}
});
$(document).on('click', '#search_page .place', function(){
	if($('#search_page .place').hasClass('active')) {
		$('#search_page .place').removeClass('active');
		$('.place img.visible-xs').attr('src', '/img/search/place.png');
		$('.place img.hidden-xs').attr('src', '/img/laptop/search/place.png');
	}
	else {
		$('#search_page .place').addClass('active');
		$('.place img.visible-xs').attr('src', '/img/search/place_selected.png');
		$('.place img.hidden-xs').attr('src', '/img/laptop/search/place_selected.png');
	}
});
$(document).on('click', '#search_page .event', function(){
	if($('#search_page .event').hasClass('active')) {
		$('#search_page .event').removeClass('active');
		$('.event img.visible-xs').attr('src', '/img/search/event.png');
		$('.event img.hidden-xs').attr('src', '/img/laptop/search/event.png');
	}
	else {
		$('#search_page .event').addClass('active');
		$('.event img.visible-xs').attr('src', '/img/search/event_selected.png');
		$('.event img.hidden-xs').attr('src', '/img/laptop/search/event_selected.png');
	}
});

$(document).on('click', '#search_page .search img', function(){
	search_args = new Array();
	insert = 0;
	$.removeCookie("search_input", {path : '/'});
	$.cookie("path", "searchTag", {path: '/'});
	$('#search_page .active').each(function(){
		if($(this).hasClass('user')){
				search_args.push('user');
		}
		if($(this).hasClass('org')){
				search_args.push('org');
		}
		else if($(this).hasClass('event')){
			search_args.push('event');
		}
		else if($(this).hasClass('place')){
			search_args.push('place');
		}
	});
	$.cookie('search', search_args, {path: '/'});
	console.log("search category set");
	$('.search img').attr('src', '/img/search/search_selected.png');
	$('#search_page').addClass('col-sm-8');
	if($(window).innerWidth() > 767)
		$('#search_tag_page').css('border-left', '2px solid rgba(51, 51, 51, 0.4)');
	if($(window).innerWidth() < 767)
		$('#search_page').hide();
	$('#search_tag_page').show();
	//window.location.href = "./searchTags";
	//$('#search_args').submit();
});

$(document).on('click', '.search_input_submit', function(){
	input = $(".search_input input").val();
	$.cookie("search_input", input, {path: "/"});
	window.location.href = "/Searches/searchMap";
});

$('.search_input input').bind('keypress', function(e){
	    var code = e.which; // recommended to use e.which, it's normalized across browsers
	    //if(code==13)e.preventDefault();
	    
	    if(code==13 || code == 10){
	    	if($(".search_input input").val() != ""){
			    input = $(".search_input input").val();
			    console.log(input);
			    $.cookie("search_input", input, {path: "/"});
				window.location.href = "/Searches/searchMap";
	    } // missing closing if brace
	}
});

