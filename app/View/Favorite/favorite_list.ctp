<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('favorite_list'); ?>
<?php echo $this->Html->css('favorite_list'); ?>
<div class="visible-lg visible-md logo">
	<img class="img-responsive" src="/img/laptop/logo.png" />
</div>
<div id="favorite_list" class="container">
<div class="favorite_message">No favorites were found!</div>
</div>
<div class="sidebar_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/menu.png">
</div>
<div id="sidebar" style="display: none;">
	<div id="close_menu" class="visible-lg visible-md">
		<img class="img-responsive" src="/img/laptop/favorite_list/close.png" />
	</div>
	<a href="/Users/userPage">
		<div class="col-xs-12 sidebar_row">
			<div class="home_image col-xs-4">
				<img class="img-responsive" src="/img/user_profile/sidebar/home.png">
			</div>
			<div class="text col-xs-8">Home</div>
		</div>
	</a>
	<div class="col-xs-12 sidebar_row" id="search">
		<div class="search_image col-xs-4">
			<img class="img-responsive" src="/img/search/search_sidebar.png">
		</div>
		<div class="text col-xs-8">Search Keywords</div>
	</div>
	<div class="sidebar_dropdown col-xs-12" id="search_dropdown" style="display: none;">
		<div class="search_box col-xs-10">
		 	<input class="col-xs-12" type="text" placeholder="Search.." id="search_fav_input"/>
		</div>
		<div class="submit_search col-xs-2">
			<img id="search_fav" class="img-responsive" src="/img/search/search_selected.png" />
		</div>
		<div class="clear_search col-xs-2">
			<img id="search_fav" class="img-responsive" src="/img/favorites/clear_selected.png" />
		</div>
	</div>
	<div class="col-xs-12 sidebar_row" id="categories">
		<div class="categories_image col-xs-4">
			<img class="img-responsive" src="/img/favorites/category.png">
		</div>
		<div class="text col-xs-8">Categories</div>
	</div>
	<div class="sidebar_dropdown col-xs-12" id="categories_dropdown" style="display: none;">
	<div class="col-xs-12">
		<div class="col-xs-6 user">
			<img id="filter_user" class="img-responsive" src="/img/favorites/user.png">
		</div>
		<div class="col-xs-6 org">
			<img id="filter_org" class="img-responsive" src="/img/favorites/organization.png">
		</div>
	</div>
	<div class="col-xs-12">
		<div class="col-xs-6 place">
			<img id="filter_place" class="img-responsive" src="/img/favorites/place.png">
		</div>
		<div class="col-xs-6 event">
			<img id="filter_event" class="img-responsive" src="/img/favorites/event.png">
		</div>
	</div>
	</div>
</div>
