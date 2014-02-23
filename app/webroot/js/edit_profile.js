/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
$(document).on('ready', function(){
	getUser();
	createSocialUser();
	createTagsUser();
	createUserWorks();
	createUserPlace();
	createSearchTags();
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

$(document).on('click', '.picture_icon', function(){
	$('#file').click();
});

$(document).on('click', '.ppicture', function(){
	$('#file').click();
});

$(document).on('click', '.submit_ppicture', function(){
	$('#submit').click();
	setTimeout(setPath, 1000)
});

function setPath() {
	console.log("Setting Path...");
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('.ppicture img').attr('src', '/img/uploads/' + tmp);
	$('.ppicture').css('background-image', 'url(\'/img/uploads/' + tmp + "\')");
	$('#p_picture_url').val(tmp);
}

function alertFilename(){
	counter = 0;
	$('.thumbs .col-xs-4').each(function(){
		if($(this).hasClass('active')){
			counter++;
		}
	});
	if(counter > 0)
		$('#picture_icon').val($('#file').val());
	else{
		$("#p_picture_url").val($('#file').val());
		$(".submit_ppicture").show();
	}
}

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

$(document).on('click', '.addtag', function(){
	if($(window).innerWidth() < 767) {
		$('.hide_on_xs').hide();	
		$('.submitForm').hide();
	}
	$('#edit_profile_works').hide();
	$('#edit_profile_tags').show();
});
$(document).on('click', '#edit_profile #change_password_button', function(){
	if($('#edit_profile #changePassword').is(':hidden')) {
		$('#edit_profile #change_password_button').html("What was I thinking? My password is perfect!");
		$('#edit_profile #changePassword').show();
	}
	else if($('#edit_profile #changePassword').is(':visible')) {
		$('#edit_profile #change_password_button').html("Change password");
		$('#edit_profile #changePassword').hide();
	}
});

$(document).on('click', '#tags .tag', function(){
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).css('background', 'url("/img/tags/tag_line.png") no-repeat');
		$(this).css('background-size', '100%');
		tag = $(this);
		$('#edit_profile .tags .tag').each(function(){
			if($(this).attr('id') == tag.attr('id'))
				$(this).remove();
		});
	}
	else {
		$(this).addClass('active');
		$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
		$(this).css('background-size', '100%');
		$('#edit_profile .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	}
	counter = 0;
	$("#tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0)
		$('#edit_profile_tags .search_button').show();
	else
		$('#edit_profile_tags .search_button').hide();

});

$(document).on('click', '.works1', function(){
	$('.thumbs .col-xs-4').removeClass('active');
	$('.work_url').hide();
	$('.approve_work').hide();
	$('.work_type').css('opacity', '0.3');
	$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_left_small.png\')');
	$('.thumbs').css('background-repeat', 'no-repeat');
	$('.thumbs').css('background-size', 'contain');
	$('.thumbs').css('height', '160px');
	$(this).addClass('active');
	$('.work_types').show();
	$('.work_url input').each(function(){
		classes = $(this).attr('id').split("_");
		$(this).hide();
		if(classes[2] == "works1"){
			$(this).show();
			$('.work_url').show();
			$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
			$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_left_large.png\')');
			$('.thumbs').css('background-repeat', 'no-repeat');
			$('.thumbs').css('background-size', '100% 100%');
			if($(window).innerWidth() > 676)
				$('.thumbs').css('height', '198px');
			else {
				$('.thumbs').css('height', '170px');
			}
		}
	})
});
$(document).on('click', '.works2', function(){
	$('.thumbs .col-xs-4').removeClass('active');
	$('.work_url').hide();
	$('.approve_work').hide();
	$('.work_type').css('opacity', '0.3');
	$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_middle_small.png\')');
	$('.thumbs').css('background-repeat', 'no-repeat');
	$('.thumbs').css('background-size', 'contain');
	$('.thumbs').css('height', '160px');
	$(this).addClass('active');
	$('.work_types').show();
	$('.work_url input').each(function(){
		classes = $(this).attr('id').split("_");
		$(this).hide();
		if(classes[2] == "works2"){
			$(this).show();
			$('.work_url').show();
			$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
			$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_middle_large.png\')');
			$('.thumbs').css('background-repeat', 'no-repeat');
			$('.thumbs').css('background-size', '100% 100%');
			if($(window).innerWidth() > 676)
				$('.thumbs').css('height', '198px');
			else {
				$('.thumbs').css('height', '170px');
			}
		}
		
	})
});
$(document).on('click', '.works3', function(){
	$('.thumbs .col-xs-4').removeClass('active');
	$('.work_url').hide();
	$('.approve_work').hide();
	$('.work_type').css('opacity', '0.3');
	$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_right_small.png\')');
	$('.thumbs').css('background-repeat', 'no-repeat');
	$('.thumbs').css('background-size', 'contain');
	$('.thumbs').css('height', '160px');
	$(this).addClass('active');
	$('.work_types').show();
	$('.work_url input').each(function(){
		classes = $(this).attr('id').split("_");
		$(this).hide();
		if(classes[2] == "works3"){
			$(this).show();
			$('.work_url').show();
		}
	})
	$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
	$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_right_large.png\')');
	$('.thumbs').css('background-repeat', 'no-repeat');
	$('.thumbs').css('background-size', '100% 100%');
	if($(window).innerWidth() > 676)
		$('.thumbs').css('height', '198px');
	else {
		$('.thumbs').css('height', '170px');
	}
});

