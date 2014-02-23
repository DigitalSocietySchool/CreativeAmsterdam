/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	createSearchTags();
});

$(document).on('click', '#search_tag_page .search_button', function(){
	tags_args = new Array();
	$('#search_tag_page .active').each(function(){
		tags_args.push($(this).text());
	});
	$.cookie('tags', tags_args, {path: '/'});
	console.log("tags cookie set");
	window.location.href = "./searchMap";
});

$(document).on('ready', function(){
	$('#tag_search').bind('paste keyup change', function(){
		if($('#tag_search').val().length == 0) {
			$('#tags p').show();
			return false;
		}
		$('#tags p').each(function(i, item){
			item_text = $(item).text();
			if(item_text.toLowerCase().indexOf($('#tag_search').val().toLowerCase()) < 0)
				$(item).hide();
			else if(item_text.toLowerCase().indexOf($('#tag_search').val().toLowerCase()) >= 0)
				$(item).show();
		});
	});
});

$(document).on('click', '#tags .tag', function(){
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).css('background', 'url("/img/tags/tag_line.png") no-repeat');
		$(this).css('background-size', '100%');
	}
	else {
		$(this).addClass('active');
		$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
		$(this).css('background-size', '100%');
	}
	counter = 0;
	$("#tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0)
		$('#search_tag_page .search_button').show();
	else
		$('#search_tag_page .search_button').hide();
});

function createSearchTags() {
	url = "/Tags/getAllTags";
	data =  {};
	callback = handleCreateSearchTags;
	ajaxCall(url, data, callback);
}

function handleCreateSearchTags(result) {
	active_char = "A";
	insert =  "<p id=\"" + active_char + "\"></p>";
	insert2 = "<p><a href=\"#"+active_char+"\">" + active_char + "</a></p>";
	$.each(result, function(i, item) {
		used_char = item[1].charAt(0);
		if(used_char != active_char) {
			active_char = used_char;
			insert += "<p id=\"" + active_char + "\"></p>";
			insert2 += "<p><a href=\"#"+active_char+"\">"+ active_char + "</a></p>";
		}
		insert += "<p class=\"tag\">" + item[1] + "</p>";
	});
	insert2 += "</div>";
	$('#alphabet').html(insert2);
	$('#tags').html(insert);

	counter = 0;
	tags = $.cookie('tags').split(',');
	$.each(tags, function(i, item){
		$("#tags .tag").each(function(){
			if($(this).text() == item){
				counter++;
				$(this).addClass('active');
				$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
				$(this).css('background-size', '100%');
			}
		});
	});

	if(counter > 0){
		$('#search_tag_page .search_button').show();
	}
}

