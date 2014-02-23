/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/

$(document).on('ready', function(){	
	checkLoginStatus();
	if($(window).innerWidth() > 767) {
		number = Math.floor(Math.random() * 13) + 1;
		$('html').css('background', 'url(\'/img/background/laptop/' + number + '.jpg\')');
		$('html').css('background-size', '100% 100%');
	} else {
		number = Math.floor(Math.random() * 5) + 1;
		$('html').css('background', 'url(\'/img/background/mobile/' + number + '.jpg\')');
		$('html').css('background-size', '100% 100%');
	}
});

$(document).on('click', '#register_as .user', function(){
	$.cookie('register_as', 'user', {path: '/'});
	window.location.href = '/Users/registerForm';
});

$(document).on('click', '#register_as .org', function(){
	$.cookie('register_as', 'org', {path: '/'});
	window.location.href = '/Users/registerForm';
});

$(document).on('click', '.account', function(){
	$.removeCookie('status', {path: '/'});
	window.location.href = "/Users/profile";
});
$(document).on('click', '.search', function(){
	window.location.href = "/Searches/searchForm";
});
$(document).on('click', '.favorites', function(){
	window.location.href = "/Favorites/favoriteList";
});
$(document).on('click', '.add', function(){
	window.location.href = "/Users/addPlaceEvent";
});
$(document).on('mouseover', '.account', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/account.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.account', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});

$(document).on('mouseover', '.search', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/search.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.search', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});

$(document).on('mouseover', '.favorites', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/favorites.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.favorites', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});

$(document).on('mouseover', '.add', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/add.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.add', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_signed/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});