/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('click', '#add_widget_page .twitter', function(){
	url = "/Users/addTwitter";
	data =  {};
	callback = handleAddTwitterWidget;
	ajaxCall(url, data, callback);
});

function handleAddTwitterWidget(result){
	if(result == "SUCCESS")
		window.location.href = "./userPage";
}