$(document).on('click', '.work_type', function(){
	console.log("clicking on work_type..");
	temp = $(this);
	active_work = [];
	$('.approve_work img').attr('src', '/img/side_buttons/sidebuttons_right/save.png');	
	
	$('#edit_profile .thumbs .work_types .work_type').each(function(){
		$(this).removeClass('active');
	});
	$('.work_type').css('opacity', '0.3');
	temp.addClass('active')
	$('.work_url input').hide();
	$('.thumbs .col-xs-4').each(function(i,item){
		temp_this = $(this).attr('class').split('_');
		current_work = temp_this[3];
		if($(item).hasClass('active')) {
			active_work = $(this).attr('class').split(' ');
		}
		if(active_work[3] == 'active'){
			$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_' + active_work[1] + '_large.png\')');
			$('.thumbs').css('background-repeat', 'no-repeat');
			$('.thumbs').css('background-size', '100% 100%');
			$('.thumbs').css('height', '150px');
			if($(window).innerWidth() > 676)
				$('.thumbs').css('height', '198px');
			else {
				$('.thumbs').css('height', '170px');
			}
		}
	});

	

	$('.approve_work').show();


	temp.css('opacity', '1.0');
	classes = temp.attr('class').split(' ');
	counter = 0;
	id_check = classes[2] + "_" + active_work[2];
	$('.work_url input').each(function(i, item){
		if($(item).attr('id').slice(-6) == active_work[2]){
			console.log("it already exists..");
			$(item).remove();
		}
	});
	if(temp.hasClass("picture_icon"))
		$('.work_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "_" + active_work[2] + "\" type=\"text\" placeholder=\"Add picture here.\" />");
	else
		$('.work_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "_" + active_work[2] + "\" type=\"text\" placeholder=\"Paste the link here.\" />");
	
	$('.work_url').show();
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
		$('.add_social img').attr('src', '/img/user_profile/join/social_small.png');
		$('.add_social').css('width', '100%');
		$('.add_social').addClass('active');
		$('.social_types').show();
		$('.socials .filled_in').hide();
	}
		/*$('.add_social img').attr('src', '/img/user_profile/join/social_small.png');
		$('.add_social').css('width', '100%');
		$('.socials').css('width', '95vw');
		$('.social_types').show();*/
});
$(document).on('click', '.social_type', function(){
	if(!($('.add_social').hasClass("active"))){
		$('.add_social img').attr('src', '/img/user_profile/join/social_small.png');
		$('.add_social').css('width', '100%');
		$('.add_social').addClass('active');
		$('.social_types').show();
		$('.socials .filled_in').hide();
	}

	$('.social_type').removeClass('active');
	$(this).addClass('active');
	$('.social_type').css('opacity', '0.3');
	$('.social_url input').hide();
	$('.add_social img').attr('src', '/img/user_profile/join/social_large.png');
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

$(document).on('click', '.approve_work', function(){
	$("#edit_profile_works .works .work_types .work_type").each(function(){
		if($(this).hasClass('active') && $(this).hasClass('picture_icon')){
			$('#submit').click();
			
			filename = $('#file').val().split('\\');
			tmp = filename[filename.length - 1];
			$(".works .thumbs .work_url input").each(function(){
				if($(this).is(":visible"))
					$(this).val(tmp);
			});
		}
	});
	$('.approve_work img').attr('src', '/img/side_buttons/sidebuttons_right/save_filled.png');	
	
});

$(document).on('click', '#edit_profile_tags .search_button', function(){
	/*$("#edit_profile .tags").html("");
	$("#edit_profile .tags").html("<div class=\"title\">TAGS</div><div class=\"addtag pull-left\">+</div>");
	$('#edit_profile_tags .active').each(function(){
		$('#edit_profile .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	});
	$('#edit_profile').show();
	$('#edit_profile_tags').hide();*/
	if($(window).innerWidth() > 767) {
		$('#edit_profile_works').show();
	} else {
		$('#edit_profile_works').show();
		$('.hide_on_xs').show();
	}
	$('.submitForm').show();
	$('#edit_profile_tags').hide();
});

$(document).on('click', '.submitForm', function(){
	$('#edit_profile_form').validate({
			rules: {
				name: "required",
				email: "required",
				password_retype: {
					equalTo: "#password"
				}
			},
			messages: {
				name: "Please enter your name",
				email: "Please enter a valid email",
				password: "Please provide a password",
				password_retype: {
					required: "Please provide a password",
					equalTo: "Please enter the same password as above",
				}
			}
		});
		if($('#edit_profile_form').valid()) {
			count = 0;
			$('#edit_profile .tags .tag').each(function(){
				count++;
			});
			if(count > 0) {
				var works = "";
				var tags = "";
				var socials = "";
				var ppicture = $('#p_picture_url').val();
				var name = $('#name').val();
				var email = $('#email').val();
				if($('#password').val() != "")
					var password  = $('#password').val();
				var website = $('#website').val();
				var phonenumber = $('#phone').val();
				var street = $('#street').val();
				var number = $('#house_nr').val();
				var city = $('#city').val();
				var area = $('#area').val();

				$('#edit_profile .works .thumbs .work_url input').each(function(){
					id = $(this).attr('id').split('_');
					val = $(this).val();
					if(val.indexOf("http") < 0 && id[0] != 'picture'){
						works += id[0] + ";http://" + $(this).val() + " ";
					}
					else{
						console.log("normale val");
						works += id[0] + ";" + $(this).val() + " ";
					}
				});
				$('#edit_profile .tags .tag').each(function(){
					id = $(this).attr('id');
					tags += id + ":" + $(this).text() + ";";
				});
				$('#edit_profile .socials .social_url input').each(function(){
					id = $(this).attr('id'); 
					if($(this).val() != ""){
						if($(this).val().indexOf("http") < 0)
							socials += id + ";http://" + $(this).val() + " "; 
						else
							socials += id + ";" + $(this).val() + " ";
					} 
				});
				url = "/Users/editUser";
				var data =  {"name" : name,
						 "email" : email,
						 "password" : password,
						 "website" : website,
						 "phone" : phonenumber,
						 "ppicture" : ppicture,
						 "street" : street,
						 "housenr" : number,
						 "city" : city,
						 "area" : area,
						 "works" : works,
						 "tags" : tags,
						 "socials" : socials
				};
				callback = handleEditProfile;
				ajaxCall(url, data, callback);
			}
		}
});

function handleEditProfile(result){
	insert = "";
	if(result == "addUser"){
		window.location.href = '/Users/profile';
	}
	if(result == "email is already being used, use another"){
		$(".errormessage").remove();
		insert = "<div class=\"errormessage\">" + result + "</div>";
		$(insert).insertAfter("#edit_profile .creds #email");
		$("#email").css("border-color", "red");
	}
}


function getUser() {
	url = "/Users/getUser";
	data =  {};
	callback = handleGetUser;
	ajaxCall(url, data, callback);
}
function handleGetUser(result) {
	if(result.p_picture != null) {
		$('#edit_profile .ppicture').css('background', 'url(\'' + result.p_picture + '\') no-repeat');
		$('#edit_profile .ppicture').css('background-size', '100% auto');
		$('#edit_profile .ppicture').css('border-radius', '50%');
	}
	if(result.name != null)
		$('#name').val(result.name);
	if(result.email != null)
		$('#email').val(result.email);
	if(result.website != null)
		$('#website').val(result.website);
	if(result.phone != null)
		$('#phone').val(result.phone);
}

function createSocialUser() {
	url = "/Socials/getSocials";
	data = {'id': "", 'table': 'user'};
	callback = handlecreateSocialUser;
	ajaxCall(url, data, callback);
}

function handlecreateSocialUser(result) {
	$.each(result, function(i, item){
		$('#edit_profile .socials .' + $(item)[0]['Social'].name + '_approved').addClass('filled_in');
		$('#edit_profile .socials .' + $(item)[0]['Social'].name + '_approved').show();
		$('#edit_profile .social_types .' + $(item)[0]['Social'].name).addClass('active');
		$('#edit_profile .social_types .' + $(item)[0]['Social'].name).css('opacity', '1');
		$('#edit_profile .socials .social_url').append("<input class=\"col-xs-9\" id=\"" + $(item)[0]['Social'].name + "\" placeholder=\"Enter URL\" type=\"text\">");
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

function createTagsUser() {
	url = "/Tags/getTags";

	data =  {"id" : "", "table" : "user"};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID'), 'table': 'user'};

	//data =  {'table': 'user'};
	callback = handlecreateTagsUser;
	ajaxCall(url, data, callback);
}

function handlecreateTagsUser(result) {
	insert = "";
	$.each(result, function(i, item){
		insert += "<div id=\"" + i + "\" class=\"pull-left tag\">" + item + "</div>";
	});
	$('#edit_profile .tags').append(insert);
}
function createUserWorks(){
	data =  {"id" : ""};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID')};
	url = "/Users/getWorks";
	callback = handleCreateUserWorks;
	ajaxCall(url, data, callback);

}

function handleCreateUserWorks(result){
	counter = 1;
	insert = "";
	insert2 = "";
	$.each(result, function(i, item){
		if(item.path.indexOf('.png') >= 0  || item.path.indexOf('.jpg') >= 0){
			insert = "<div class=\"work\"><img class=\"img-responsive\" src=\"/img/uploads/" + item.path + "\" /></div>";
			insert2 = "<input type=\"text\" id=\"picture_icon_works" + counter + "\" style=\"display: none;\"/>";
			$("#edit_profile .work_url").append(insert2);
			$('#picture_icon_works' + counter).val(item.path);
		}
		else if(item.path.indexOf('youtube') >= 0){
			insert = "<div class=\"work\"><img class=\"img-responsive\" src=\"/img/social/youtube.png\" /></div>";
			insert2 = "<input type=\"text\" id=\"youtube_icon_works" + counter + "\" style=\"display: none;\"/>";
			$("#edit_profile .work_url").append(insert2);
			$('#youtube_icon_works' + counter).val(item.path);
		}
		else if(item.path.indexOf('vimeo') >= 0){
			insert = "<div class=\"work\"><img class=\"img-responsive\" src=\"/img/social/vimeo.png\" /></div>";
			insert2 = "<input type=\"text\" id=\"vimeo_icon_works" + counter + "\" style=\"display: none;\"/>";
			$("#edit_profile .work_url").append(insert2);
			$('#vimeo_icon_works' + counter).val(item.path);
		}
		else if(item.path.indexOf('soundcloud') >= 0){
			insert = "<div class=\"work\"><img class=\"img-responsive\" src=\"/img/social/soundcloud.png\" /></div>";
			insert2 = "<input type=\"text\" id=\"soundcloud_icon_works" + counter + "\" style=\"display: none;\"/>";
			$("#edit_profile .work_url").append(insert2);
			$('#soundcloud_icon_works' + counter).val(item.path);
		}
		//$("#edit_profile .works" + counter).html(insert);
		counter++;
	});
	if(counter > 1){
		$("#edit_profile .works").show();
	}
	
}
function createUserPlace() {
	url = "/Places/getPlace";
	data =  {"id" : ""};
	if($.cookie('status') == "visiting")
		data = {'id': $.cookie('showID')};
	callback = handlecreateUserPlace;
	ajaxCall(url, data, callback);
}

function handlecreateUserPlace(result) {
	$('#street').val(result.Location.street);
	$('#house_nr').val(result.Location.house_nr);
	$('#city').val(result.Location.city);
}
function createSearchTags() {
	url = "/Tags/getAllTags";
	data =  {};
	callback = handleCreateSearchTags;
	ajaxCall(url, data, callback);
}

function handleCreateSearchTags(result) {
	active_char = "A";//result[0].charAt(0);
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

	setTimeout(setActiveTags ,100);
}

function setActiveTags() {
	counter = 0;
	//console.log("before foreach");
	$('#edit_profile .tags .tag').each(function(i, item){
		//console.log("in first forech");
		$("#edit_profile_tags #tags .tag").each(function(){
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
		$('#edit_profile_tags .search_button').show();
	}
}