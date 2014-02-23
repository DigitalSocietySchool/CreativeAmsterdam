/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	getPlaceData();
	createSocialPlace();
	createTagsPlace();
	createSearchTags();
});

$(document).on('click', '.ppicture', function(){
	$('#file').click();
	$('.submit_ppicture').show();
});

$(document).on('click', '.submit_ppicture', function(){
	$('#submit').click();
	setTimeout(setPath, 1000)
});

$(document).on('click', '.approve_social', function(){
	$('.social_types .social_type').each(function(i, item){
		if($(item).hasClass('active')) {
			split = $(this).attr('class').split(' ');
			classes = split[2];
			if($('.social_url #' +classes).val() != "") {
				$('.social_types .'+ classes + ' img').attr('src', '/img/social/' + classes + '_white_rev.png');
				$('.' + classes + '_approved').addClass('filled_in');
			}
			return false;
		}
	});
});

$(document).on('click', '.add_social', function(){
		if($('.add_social').hasClass('active')) {
			$('.add_social img').attr('src', '/img/user_profile/join/add.png');
			$('.add_social').css('width', '16.6667%');
			$('.socials').css('width', '100%');
			$('.add_social').removeClass('active');
			$('.social_types').hide();
			$('.approve_social').hide();
			$('.social_url').hide();
			$('.socials .filled_in').show();
		} else {
			$('.add_social img').attr('src', '/img/add_place_event/social_small.png');
			$('.add_social').css('width', '100%');
			$('.add_social').addClass('active');
			$('.social_types').show();
			$('.socials .filled_in').hide();
		}
});
$(document).on('click', '.social_type', function(){
	if(!($('.add_social').hasClass("active"))){
		$('.add_social img').attr('src', '/img/add_place_event/social_small.png');
		$('.add_social').css('width', '100%');
		$('.add_social').addClass('active');
		$('.social_types').show();
		$('.socials .filled_in').hide();
	}

	$('.social_type').removeClass('active');
	$(this).addClass('active');
	$('.social_type').css('opacity', '0.3');
	$('.social_url input').hide();
	$('.add_social img').attr('src', '/img/add_place_event/social_large.png');
	$('.approve_social').show();
	$(this).css('opacity', '1.0');
	classes = $(this).attr('class').split(' ');
	counter = 0;
	$('.social_url input').each(function(i, item){
		if($(item).attr('id') == classes[2]){
			$(item).show();
			counter += 1;
		}
	});
	if(counter == 0)
		$('.social_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "\" type=\"text\" placeholder=\"Enter URL\" />");
	$('.social_url').show();
});

$(document).on('click', '#edit_place_tags .tag', function(){
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
	$("#edit_place_tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0)
		$('#edit_place_tags .search_button').show();
	else
		$('#edit_place_tags .search_button').hide();

});

$(document).on('click', '#edit_place_tags .search_button', function(){
	$("#edit_place .tags").html("");
	$("#edit_place .tags").html("<div class=\"title\">TAGS</div><div class=\"addtag pull-left\">+</div>");
	$('#edit_place_tags #tags .active').each(function(){
		$('#edit_place .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	});
	$('#edit_place').show();
	$('#edit_place_tags').hide();
});

$(document).on('click', '.addtag', function(){
	$('#edit_place').hide();
	$('#edit_place_tags').show();
});

$(document).on('click', '#edit_place .submitForm', function(){
	$(".notification .message").html("Editing place!")
	createModal('notification');
});

$(document).on('click', '.notification .proceed_icon', function(){
	editSubmitForm();
});

function editSubmitForm(){
	$('#edit_place_form').validate({
		rules: {
			name: "required",
			street: "required",
			city: "required",
			house_nr: "required",
		},
		messages: {
			name: "Please enter your name",
			street: "Please enter a streetname",
			city: "Please enter a city",
			house_nr: "Please enter a house_nr",
		}
	});
	if($('#edit_place_form').valid()) {
		console.log("valid..");
		count = 0;
		$('#edit_place .tags .tag').each(function(){
			console.log("Counting");
			count++;
		});
		if(count > 1) {
			var tags = "";
			var socials = "";
			var place_id = $.cookie('showID');
			var ppicture = $('#p_picture_url').val();
			var name = $('#name').val();
			var email = $('#email').val();
			var website = $('#website').val();
			var about = $('#about').text();
			var phonenumber = $('#phone').val();
			var street = $('#street').val();
			var number = $('#house_nr').val();
			var city = $('#city').val();

			$('#edit_place .tags .tag').each(function(){
				id = $(this).attr('id');
				tags += id + ":" + $(this).text() + ";";
			});
			console.log(tags);
			$('#edit_place .socials .social_url input').each(function(){
				id = $(this).attr('id'); 
				if($(this).val() != "")
					if($(this).val().indexOf("http") < 0)
						socials += id + ";http://" + $(this).val() + " "; 
					else
						socials += id + ";" + $(this).val() + " "; 
			});
			url = "/Places/editPlaceProfile";
			var data =  {"name" : name,
					 "email" : email,
					 "id" : place_id,
					 "website" : website,
					 "phone" : phonenumber,
					 "ppicture" : ppicture,
					 "about" : about,
					 "street" : street,
					 "place_id" : "",
					 "housenr" : number,
					 "city" : city,
					 "tags" : tags,
					 "socials" : socials
			};
			callback = handleEditPlace;
			ajaxCall(url, data, callback);
		}
	}
}

$(document).on('click', '.picture', function(){
	$(".pictures .picture").each(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}
	});
	$(this).addClass('active');
	$('#file').click();
	$('.pictures .approve_picture').show();
});

$(document).on('click', '.approve_picture', function(){
	$('#submit').click();
	$(".pictures .picture").each(function(){
		if($(this).hasClass('active')){
			id = $(this).attr('id');
			setTimeout(function() {
				setPicturePath(id);
			}, 1000)		
		}
	})	
});

function handleEditPlace(result){
	insert = "";
	if(result == "editPlace"){
		window.location.href = '/Places/profile';
	}
	if(result == "email is already being used, use another"){
		$(".errormessage").remove();
		insert = "<div class=\"errormessage\">" + result + "</div>";
		$(insert).insertAfter("#edit_event .creds #email");
		$("#email").css("border-color", "red");
	}
	if(result == "loginError")
		window.location.href = '/';

}

function setPath() {
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('.ppicture img').attr('src', '/img/uploads/' + tmp);
	$('#p_picture_url').val(tmp);
}

function getPlaceData(){
	url = "/Places/getPlaceProfile";
	data = {"id": $.cookie('showID')};
	callback = handleGetPlaceData;
	ajaxCall(url, data, callback);
}

function handleGetPlaceData(result){
	if(result.p_picture != null)
		$('.ppicture img').attr('src', result.p_picture);
	if(result.name != null)
		$('#name').val(result.name);
	if(result.email != null)
		$('#email').val(result.email);
	if(result.website != null)
		$('#website').val(result.website);
	if(result.about != null)
		$('#about').text(result.about);
	if(result.picture1 != null && result.picture1 != "")
		$('.pictures #picture1 img').attr('src', result.picture1);
	if(result.picture2 != null && result.picture2 != "")
		$('.pictures #picture2 img').attr('src', result.picture2);
	if(result.picture3 != null && result.picture3 != "")
		$('.pictures #picture3 img').attr('src', result.picture3);
	createPlaceLocation(result.location_id);

}

function createSocialPlace() {
	url = "/Socials/getSocials";
	//COOKIE VISTING IS NOT SET YET! ID SHOULD BE EMPTY

	data = {'id': $.cookie('showID'), 'table': 'place'};
	callback = handlecreateSocialPlace;
	ajaxCall(url, data, callback);
}

function handlecreateSocialPlace(result){
	$.each(result, function(i, item){
		$('#edit_place .socials .' + $(item)[0]['Social'].name + '_approved').addClass('filled_in');
		$('#edit_place .socials .' + $(item)[0]['Social'].name + '_approved').show();
		$('#edit_place .social_types .' + $(item)[0]['Social'].name).addClass('active');
		$('#edit_place .social_types .' + $(item)[0]['Social'].name).css('opacity', '1');
		$('#edit_place .socials .social_url').append("<input class=\"col-xs-9\" id=\"" + $(item)[0]['Social'].name + "\" placeholder=\"Enter URL\" type=\"text\">");
		$('input#' + $(item)[0]['Social'].name).val($(item)[0]['Social'].url);
	});
	$('.social_types .social_type').each(function(i, item){
		if($(item).hasClass('active')) {
			split = $(this).attr('class').split(' ');
			classes = split[2];
			if($('.social_url #' +classes).val() != "") {
				$('.social_types .'+ classes + ' img').attr('src', '/img/social/' + classes + '_white_rev.png');
				$('.' + classes + '_approved').addClass('filled_in');
			}
		}
	});

}

function createTagsPlace() {
	url = "/Tags/getTags";
	data = {'id': $.cookie('showID'), 'table': 'place'};
	callback = handlecreateTagsPlace;
	ajaxCall(url, data, callback);
}

function handlecreateTagsPlace(result) {
	//insert = "<div class=\"col-xs-12 title\">TAGS</div>";
	insert ="";
	$.each(result, function(i, item){
		insert += "<div id=\"" + i + "\" class=\"pull-left tag\">" + item + "</div>";
	});

	$('#edit_place .tags').append(insert);
}

function createSearchTags() {
	url = "/Tags/getAllTags";
	data =  {};
	callback = handleCreateSearchTags;
	ajaxCall(url, data, callback);
}

function handleCreateSearchTags(result) {
	autoCompleteTags = [];
	active_char = "A";//result[0].charAt(0);
	insert =  "<p id=\"" + active_char + "\"></p>";
	insert2 = "<p><a href=\"#"+active_char+"\">" + active_char + "</a></p>";
	$.each(result, function(i, item) {

		autoCompleteTags.push(item);
		used_char = item[1].charAt(0);
		if(used_char != active_char) {
			active_char = used_char;
			insert += "<p id=\"" + active_char + "\"></p>";
			insert2 += "<p><a href=\"#"+active_char+"\">"+ active_char + "</a></p>";
		}
		insert += "<p class=\"tag\" id=\"" + item[0] + "\">" + item[1] + "</p>";
	});
	insert2 += "</div>";
	$('#alphabet').html(insert2);
	$('#tags').html(insert);
	$('#tag_search').autocomplete({ source: autoCompleteTags});

	setTimeout(setActiveTags ,100);
}

function setActiveTags() {
	counter = 0;
	//console.log("before foreach");
	$('#edit_place .tags .tag').each(function(i, item){
		//console.log("in first forech");
		$("#edit_place_tags #tags .tag").each(function(){
			//console.log($(this).text());
			//console.log($(item));
			if($(this).attr('id') == $(item).attr('id')){
				counter++;
				$(this).addClass('active');
				$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
				$(this).css('background-size', '100%');
			}
		});
	});

	if(counter > 0){
		$('#edit_place_tags .search_button').show();
	}
}

function createPlaceLocation(id) {
	url = "/Places/getPlaceLocation";
	data = {'id': id};
	callback = handlecreatePlaceLocatioin;
	ajaxCall(url, data, callback);
}

function handlecreatePlaceLocatioin(result) {
	$('#street').val(result.street);
	$('#house_nr').val(result.house_nr);
	$('#city').val(result.city);
}