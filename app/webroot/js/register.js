/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 
var crop_coords = "";
$(document).on('ready', function(){
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


$(document).on('click', '.works1', function(){
	$('.thumbs .col-xs-4').each(function(){
		active = $(this).attr('class').split(' ');
		if(active[3] == 'active') {
			$('.work_url input').each(function(){
				classes = $(this).attr('id').split("_");
				console.log(classes);
				if(active[2] == classes[2] && $(this).val().length > 0) {
					if(classes[0] == "picture") {
						//NEED HELP CASPER
					} else {
						console.log(active[2]);
						$('.' + active[2]).css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
						$('.' + active[2]).css('background-position', '0 0');
						$('.' + active[2]).css('background-size', 'contain');
					}
				}
			});
		}
	});
	if($(this).hasClass('active')) {
		$('.thumbs').css('height', '71px');
		$(this).removeClass('active');
		$('.works .thumbs').css('background', 'none');
		$(this).css('background', 'url(\'/img/user_profile/join/add.png\') no-repeat');
		$(this).css('background-position', '0 0');
		$(this).css('background-size', 'contain');
		$('.approve_work').hide();
		$('.work_types').hide();
		$('.work_url').hide();
		$('.work_url input').each(function(){
			classes = $(this).attr('id').split("_");
			console.log(classes);
			if(classes[2] == "works1" && $(this).val().length > 0) {
				if(classes[0] == "picture") {
					//NEED HELP CASPER
				} else {
					$('.works1').css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
					$('.works1').css('background-position', '0 0');
					$('.works1').css('background-size', 'contain');
				}
			}
		});
	} else {
		$('.thumbs .col-xs-4').removeClass('active');
		$('.work_url').hide();
		$('.approve_work').hide();
		$('.work_type').css('opacity', '0.3');
		$(this).css('background', 'none');
		$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_left_small.png\')');
		$('.thumbs').css('background-repeat', 'no-repeat');
		$('.thumbs').css('background-size', 'contain');
		$('.thumbs').css('height', '138px');
		$(this).addClass('active');
		$('.work_types').show();
		$('.work_url input').each(function(){
			classes = $(this).attr('id').split("_");
			$(this).hide();
			if(classes[2] == "works1"){
				console.log(classes);
				$(this).show();
				$('.work_url').show();
				$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
				$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_left_large.png\')');
				$('.thumbs').css('background-repeat', 'no-repeat');
				$('.thumbs').css('background-size', '95% 100%');
				$('.approve_work').show();
				if($(window).innerWidth() > 676)
					$('.thumbs').css('height', '187px');
				else {
					$('.thumbs').css('height', '170px');
				}
			}
			
		});
	}
});
$(document).on('click', '.works2', function(){
	$('.thumbs .col-xs-4').each(function(){
		active = $(this).attr('class').split(' ');
		if(active[3] == 'active') {
			$('.work_url input').each(function(){
				classes = $(this).attr('id').split("_");
				console.log(classes);
				if(active[2] == classes[2] && $(this).val().length > 0) {
					if(classes[0] == "picture") {
						//NEED HELP CASPER
					} else {
						console.log(active[2]);
						$('.' + active[2]).css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
						$('.' + active[2]).css('background-position', '0 0');
						$('.' + active[2]).css('background-size', 'contain');
					}
				}
			});
		}
	});
	if($(this).hasClass('active')) {
		$('.thumbs').css('height', '71px');
		$(this).removeClass('active');
		$('.works .thumbs').css('background', 'none');
		$(this).css('background', 'url(\'/img/user_profile/join/add.png\') no-repeat');
		$(this).css('background-position', '0 0');
		$(this).css('background-size', 'contain');
		$('.approve_work').hide();
		$('.work_types').hide();
		$('.work_url').hide();
		$('.work_url input').each(function(){
			classes = $(this).attr('id').split("_");
			console.log(classes);
			if(classes[2] == "works2" && $(this).val().length > 0) {
				if(classes[0] == "picture") {
					//NEED HELP CASPER
				} else {
					$('.works2').css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
					$('.works2').css('background-position', '0 0');
					$('.works2').css('background-size', 'contain');
				}
			}
		});
	} else {
		$('.thumbs .col-xs-4').removeClass('active');
		$('.work_url').hide();
		$('.approve_work').hide();
		$('.work_type').css('opacity', '0.3');
		$(this).css('background', 'none');
		$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_middle_small.png\')');
		$('.thumbs').css('background-repeat', 'no-repeat');
		$('.thumbs').css('background-size', 'contain');
		$('.thumbs').css('height', '138px');
		$(this).addClass('active');
		$('.work_types').show();
		$('.work_url input').each(function() {
			classes = $(this).attr('id').split("_");
			$(this).hide();
			if(classes[2] == "works2"){
				console.log(classes);
				$(this).show();
				$('.work_url').show();
				$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
				$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_middle_large.png\')');
				$('.thumbs').css('background-repeat', 'no-repeat');
				$('.thumbs').css('background-size', '95% 100%');
				if($(window).innerWidth() > 676)
					$('.thumbs').css('height', '187px');
				else {
					$('.thumbs').css('height', '170px');
				}
			}
			
		});
	}
});

