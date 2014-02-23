<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('profile'); ?>
<?php echo $this->Html->css('profile'); ?>
<div id="user_page" class="container">
	<div class="col-xs-12 col-sm-8">
		<div class="col-xs-12 ppicture img-circle">
			<img class="img-responsive img-circle" src="/img/user/default.png" />
		</div>
		<div class="col-xs-12 name"></div>
		<!--<div class="col-xs-12 profession">Software Developer</div>-->
		<div class="col-xs-12 creds">
			<table>
				<tr id="tr_website">
					<td>
						<img class="img-responsive" src="/img/user_profile/url.png">
					</td>
					<td class="website"></td>
				</tr>
				<tr id="tr_email">
					<td>
						<img class="img-responsive" src="/img/user_profile/mail.png">
					</td>
					<td class="email"></td>
				</tr>
				<tr id="tr_phone">
					<td>
						<img class="img-responsive" src="/img/user_profile/phone.png">
					</td>
					<td class="phone"></td>
				</tr>
			</table>
		</div>
		<hr/>
		<div class="col-xs-12 col-sm-9 works" style="display: none;"></div>
	</div>
	<div class="col-xs-12 col-sm-4" style="height: 100%;">
		<hr class="hidden-lg hidden-md" />
		<div class="col-xs-12 tags"></div>
		<hr />
		<div class="col-xs-12 socials"></div>
		<hr/>
		<div class="col-xs-12 location_container">
			<div class="title">LOCATION</div>
			<img class="img-responsive" src="/img/user_profile/location.png" />
			<div class="col-xs-12 location"></div>
		</div>
	</div>
</div>
<div class="favorite_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/favorite.png">
</div>
<div class="close_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/close.png">
</div>
<div class="sidebar_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/menu.png">
</div>
<div id="sidebar" style="display: none;">
	<a href="/Users/userPage">
		<div class="col-xs-12 sidebar_row">
			<div class="home_image col-xs-4">
				<img class="img-responsive" src="/img/user_profile/sidebar/home.png">
			</div>
			<div class="text col-xs-8">Home</div>
		</div>
	</a>
	<div class="col-xs-12 sidebar_row" id="user">
		<div class="user_image col-xs-4">
			<img class="img-responsive" src="/img/user_profile/sidebar/user.png">
		</div>
		<div class="text col-xs-8">Your Profile</div>
	</div>
	<div class="sidebar_dropdown col-xs-12" id="user_dropdown" style="display: none;">
		<div class="edit col-xs-6">
			<img class="img-responsive" src="/img/user_profile/sidebar/edit.png">
		</div>
		<div class="delete col-xs-6 pull-right">
			<img class="img-responsive" src="/img/user_profile/sidebar/delete.png">
		</div>
	</div>
	<div class="col-xs-12 sidebar_row" id="event">
		<div class="event_image col-xs-4">
			<img class="img-responsive" src="/img/user_profile/sidebar/event.png">
		</div>
		<div class="text col-xs-8">Your Events</div>
	</div>
	<div class="sidebar_dropdown col-xs-12" id="event_dropdown" style="display: none;">
		<div class="add_event">
			<a href="/Users/addEvent">
				<img class="img-responsive" src="/img/user_profile/sidebar/add.png" />
			</a>
		</div>
	</div>
	<div class="col-xs-12 sidebar_row" id="place">
		<div class="place_image col-xs-4">
			<img class="img-responsive" src="/img/user_profile/sidebar/place.png">
		</div>
		<div class="text col-xs-8">Your Places</div>
	</div>
	<div class="sidebar_dropdown col-xs-12" id="place_dropdown" style="display: none;">
		<div class="add_place">
			<a href="/Users/addPlace">
				<img class="img-responsive" src="/img/user_profile/sidebar/add.png" />
			</a>
		</div>
	</div>

	<div class="col-xs-12 sidebar_row" id="logout">
		<div class="place_image col-xs-4">
			<img class="img-responsive" src="/img/user_profile/sidebar/logout.png">
		</div>
		<div class="text col-xs-8">Logout</div>
	</div>
</div>