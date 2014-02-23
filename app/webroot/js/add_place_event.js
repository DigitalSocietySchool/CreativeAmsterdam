/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('mouseover', '.place', function(){
	$('.frame').css('background', 'url(\'/img/add_place_event/place.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.place', function (){
	$('.frame').css('background', 'url(\'/img/add_place_event/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('mouseover', '.event', function(){
	$('.frame').css('background', 'url(\'/img/add_place_event/event.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.event', function (){
	$('.frame').css('background', 'url(\'/img/add_place_event/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('click', '.place', function(){
	window.location.href = "/Users/addPlace";
});
$(document).on('click', '.event', function(){
	window.location.href = "/Users/addEvent";
});

$(document).ready(function(){
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