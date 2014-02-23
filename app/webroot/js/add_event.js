/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	createSearchTags();
	createPlaceDropdown();
	checkLoginStatus();

	createDatepickers();
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

$(document).on('click', '#event_tags .search_button', function(){
	if($(window).innerWidth() > 767) {
		$('#hide_on_tags').show();
	} else {
		$('#hide_on_tags').show();
		$('.hide_on_xs').show();
		$('.submitForm').show();
	}
	$('#event_tags').hide();
});

$(document).on('click', '.addtag', function(){
	if($(window).innerWidth() > 768) {
		$('#hide_on_tags').hide();
		$('#event_tags').show();
	} else {
		$('.hide_on_xs').hide();
		$('#hide_on_tags').hide();
		$('#event_tags').show();
	}
});

$(document).on('click', '#tags .tag', function(){
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).css('background', 'url("/img/tags/tag_line.png") no-repeat');
		$(this).css('background-size', '100%');
		tag = $(this);
		$('#add_event .tags .tag').each(function(){
			if($(this).attr('id') == tag.attr('id'))
				$(this).remove();
		});
	}
	else {
		$(this).addClass('active');
		$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
		$(this).css('background-size', '100%');
		$('#add_event .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	}
	counter = 0;
	$("#tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0)
		$('#event_tags .search_button').show();
	else
		$('#event_tags .search_button').hide();

});

$(document).on('click', '.ppicture', function(){
	$('#file').click();
});

$(document).on('click', '.submit_ppicture', function(){
	$('#submit').click();
	setTimeout(setPath, 1000)
});

function setPath() {
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('.ppicture img').attr('src', '/img/uploads/' + tmp);
	$('#p_picture_url').val(tmp);
}

$(document).on('click', '.submitForm', function(){
	$(".notification .message").html("Creating event!")
	createModal('notification');
});

$(document).on('click', '.notification .proceed_icon', function(){
	addEvent();
});

function showFile(){
	console.log("showing file");
	counter = 0;
	$('.thumbs .col-xs-4').each(function(){
		if($(this).hasClass('active')){
			counter++;
		}
	});
	if(counter > 0)
		$('#picture_icon').val($('#file').val());
	else
		$("#p_picture_url").val($('#file').val());
		$(".submit_ppicture").show();

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


function createPlaceDropdown(){
	url = "/Places/getAllPlaces";
	var data =  {};
	callback = handleCreatePlaceDropdown;
	ajaxCall(url, data, callback);
}

function handleCreatePlaceDropdown(result){

	insert = "Or choose an already created place :<select><option></option>";
	name_array = [];
	$.each(result, function(i, item){
		name_array.push(item.name);
		insert += "<option value=\"" + item.id + "\">" + item.name + "</option>";
	});
	insert += "</select>";
	$("#place_dropdown").html(insert);
}

function addEvent(){
	$('#add_event_form').validate({
			rules: {
				name: "required",
				date_from: "required",
				date_to: "required",
				time_from: "required",
				time_to: "required"
			},
			messages: {
				name: "Please enter your name",
				date_from: "Please enter a start date",
				date_to: "Please enter an end date",
				time_from: "Please enter a start time",
				time_to: "please enter an end time"

			}
		});
		if($('#add_event_form').valid()) {
			console.log("valid..");
			count = 0;
			$('#add_event .tags .tag').each(function(){
				console.log("Counting");
				count++;
			});
			if(count > 1) {
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
				place_id = $("#place_dropdown option:selected").val();
				date_from = $('#date_from').val();
				date_to = $('#date_to').val();
				time_from = $('#time_from').val();
				time_to = $('#time_to').val();
				tags = "";
				socials = "";
				$('#add_event .tags .tag').each(function(){
					id = $(this).attr('id');
					tags += id + ":" + $(this).text() + ";";
				});
				$('#add_event .socials .social_url input').each(function(){
					id = $(this).attr('id'); 
					if($(this).val() != "")
						socials += id + ";" + $(this).val() + " "; 
				});
				url = "/Events/addEvent";
				var data =  {"name" : name,
						 "email" : email,
						 "website" : website,
						 "about" : about,
						 "ppicture" : ppicture,
						 "street" : street,
						 "housenr" : house_nr,
						 "place_id" : place_id,
						  "date_from" : date_from,
						 "date_to" : date_to,
						 "time_from" : time_from,
						 "time_to" : time_to,
						 "city" : city,
						 "tags" : tags,
						 "socials" : socials,
						 "user_id" : user_id
				};
				callback = handleAddEvent;
				ajaxCall(url, data, callback);
			}
		}


}

function handleAddEvent(result){
	//console.log(result);
	window.location.href = "/Users/userPage";
}

function createDatepickers(){
	$('#date_from').datetimepicker({
		timepicker:false,
		format:'Y-m-d'
	});
	$('#date_to').datetimepicker({
		timepicker:false,
		format:'Y-m-d'
	});
	$('#time_from').datetimepicker({
		datepicker: false,
		format:'H:i'
	});
	$('#time_to').datetimepicker({
		datepicker: false,
		format:'H:i'
	});
}