$(document).on('click', '.works3', function(){
	$('.thumbs .col-xs-4').each(function(){
		active = $(this).attr('class').split(' ');
		if(active[3] == 'active') {
			$('.work_url input').each(function(){
				classes = $(this).attr('id').split("_");
				console.log(classes);
				if(active[2] == classes[2] && $(this).val().length > 0) {
					if(classes[0] == "picture") {
						//NEED HELP CASPER
					} else {
						console.log(active[2]);
						$('.' + active[2]).css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
						$('.' + active[2]).css('background-position', '0 0');
						$('.' + active[2]).css('background-size', 'contain');
					}
				}
			});
		}
	});
	if($(this).hasClass('active')) {
		$('.thumbs').css('height', '71px');
		$(this).removeClass('active');
		$('.works .thumbs').css('background', 'none');
		$(this).css('background', 'url(\'/img/user_profile/join/add.png\') no-repeat');
		$(this).css('background-position', '0 0');
		$(this).css('background-size', 'contain');
		$('.approve_work').hide();
		$('.work_types').hide();
		$('.work_url').hide();
		$('.work_url input').each(function(){
			classes = $(this).attr('id').split("_");
			console.log(classes);
			if(classes[2] == "works3" && $(this).val().length > 0) {
				if(classes[0] == "picture") {
					//NEED HELP CASPER
				} else {
					$('.works3').css('background', 'url(\'/img/social/' + classes[0] + '.png\') no-repeat');
					$('.works3').css('background-position', '0 0');
					$('.works3').css('background-size', 'contain');
				}
			}
		});
	} else {
		$('.thumbs .col-xs-4').removeClass('active');
		$('.work_url').hide();
		$('.approve_work').hide();
		$('.work_type').css('opacity', '0.3');
		$(this).css('background', 'none');
		$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_right_small.png\')');
		$('.thumbs').css('background-repeat', 'no-repeat');
		$('.thumbs').css('background-size', 'contain');
		$('.thumbs').css('height', '138px');
		$(this).addClass('active');
		$('.work_types').show();
		$('.work_url input').each(function(){
			classes = $(this).attr('id').split("_");
			$(this).hide();
			if(classes[2] == "works3"){
				console.log(classes);
				$(this).show();
				$('.work_url').show();
				$(".work_types ." + classes[0] + "_icon").css('opacity', '1');
				$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_right_large.png\')');
				$('.thumbs').css('background-repeat', 'no-repeat');
				$('.thumbs').css('background-size', '95% 100%');
				if($(window).innerWidth() > 676)
					$('.thumbs').css('height', '187px');
				else {
					$('.thumbs').css('height', '170px');
				}
			}
			
		});
	}
});
$(document).on('click', '.work_type', function(){
	temp = $(this);
	$('#register .thumbs .work_types .work_type').each(function(){
		$(this).removeClass('active');
	});
	$('.approve_work img').attr('src', '/img/side_buttons/sidebuttons_right/save.png');	

	$('.work_type').css('opacity', '0.3');
	temp.addClass('active')
	$('.work_url input').hide();
	active_work = [];
	$('.thumbs .col-xs-4').each(function(i,item){
		if($(item).hasClass('active')) {
			active_work = $(item).attr('class').split(' ');
			$('.thumbs').css('background', 'url(\'/img/user_profile/join/works_' + active_work[1] + '_large.png\')');
			$('.thumbs').css('background-repeat', 'no-repeat');
			$('.thumbs').css('background-size', '95% 100%');
			if($(window).innerWidth() > 676)
				$('.thumbs').css('height', '187px');
			else {
				$('.thumbs').css('height', '170px');
			}
		}
	});

	$('.approve_work').show();

	temp.css('opacity', '1.0');
	classes = temp.attr('class').split(' ');
	$('.work_url input').each(function(i, item){
		if($(item).attr('id').slice(-6) == active_work[2]){
			$(item).remove();
		}
	});
	if(temp.hasClass("picture_icon"))
		$('.work_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "_" + active_work[2] + "\" type=\"text\" placeholder=\"Add picture here.\" />");
	else
		$('.work_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "_" + active_work[2] + "\" type=\"text\" placeholder=\"Paste the link here.\" />");
	
	$('.work_url').show();
});

$(document).on('change', '.work_url col-xs-9', function(){
	console.log("change");
})

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
	$('.approve_social img').attr('src', '/img/side_buttons/sidebuttons_right/save_filled.png');	
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
$(document).on('click', '.social_types .social_type', function(){
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
		$('.social_url').append("<input class=\"col-xs-9\" id=\"" + classes[2] + "\" type=\"text\" placeholder=\"Paste profile link here\" />");
	$('.social_url').show();
});

$(document).on('click', '#register_tags .search_button', function(){
	if($(window).innerWidth() > 767) {
		$('#register_works').show();
	} else {
		$('#register_works').show();
		$('.hide_on_xs').show();
	}
	$('.submitForm').show();
	$('#register_tags').hide();
});

$(document).on('click', '.addtag', function(){
	if($(window).innerWidth() < 767) {
		$('.hide_on_xs').hide();	
		$('.submitForm').hide();
	}
	$('#register_works').hide();
	$('#register_tags').show();
});

$(document).on('click', '#tags .tag', function(){
	counter = 0;
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).css('background', 'url("/img/tags/tag_line.png") no-repeat');
		$(this).css('background-size', '100%');
		tag = $(this);
		$('#register .tags .tag').each(function(){
			counter++;
			if($(this).attr('id') == tag.attr('id'))
				$(this).remove();
		});
	}
	else {
		$(this).addClass('active');
		$(this).css('background', 'url("/img/tags/tag_line_selected.png") no-repeat');
		$(this).css('background-size', '100%');
		$('#register .tags').append("<div class=\"pull-left tag\" id=\"" + $(this).attr('id') + "\">" + $(this).text() + "</div>");
	}
	counter = 0;
	$("#tags .tag").each(function(){
		 if($(this).hasClass('active')){
		 	counter++;
		 }
	});
	if(counter > 0) {
		$('#register_tags .search_button').show();
		if($('.errortag').is(':visible'))
			$('.errortag').hide();
	}
	else
		$('#register_tags .search_button').hide();

});

