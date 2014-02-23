/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	createHomePage();
	$.removeCookie('tags', {path : '/'});
	$.removeCookie('search', {path : '/'});
});

function createHomePage(){
	url = "/Users/checkSession";
	data =  {};
	callback = handleCreateHomePage;
	ajaxCall(url, data, callback);
}

function handleCreateHomePage(result){
	if(result == true) {
		$('#login_page').hide();
		$('#personal_home_page').show();
	}
	getUserInformation();
}

function getUserInformation() {
	url = "/Users/getUser";
	data =  {};
	callback = handleGetUserInformation;
	ajaxCall(url, data, callback);
}

function handleGetUserInformation(result) {
	console.log(result);
	if(result.widget_twitter == '1') {
		$('#personal_home_page .twitter').show();
	}
	if(result.widget_calendar == '1') {
		$('#personal_home_page .calendar').show();
	}
	if(result.widget_twitter == '1' && result.widget_calendar == '1') {
		$('#personal_home_page #add_widget').hide();
	}
}