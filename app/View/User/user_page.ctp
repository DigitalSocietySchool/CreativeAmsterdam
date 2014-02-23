<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('user'); ?>
<?php echo $this->Html->css('user'); ?>
<div class="visible-lg visible-md visible-sm logo">
	<img class="img-responsive" src="/img/laptop/logo.png" />
</div>
<div id="personal_home_page" class="container" style="display: none;">
	<div class="filter container">
		<div class="col-xs-12 logo visible-xs">
			<img class="img-responsive" src="/img/dashboard_signed/creativecity_bar_icon.png" />
		</div>
		<div class="col-xs-12 frame">
			<div class="col-xs-12">
				<div class="account"></div>
				<div class="search"></div>
			</div>
			<div class="col-xs-12">
				<div class="favorites"></div>
				<div class="add"></div>
			</div>
		</div> <!-- /.frame -->
	</div> <!-- /.filter -->
</div>
<div id="login_page" class="container" style="display: none;">
	<div class="filter container">
		<div class="col-xs-12 logo visible-xs">
			<img class="img-responsive" src="/img/dashboard_unsigned/creativecity_bar_icon.png" />
		</div>
		<div class="col-xs-12 login">
			<input class="col-xs-12" type="text" id="login_input" placeholder="Emailaddress">
			<input class="col-xs-12" type="password" id="password_input" placeholder="Password">
			<div id="errormessage" class="col-xs-12"></div>
		</div>
		<div class="col-xs-12" id="submit_login">
			Log In
		</div>
		<div class="col-xs-12 signup">
			Sign Up
		</div>
	</div>
	<!--
	<div id="submit_login">login</div>
	<div id="register"><a href="/Users/registerForm">register</a></div> -->
</div>
<div id="register_as" class="container" style="display: none;">
	<div class="filter container">
		<div class="col-xs-12 logo visible-xs">
			<img class="img-responsive" src="/img/dashboard_unsigned/creativecity_bar_icon.png" />
		</div>
		<div class="col-xs-12 frame">
			<div class="col-xs-12 user_container">
				<div class="col-xs-4"></div>
				<div class="col-xs-4 user"></div>
				<div class="col-xs-4"></div>
			</div>
			<div class="col-xs-12 org_container">
				<div class="col-xs-4"></div>
				<div class="col-xs-4 org"></div>
				<div class="col-xs-4"></div>
			</div>
		</div>
	</div> <!-- /.filter -->
</div> <!-- /#register_as -->
