<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('place'); ?>
<?php echo $this->Html->css('place'); ?>
<div id="place_page" class="container">
	<div class="col-xs-12 col-sm-8">
		<div class="ppicture">
			<img class="img-responsive">
		</div>
		<div class="col-xs-12 name"></div>
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
		<div class="col-xs-12 pictures">
			<div class="title">PICTURES</div>
			<div class="col-xs-12">
				<div class="col-xs-4 picture" id="picture1">
					<input type="hidden" id="picture1_url">
					<img class="img-responsive img-circle" src="" />
				</div>
				<div class="col-xs-4 picture" id="picture2">
					<input type="hidden" id="picture2_url">
					<img class="img-responsive img-circle" src="" />
				</div>
				<div class="col-xs-4 picture" id="picture3">
					<input type="hidden" id="picture3_url">
					<img class="img-responsive img-circle" src="" />
				</div>
			</div>
		</div>
		<hr/>
		<div class="col-xs-12 location_container">
			<div class="title">LOCATION</div>
			<img class="img-responsive" src="/img/place_profile/location.png" />
			<div class="col-xs-12 location"></div>
		</div>
	</div>
</div>
<div class="edit_button" style="display: none;">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/edit.png">
</div>
<div class="delete_button" style="display: none;">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/erase.png">
</div>
<div class="favorite_button" style="display: none;">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/favorite.png">
</div>
<div class="close_button" style="display: none;">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_left/close.png">
</div>
</div>