<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->css('login'); ?>
<?php echo $this->Html->script('login'); ?>
<div id="login_form" class="container" style="display: none;">
	<input type="text" id="login_input" placeholder="login">
	<input type="password" id="password_input" placeholder="password">
	<div id="submit_login">login</div>
	<div id="register"><a href="/Users/registerForm">register</a></div>
</div>

<div id="register_as_logo" class="visible-lg visible-md logo" style="display: none;">
	<img class="img-responsive" src="/img/laptop/logo.png" />
</div>
<div id="register_as" class="container" style="display: none;">
	<div class="filter container">
		<div class="col-xs-12 logo visible-sm visible-xs">
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
</div> <!-- /#_page -->