$(document).on('click', '.picture_icon', function(){
	$('#file').click();
});

$(document).on('click', '.ppicture', function(){
	console.log('click');
	if(!($('.ppicture img').hasClass('crop-image')))
		$('#file').click();
});


$(document).on('click', '.approve_work', function(){
	$("#register_works .works .work_types .work_type").each(function(){
		if($(this).hasClass('active') && $(this).hasClass('picture_icon')){
			$('#submit').click();
			
			filename = $('#file').val().split('\\');
			tmp = filename[filename.length - 1];
			$(".works .thumbs .work_url input").each(function(){
				if($(this).is(":visible"))
					$(this).val(tmp);
					$('#file').val('');
			});
			$('.thumbs .col-xs-4').each(function(){
				if($(this).hasClass('active'))
					classes = $(this).attr('class').split(' ')[2];
			});
			setTimeout(function() {
				setPicturePath(classes);
			}, 1000);	
		}
	});
	$('.approve_work img').attr('src', '/img/side_buttons/sidebuttons_right/save_filled.png');	
	
});
function setPicturePath(classes) {
	console.log(classes);
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	$('.' + classes[2]).css('background', 'url(\'/img/uploads/' + tmp + '\') no-repeat');
	$('.' + classes[2]).css('background-position', '0 0');
	$('.' + classes[2]).css('background-size', 'contain');
	$('#picture_icon_' + classes[2] + " input").val('/img/uploads/' + tmp);
	$('.approve_work').hide();
}
$(document).on('click', '.submit_ppicture', function(){
	$('#submit').click();
	setTimeout(setPath, 1000)
});

function setPath() {
	console.log("Setting Path...");
	filename = $('#file').val().split('\\');
	tmp = filename[filename.length - 1];
	//if(window.innerWidth() > 992){
	$('.ppicture img').attr('src', '/img/uploads/' + tmp);
	$('#p_picture_url').val(tmp);

	//crop resize functionaliteit!
	$('#p_picture_url_crop').val(tmp);
	
	$('.submit_ppicture').hide();
	
	//crop resize functionaliteit!
	$('.crop').show();
}
var jcrop_api;

