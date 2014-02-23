<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('edit_profile'); ?>
<?php echo $this->Html->css('register'); ?>

<form style="display:none" id="upload_picture" enctype="multipart/form-data" target="uploadIframe" action="uploadImage" method="post">
<input type="text" id="position" name="position">
<input type="file" id="file" name="file" onchange="alertFilename()">
<input id="submit" type="submit" value="Send">
</form>


<div id="edit_profile" class="container">
	<form id="edit_profile_form">
		<div class="col-xs-12 col-sm-8 hide_on_xs">
			<div class="ppicture"></div>
			<div class="submit_ppicture">
				<input type="hidden" id="p_picture_url">
				submit
			</div>
			<div class="col-xs-12 creds">
				<input type="text" id="name" name="name" placeholder="Name" required />
				<!--<input type="text" id="surname" name="surname" placeholder="Surname" />-->
				<input type="email" id="email" name="email" placeholder="E-mail address" required />
				<div class="col-xs-10" id="change_password_button">Change password</div>
				<div id="changePassword" style="display: none;">
					<input type="password" class="col-xs-12 col-sm-4" id="password" name="password" placeholder="Enter new password" required  />
					<input type="password" class="col-xs-12 col-sm-4" id="password_retype" name="password_retype" placeholder="Repeat new password" required />
				</div>
			</div>
			<hr />
			<div class="col-xs-12 contacts">
				<div class="title">CONTACTS</div>
				<input type="url" id="website" name="website" placeholder="Personal website" />
				<input type="text" id="phone" name="phone" placeholder="Phone number" />
			</div>
			<hr />
			<div class="col-xs-12 tags">
				<div class="title">TAGS</div>
				<div class="addtag pull-left">+</div>
			</div>
			<hr class="visible-xs" />
		</div>
		<div class="col-xs-12 col-sm-4" style="height: 100%;">
			<div id="edit_profile_works">
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
					<input type="text" id="street" name="street" placeholder="Street" required />
					<input type="text" id="house_nr" name="house_nr" placeholder="Number" required />
					<input type="text" id="city" name="city" placeholder="City" required />
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
			<div id="edit_profile_tags">
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
		</div>
	</form>
</div>

<div class="submitForm">
	<img class="img-responsive" src="/img/side_buttons/sidebuttons_right/save.png" />
</div>
<iframe style="display:none" name="uploadIframe" content="text/html;charset=UTF-8">
</iframe>	