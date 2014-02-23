<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('edit_place'); ?>
<?php echo $this->Html->css('edit_place'); ?>

<form style="display:none" id="upload_picture" enctype="multipart/form-data" target="uploadIframe" action="uploadImage" method="post">
<input type="text" id="position" name="position">
<input type="file" id="file" name="file" onchange="alertFilename()">
<input id="submit" type="submit" value="Send">
</form>

<div id="edit_place" class="container">
	<form id="edit_place_form">
		<div class="col-xs-12 col-sm-8 hide_on_xs">
			<div class="col-xs-12 ppicture">
				<img class="img-responsive" src="http://placehold.it/170x170">
			</div>
			<div class="submit_ppicture">
				<input type="hidden" id="p_picture_url">
				<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
			</div>
			<div class="col-xs-12 creds">
				<div class="col-xs-12 col-sm-6">
					<input type="text" id="name" name="name" placeholder="Name" required />
					<!--<input type="text" id="surname" name="surname" placeholder="Surname" />-->
					<textarea name="about" id="about" rows="5" cols="23" placeholder="About"></textarea>
				</div>
				<div class="col-xs-12 col-sm-6">
					<input type="text" id="street" name="street" placeholder="Street" required />
					<input type="text" id="house_nr" name="house_nr" placeholder="Number" required />
					<input type="text" id="city" name="city" placeholder="City" required />	
				</div>
			</div>
			<hr />	
			<div class="col-xs-12 contacts">
				<div class="title">CONTACTS</div>
				<input type="email" id="email" name="email" placeholder="E-mail address" />
				<input type="url" id="website" name="website" placeholder="Personal website" />
			</div>
			<hr class="visible-xs" />
		</div>
		<div class="col-xs-12 col-sm-4" style="height: 100%;">
			<div id="hide_on_tags">
				<div class="col-xs-12 tags">
					<div class="title">TAGS</div>
					<div class="addtag pull-left">+</div>
				</div>
				<div class="col-xs-12 socials">
					<hr />
					<div class="title">SOCIAL</div>
					<div class="col-xs-2 add_social">
						<img class="img-responsive" src="/img/user_profile/join/add.png">
					</div>
					<div class="col-xs-2 social_type facebook_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/facebook.png">
					</div>
					<div class="col-xs-2 social_type twitter_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/twitter.png">
					</div>
					<div class="col-xs-2 social_type foursquare_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/foursquare.png">
					</div>
					<div class="col-xs-2 social_type googleplus_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/googleplus.png">
					</div>
					<div class="col-xs-10 social_types" style="display: none;">
						<div class="col-xs-12">
							<div class="col-xs-2 social_type facebook">
								<img class="img-responsive" src="/img/social/facebook_white.png">
							</div>
							<div class="col-xs-2 social_type twitter">
								<img class="img-responsive" src="/img/social/twitter_white.png">
							</div>
							<div class="col-xs-2 social_type foursquare">
								<img class="img-responsive" src="/img/social/foursquare_white.png">
							</div>
							<div class="col-xs-2 social_type googleplus">
								<img class="img-responsive" src="/img/social/googleplus_white.png">
							</div>
						</div>
					</div>
					<div class="col-xs-10 social_url" style="display: none;"></div>
					<div class="approve_social" style="display: none;">
						<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
					</div>
					<hr/>
					<div class="col-xs-12 pictures">
						<div class="title">PICTURES</div>
						<div class="col-xs-12">
							<div class="col-xs-4 picture" id="picture1">
								<input type="hidden" id="picture1_url">
								<img class="img-responsive" src="/img/form_icons/profile_picture.png" />
							</div>
							<div class="col-xs-4 picture" id="picture2">
								<input type="hidden" id="picture2_url">
								<img class="img-responsive" src="/img/form_icons/profile_picture.png" />
							</div>
							<div class="col-xs-4 picture" id="picture3">
								<input type="hidden" id="picture3_url">
								<img class="img-responsive" src="/img/form_icons/profile_picture.png" />
							</div>
						</div>
						<div class="approve_picture" style="display: none;">
							<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
						</div>
					</div>
				</div>
			</form>
			<div class="submitForm">
				<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
			</div>
		</div>
	</div>
</div>
<div id="edit_place_tags" style="display: none;">
	<div class="search_input">
		<input id="tag_search" class="col-xs-11" type="text" placeholder="Search..."/>
	</div>
	<div class="col-xs-12 choose">
		Choose the tags:
	</div>
	<div id="tags" class="col-xs-12"></div>
	<div id="alphabet"></div>
	<div class="search_button"></div>
</div>
<iframe style="display:none" name="uploadIframe" content="text/html;charset=UTF-8">
</iframe>