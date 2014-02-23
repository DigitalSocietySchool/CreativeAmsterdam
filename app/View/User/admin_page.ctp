<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<div id="admin_page" class="container" style="height: 100%">
	<h1>Admin Page, where the power is unlimited!</h1>
	<div id="navigation" class="col-xs-3 pull-left" style="min-height: 100%">
		<ul>
			<li id="tags_anchor" style="cursor: pointer;">Add/Delete tags</li>
			<li id="user_anchor" style="cursor: pointer;">Remove User</li>
			<li id="place_anchor" style="cursor: pointer;">Remove Place</li>
			<li id="event_anchor" style="cursor: pointer;">Remove Event</li>
		</ul>
	</div>
	<div id="content" class="col-xs-9 pull-right" >
		<div id="tags" class="pull-left col-xs-12" style="display: none">
			<h1>Add/Delete tags</h1>
			<div class="col-xs-12">
				<input id="addtag" type="text" style="pull-left" />
				<div id="add_tag_button" class="pull-left">add</div>
			</div>
			<div id="delete_tags" class="col-xs-12" style="margin-top: 20px;"></div>
		</div>
		<div id="user" class="pull-left col-xs-12" style="display: none">
			<h1>Delete user</h1>
			<div id="user_list"></div>
		</div>
		<div id="place" class="pull-left col-xs-12" style="display: none">
			<h1>Delete place</h1>
			<div id="place_list"></div>
		</div>
		<div id="event" class="pull-left col-xs-12" style="display: none">
			<h1>Delete event</h1>
			<div id="event_list"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
	createTags();
	createUsers();
	createPlaces();
	createEvents();
	$(document).on('click', '#tags_anchor', function(){
		$('#content > div').hide();
		$('#tags').show();
	});
	$(document).on('click', '#user_anchor', function(){
		$('#content > div').hide();
		$('#user').show();
	});
	$(document).on('click', '#place_anchor', function(){
		$('#content > div').hide();
		$('#place').show();
	});
	$(document).on('click', '#event_anchor', function(){
		$('#content > div').hide();
		$('#event').show();
	});

	$(document).on('click', '#add_tag_button', function(){
		tag_name = $('#addtag').val();
		url = "/Tags/addTag";
		data =  {'tagname': tag_name};
		callback = handleAddTag;
		ajaxCall(url, data, callback);
	});
	$(document).on('click', '.delete_tag_button', function(){
		//AJAX CALL TO DELETE THE SINGLE CLICKED TAG, ID OF TAG IS SET OF ELEMENT ID
	});
	$(document).on('click', '.delete_user_button', function(){
		id = $(this).attr('id');
		url = "/Users/deleteProfile";
		data =  {'delete_id': id};
		callback = handleDeleteProfile;
		ajaxCall(url, data, callback);
	});
	$(document).on('click', '.delete_place_button', function(){
		id = $(this).attr('id');
		url = "/Places/deletePlace";
		data =  {'delete_id': id};
		callback = handleDeletePlace;
		ajaxCall(url, data, callback);
	});
	$(document).on('click', '.delete_event_button', function(){
		id = $(this).attr('id');
		url = "/Events/deleteEvent";
		data =  {'delete_id': id};
		callback = handleDeleteEvent;
		ajaxCall(url, data, callback);
	});
	function createTags() {
		url = "/Tags/getAllTags";
		data =  {};
		callback = handleCreateTags;
		ajaxCall(url, data, callback);
	}
	function handleCreateTags(result) {
		insert = "";
		$.each(result, function(i, item) {
			insert += "<div class=\"col-xs-12\"><p class=\"pull-left\">" + item[1] + "</p><div  id=\"" + item[0] + "\" class=\"delete_tag_button pull-left\" style=\"margin-left: 15px; cursor: pointer;\">X</div></div>";
		});
		$('#delete_tags').html(insert);
	}
	function createUsers() {
		url = "/Users/getAllUsers";
		data =  {};
		callback = handleCreateUsers;
		ajaxCall(url, data, callback);
	}
	function handleCreateUsers(result) {
		insert = "";
		$.each(result, function(i, item) {
			insert += "<div class=\"col-xs-12\"><p class=\"pull-left\">" + item.User.name + " " + item.User.email + "</p><div id=\"" + item.User.id + "\" class=\"delete_user_button pull-left\" style=\"margin-left: 15px; cursor: pointer;\">X</div></div>";
		});
		$('#user_list').html(insert);
	}
	function createPlaces() {
		url = "/Places/getAllPlaces";
		data =  {};
		callback = handleCreatePlaces;
		ajaxCall(url, data, callback);
	}
	function handleCreatePlaces(result) {
		insert = "";
		$.each(result, function(i, item) {
			insert += "<div class=\"col-xs-12\"><p class=\"pull-left\">" + item.name + "</p><div id=\"" + item.id + "\" class=\"pull-left delete_place_button\" style=\"margin-left: 15px; cursor: pointer;\">X</div></div>";
		});
		$('#place_list').html(insert);
	}
	function createEvents() {
		url = "/Events/getAllEvents";
		data =  {};
		callback = handleCreateEvents;
		ajaxCall(url, data, callback);
	}
	function handleCreateEvents(result) {
		insert = "";
		$.each(result, function(i, item) {
			insert += "<div class=\"col-xs-12\"><p class=\"pull-left\">" + item.Event.name + " " + item.Event.email + "</p><div id=\"" + item.Event.id + "\" class=\"pull-left delete_event_button\" style=\"margin-left: 15px; cursor: pointer;\">X</div></div>";
		});
		$('#event_list').html(insert);
	}
	function handleAddTag(result){
		$('#delete_tags').html('');
		createTags();
	}
	function handleDeleteProfile(result){
		$('#user_list').html('');
		createUsers();
	}
	function handleDeletePlace(result){
		$('#place_list').html('');
		createPlaces();
	}
	function handleDeleteEvent(result){
		$('#event_list').html('');
		createEvents();
	}
</script>