/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	createSearchTags();
	checkLoginStatus();
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

$(document).on('click', '.approve_social', function(){
	$('.social_types .social_type').each(function(i, item){
		if($(item).hasClass('active')) {
			split = $(this).attr('class').split(' ');
			classes = split[2];
			if($('.social_url #' +classes).val() != "") {
				$('.social_types .'+ classes + ' img').attr('src', '/img/social/' + classes + '_white_rev.png');
				$('.' + classes + '_approved').addClass('filled_in');
				$('.approve_social img').attr('src', '/img/side_buttons/sidebuttons_right/save_filled.png');
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
		$('.socials').css('width', '95%');
		$('.add_social').addClass('active');
		$('.social_types').show();
		$('.socials .filled_in').hide();
	}
});
$(document).on('click', '.social_type', function(){
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

$(document).on('click', '.addtag', function(){
	if($(window).innerWidth() < 767) {
		$('.hide_on_xs').hide();	
		$('.submitForm').hide();
	} 
	$('#hide_on_tags').hide();
	$('#place_tags').show();	
});

$(document).on('click', '#place_tags .search_button', function(){
	if($(window).innerWidth() > 767) {
		$('#hide_on_tags').show();
	} else {
		$('#hide_on_tags').show();
		$('.hide_on_xs').show();
		$('.submitForm').show();
	}
	$('#place_tags').hide();
});


$(document).on('click', '#tags .tag', function(){
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).css('background', 'url("/img/tags/tag_line.png") no-repeat');
		$(this).css('background-size', '100%');
		tag = $(this);
		$('#add_place .tags .tag').each(function(){
			if($(this).attr('id') == tag.attr('id'))
				$(this).remove();
		});
	}
	else {
		$(this).addClass('active');
		$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
		$(this).css('background-size', '100%');
		$('#add_place .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	}
	counter = 0;
	$("#tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0)
		$('#place_tags .search_button').show();
	else
		$('#place_tags .search_button').hide();

});


$(document).on('click', '.ppicture', function(){
	$('#file').click();
	$('.submit_ppicture').show();
});

$(document).on('click', '.submit_ppicture', function(){
	$('#submit').click();
	setTimeout(setPath, 2000);
});

function setPath() {
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('.ppicture img').attr('src', '/img/uploads/' + tmp);
	$('#p_picture_url').val(tmp);
	$('.submit_ppicture').hide();
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

function setPicturePath(id) {
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('#' + id + " img").attr('src', '/img/uploads/' + tmp);
	$('#' + id + " input").val('/img/uploads/' + tmp);
	$('.approve_picture').hide();
}


$(document).on('click', '.submitForm', function(){
	url = '/Places/getAllPlaces';
	data = {'name':name};
	callback = handleCheckPlaceNames;
	ajaxCall(url, data, callback);
});

function handleCheckPlaceNames(result){
	insert = "";
	name = $('#name').val();
	counter = 0;
	$.each(result, function(i, item){
		temp_name = item.name.toLowerCase();
		if(temp_name.indexOf(name) > -1){
			counter++;
			insert += item.name + ', ';
		}
	});
	if(counter > 0)
		insert += "these places already exist containing this name do you wish to proceed with adding this place?";

	$(".notification .message").html("Creating place! " + insert);
	createModal('notification');
}

$(document).on('click', '.notification .proceed_icon', function(){
	submitForm();
});

function showFile(){
	counter = 0;
	$('.pictures .picture').each(function(){
		if($(this).hasClass('active')){
			counter++;
		}
	});
	if(counter > 0)
		$('#picture_icon').val($('#file').val());
	else {
		console.log(counter + " in else");
		$("#p_picture_url").val($('#file').val());
		$(".submit_ppicture").show();
	}
}


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
		insert += "<p class=\"tag\" id=\"" + item[0] + "\">" + item[1] + "</p>";
	});
	insert2 += "</div>";
	$('#alphabet').html(insert2);
	$('#tags').html(insert);
}

function submitForm(){
	$('#add_place_form').validate({
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
	if($('#add_place_form').valid()) {
		count = 0;
		$('#add_place .tags .tag').each(function(){
			console.log("Counting");
			count++;
		});
		if(count > 0) {
			ppicture = $('#p_picture_url').val();
			name = $('#name').val();
			street = $('#street').val();
			house_nr = $('#house_nr').val();
			city = $('#city').val();
			about = $('#about').val();
			email = $('#email').val();
			website = $('#website').val();
			phone = $('#phone').val();
			user_id = $.cookie('user_id');
			
			tags = "";
			socials = "";
			counter = 1;
			picture1 = $("#picture1 input").val(); 
			picture2 = $("#picture2 input").val(); 
			picture3 = $("#picture3 input").val(); 

			$('#add_place .tags .tag').each(function(){
				id = $(this).attr('id');
				tags += id + ":" + $(this).text() + ";";
			});

			$('#add_place .socials .social_url input').each(function(){
				id = $(this).attr('id'); 
				if($(this).val() != "")
					socials += id + ";" + $(this).val() + " "; 
			});

			url = "/Places/addPlace";
			var data =  {"name" : name,
					 "email" : email,
					 "website" : website,
					 "about" : about,
					 "ppicture" : ppicture,
					 "street" : street,
					 "housenr" : house_nr,
					 "city" : city,
					 "tags" : tags,
					 "socials" : socials,
					 "user_id" : user_id,
					 "picture1" : picture1,
					 "picture2" : picture2,
					 "picture3" : picture3
			};
			callback = handleAddPlace;
			ajaxCall(url, data, callback);
		}
	}
}

function handleAddPlace(result){
	console.log(result);
	window.location.href = "/Users/userPage";
}