$(document).on('click', '.crop', function(){
	$('.ppicture img').removeClass('img-responsive');
	$('.ppicture img').addClass('crop-image');
	$('.ppicture img').Jcrop({
            onSelect: showCoords,
            onChange: showCoords,
            bgColor: '',
            aspectRatio: 1
        }, function(){jcrop_api = this});
	$('.crop').hide();
	$('.submit_cropped').show();
});

$(document).on('click', '.submit_cropped', function(){
	src = $(".crop-image").attr('src');
	url = "/Users/cropImage";
	data = {'coords' : crop_coords,
			'src' : src
		}
	callback = handleCropImage;
	ajaxCall(url, data, callback);
});

function handleCropImage(result){
	jcrop_api.disable();
	$('.jcrop-holder').hide();
	$('.submit_cropped').hide();

	$(".ppicture img").removeAttr("src").attr("src", result);
	$(".ppicture img").show();
	$(".ppicture img").attr('style', '');

	$('.ppicture img').addClass('img-responsive');
	$('.ppicture img').removeClass('crop-image');
	$('#p_picture_url').val(result);
}

function showCoords(c)
  {
      // variables can be accessed here as
      // c.x, c.y, c.x2, c.y2, c.w, c.h
      crop_coords = c.x + " " + c.y + " " + c.w + " " + c.h;
  };

$(document).on('click', '.approve_work', function(){
		$(".thumbs .col-xs-4").each(function(){
			if($(this).hasClass('active')){
				classes = $(this).attr('class').split(' ');
				position = $("#position").val(classes[1]);
				$("#register .thumbs .work_url input").each(function(){
					if($(this).is(":visible")){
						url = $(this).val();
					}
				});
				//$("#register .thumbs ." + classes[1]).html("");
				//$("#register .thumbs ." + classes[1]).html(url);
			}

		});
	
});

$(document).on('click', '.submitForm', function(){
	$('#register_form').validate({
			rules: {
				name: "required",
				email: "required",
				password: "required",
				password_retype: {
					required: true,
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
		if($('#register_form').valid()) {
			console.log("valid..");
			count = 0;
			$('#register .tags .tag').each(function(){
				console.log("Counting");
				count++;
			});
			if(count > 1) {
				var works = "";
				var tags = "";
				var socials = "";
				var ppicture = $('#p_picture_url').val();
				var name = $('#name').val();
				var email = $('#email').val();
				var password  = $('#password').val();
				var website = $('#website').val();
				var type = $.cookie('register_as');
				var phonenumber = $('#phone').val();
				var street = $('#street').val();
				var number = $('#house_nr').val();
				var city = $('#city').val();
				var area = $('#area').val();

				$('#register .works .thumbs .work_url input').each(function(){
					id = $(this).attr('id').split('_');
					val = $(this).val();
					console.log(id);
					if(val.indexOf("http") < 0 && id[0] != 'picture')
						works += id[0] + ";http://" + $(this).val() + " ";
					else
						works += id[0] + ";" + $(this).val() + " ";
				});

				$('#register .tags .tag').each(function(){
					if(!($(this).hasClass('errortag'))){
						id = $(this).attr('id');
						tags += id + ":" + $(this).text() + ";";
					}
				});

				$('#register .socials .social_url input').each(function(){
					id = $(this).attr('id'); 
					if($(this).val() != ""){
						if($(this).val().indexOf("http") < 0)
							socials += id + ";http://" + $(this).val() + " "; 
						else
							socials += id + ";" + $(this).val() + " ";
					}
				});
				url = "/Users/registerUser";
				var data =  {"name" : name,
						 "email" : email,
						 "password" : password,
						 "website" : website,
						 "phone" : phonenumber,
						 "type" : type,
						 "ppicture" : ppicture,
						 "street" : street,
						 "housenr" : number,
						 "city" : city,
						 "area" : area,
						 "works" : works,
						 "tags" : tags,
						 "socials" : socials
				};
				callback = handleRegisterUser;
				ajaxCall(url, data, callback);
			}
			else 
				$('.errortag').show();
		}
});

function handleRegisterUser(result){
	insert = "";
	if(result == "addUser"){
		window.location.href = '/Users/userPage';
	}
	if(result == "email is already being used, use another"){
		$(".errormessage").remove();
		insert = "<div class=\"errormessage\">" + result + "</div>";
		$(insert).insertAfter("#register .creds #email");
		$("#email").css("border-color", "red");
	}
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
}