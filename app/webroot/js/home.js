/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('click', '.about', function(){
	$('.frame').hide();
	$('#about').show();
});
$(document).on('click', '.close_about', function(){
	$('#about').hide();
	$('.frame').show();
});
$(document).on('mouseover', '.join', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_unsigned/join.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.join', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_unsigned/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('mouseover', '.search', function(){
	$('.frame').css('background', 'url(\'/img/dashboard_unsigned/search.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
}); 
$(document).on('mouseleave', '.search', function (){
	$('.frame').css('background', 'url(\'/img/dashboard_unsigned/frame.png\') no-repeat');
	$('.frame').css('background-size','100% auto');
});
$(document).on('click', '.join', function(){
	window.location.href = "/Users/userPage";
});
$(document).on('click', '.search', function(){
	window.location.href = "/Searches/searchForm";
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