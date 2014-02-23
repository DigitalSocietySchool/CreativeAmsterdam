<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('search'); ?>
<?php echo $this->Html->script('search_tags'); ?>
<?php echo $this->Html->css('search'); ?>
<div class="visible-lg visible-md logo">
	<img class="img-responsive" src="/img/laptop/logo.png" />
</div>
<div class="search_input col-xs-12 hidden-xs">
	<div class="col-xs-6 col-xs-offset-4 search_input_container">
		<input class="col-xs-8" type="text" placeholder="Search by name" class="search_input"/>
		<img class="search_input_submit img-responsive" src="/img/search/search_selected.png" />
	</div>
</div>
<div class="container">
	<div id="search_page" class="col-xs-12">
		<div class="logo">
			<img class="img-responsive hidden-md hidden-lg" src="/img/shared/logo.png">
		</div>
		<div class="search_input col-xs-12 visible-xs">
			<input class="col-xs-10" type="text" placeholder="Search by name" class="search_input"/>
			<img class="search_input_submit img-responsive" src="/img/search/search_selected.png" />
		</div>
		<div class="choose col-xs-12">
			Or choose a category:
		</div>
		<div class="category_container">
			<div class="col-xs-12">
				<div class="user col-xs-6">
					<img class="img-responsive visible-xs" src="/img/search/user.png">
					<img class="img-responsive hidden-xs" src="/img/laptop/search/user.png">
				</div>
				<div class="org col-xs-6">
					<img class="img-responsive visible-xs" src="/img/search/organization.png">
					<img class="img-responsive hidden-xs" src="/img/laptop/search/organization.png">
				</div>
				
			</div>
			<div class="col-xs-12">
				<div class="place col-xs-6">
					<img class="img-responsive visible-xs" src="/img/search/place.png">
					<img class="img-responsive hidden-xs" src="/img/laptop/search/place.png">
				</div>
				<div class="event col-xs-6">
					<img class="img-responsive visible-xs" src="/img/search/event.png">
					<img class="img-responsive hidden-xs" src="/img/laptop/search/event.png">
				</div>
			</div>
			<div class="search">
				<img class="search_button img-responsive" src="/img/search/search_btn.png" />
			</div>
		</div>
	</div>
	<div id="search_tag_page" class="col-sm-4 col-xs-12" style="display: none;">
		<div class="search_input">
			<input id="tag_search" class="col-xs-11" type="text" placeholder="Filter the tags"/>
		</div>
		<div class="col-xs-12 choose">
			Choose the tags:
		</div>
		<div id="tags" class="col-xs-12"></div>
		<div id="alphabet"></div>
		<div class="search_button" style="display: none;"></div>
	</div>
</div>