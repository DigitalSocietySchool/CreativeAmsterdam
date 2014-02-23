<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('event'); ?>
<?php echo $this->Html->css('event'); ?>
<div id="event_page" class="container">
	<div class="col-xs-12 col-sm-8">
		<div class="col-xs-12 ppicture">
			<img class="img-responsive">
		</div>
		<div class="col-xs-12 name"></div>
		<div class="col-xs-12 time_date">
			<div class="col-xs-6 date">
				<div class="col-xs-12 date_day"></div>
				<div class="col-xs-12 date_month"></div>
			</div>
			<div class="col-xs-6 time">
				<div class="col-xs-12 time_start"></div>
				<div class="col-xs-12 time_end"></div>
			</div>
		</div>
		<div class="col-xs-8 about"></div>
		<hr class="visible-xs" />
	</div>
	<div class="col-xs-12 col-sm-4" style="height: 100%;">
		<div class="col-xs-12 tags">
			<div class="title">TAGS</div>
		</div>
		<hr/>
		<div class="col-xs-12 socials">
			<div class="title">SOCIAL & CONTACTS</div>
		</div>
		<hr/>
		<div class="col-xs-12 location_container">
			<div class="title">LOCATION</div>
			<img class="img-responsive" src="/img/event_profile/location.png" />
			<div class="col-xs-12 location"></div>
		</div>
	</div>
</div>
<div class="edit_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/edit.png">
</div>
<div class="delete_button">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/erase.png">
</div>
<div class="close_button" style="display: none;">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/close.png">
</div>
</div>