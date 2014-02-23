<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('register'); ?>
<?php echo $this->Html->css('register'); ?>

<form style="display:none" id="upload_picture" enctype="multipart/form-data" target="uploadIframe" action="uploadImage" method="post" accept-charset="image/gif,image/jpeg" content-type="image/png, image/jpeg" mime-type="image/png, image/jpeg">
<input type="text" id="position" name="position">
<input type="file" id="file" name="file" onchange="alertFilename()">
<input id="submit" type="submit" value="Send">
</form>


<div id="register" class="container">
	<form id="register_form">
		<div class="col-xs-12 col-sm-8 hide_on_xs">
			<div class="ppicture">
				<img class="img-responsive" src="/img/form_icons/profile_picture.png">
			</div>
			<div class="submit_ppicture">
				<input type="hidden" id="p_picture_url">
				Click here to upload your profile picture
			</div>
			<div class="crop">
				<input type="hidden" id="p_picture_url_crop">
				satisfied? click to crop/resize!
			</div>
			<div class="submit_cropped">
				<input type="hidden" id="p_picture_url_resized">
				upload resized picture!
			</div>
			<div class="col-xs-12 creds">
				<div class="col-xs-12 col-sm-6">
					<input type="text" id="name" name="name" placeholder="Name" required />
					<!--<input type="text" id="surname" name="surname" placeholder="Surname" />-->
					<input type="email" id="email" name="email" placeholder="E-mail address" required />
				</div>
				<div class="col-xs-12 col-sm-6">
					<input type="password" id="password" name="password" placeholder="Password" required />
					<input type="password" id="password_retype" name="password_retype" placeholder="Repeat password" required />
				</div>
			</div>
			<hr />
			<div class="col-xs-12 contacts">
				<div class="title">CONTACTS</div>
				<div class="col-xs-12 col-sm-6">
					<input type="text" id="website" name="website" placeholder="Personal website" />
				</div>
				<div class="col-xs-12 col-sm-6">
					<input type="text" id="phone" name="phone" placeholder="Phone number" />
				</div>
			</div>
			<hr />
			<div class="col-xs-12 tags">
				<div class="title">TAGS</div>
				<div class="addtag pull-left">+</div>
				<div class="pull-left tag errortag" style="display: none;">Please add at least one tag</div>
			</div>
			<hr class="visible-xs" />
		</div>
		<div class="col-xs-12 col-sm-4" style="height: 100%;">
			<div id="register_works">
				<div class="col-xs-12 works">
					<div class="col-xs-12 title">WORK SAMPLES</div>
					<div class="col-xs-12 thumbs">
						<div class="col-xs-4 left works1"></div>
						<div class="col-xs-4 middle works2"></div>
						<div class="col-xs-4 right works3"></div>
						<div class="col-xs-10 work_types" style="display: none;">
							<div class="col-xs-2 work_type picture_icon">
								<img class="img-responsive" src="/img/form_icons/picture.png"> 
							</div>
							<div class="col-xs-2 work_type youtube_icon">
								<img class="img-responsive" src="/img/form_icons/youtube.png">
							</div>
							<div class="col-xs-2 work_type vimeo_icon">
								<img class="img-responsive" src="/img/form_icons/vimeo.png">
							</div>
							<div class="col-xs-2 work_type soundcloud_icon">
								<img class="img-responsive" src="/img/form_icons/soundcloud.png">
							</div>
						</div>
						<div class="col-xs-10 work_url" style="display: none;"></div>
						<div class="approve_work" style="display: none;">
							<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
						</div>
					</div>
				</div>
				<hr />
				<div class="col-xs-12 socials">
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
					<div class="col-xs-2 social_type behance_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/behance.png">
					</div>
					<div class="col-xs-2 social_type googleplus_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/googleplus.png">
					</div>
					<div class="col-xs-2 social_type linkedin_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/linkedin.png">
					</div>
					<div class="col-xs-2 social_type instagram_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/instagram.png">
					</div>
					<div class="col-xs-2 social_type youtube_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/youtube.png">
					</div>
					<div class="col-xs-2 social_type vimeo_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/vimeo.png">
					</div>
					<div class="col-xs-2 social_type soundcloud_approved" style="display: none;">
						<img class="img-responsive" src="/img/social/soundcloud.png">
					</div>
					<div class="col-xs-10 social_types" style="display: none;">
						<div class="col-xs-12">
							<div class="col-xs-2 social_type facebook">
								<img class="img-responsive" src="/img/social/facebook_white.png">
							</div>
							<div class="col-xs-2 social_type twitter">
								<img class="img-responsive" src="/img/social/twitter_white.png">
							</div>
							<div class="col-xs-2 social_type behance">
								<img class="img-responsive" src="/img/social/behance_white.png">
							</div>
							<div class="col-xs-2 social_type googleplus">
								<img class="img-responsive" src="/img/social/googleplus_white.png">
							</div>
							<div class="col-xs-2 social_type linkedin">
								<img class="img-responsive" src="/img/social/linkedin_white.png">
							</div>
							<div class="col-xs-2 social_type instagram">
								<img class="img-responsive" src="/img/social/instagram_white.png">
							</div>
							<div class="col-xs-2 social_type youtube">
								<img class="img-responsive" src="/img/social/youtube_white.png">
							</div>
							<div class="col-xs-2 social_type vimeo">
								<img class="img-responsive" src="/img/social/vimeo_white.png">
							</div>
							<div class="col-xs-2 social_type soundcloud">
								<img class="img-responsive" src="/img/social/soundcloud_white.png">
							</div>
						</div>
					</div>
					<div class="col-xs-10 social_url" style="display: none;"></div>
					<div class="approve_social" style="display: none;">
						<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
					</div>
				</div>
				<hr />
				<div class="col-xs-12 location">
					<div class="title">LOCATION</div>
					<input type="text" id="street" name="street" placeholder="Street"/>
					<input type="text" id="house_nr" name="house_nr" placeholder="Number"/>
					<input type="text" id="city" name="city" placeholder="City"/>
					<div class="area_container">
						<select id="area">
							<option>Or select an area:</option>
							<option>zuid</option>
							<option>oud west</option>
							<option>nieuw west</option>
							<option>noord</option>
							<option>oost</option>
							<option>duivendrecht</option>
							<option>zuidoost</option>
							<option>centrum</option>
						</select>
					</div>
				</div>
			</div>
			<div id="register_tags" class="col-xs-12">
				<div class="search_input">
					<input id="tag_search" class="col-xs-11" type="text" placeholder="Search for a tag"/>
				</div>
				<div class="col-xs-12 choose">
					Choose the tags:
				</div>
				<div id="tags" class="col-xs-12"></div>
				<div id="alphabet"></div>
				<div class="search_button"></div>
			</div>
		</div>
	</form>
</div>
<div class="submitForm">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
</div>
<iframe style="display:none" name="uploadIframe" content="text/html;charset=UTF-8">
</iframe>