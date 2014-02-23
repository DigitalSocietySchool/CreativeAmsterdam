<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php echo $this->Html->script('search_tags'); ?>
<?php echo $this->Html->css('search'); ?>
<div id="search_tag_page">
	<div class="search_input">
		<input id="tag_search" class="col-xs-11" type="text" placeholder="Search..."/>
	</div>
	<div class="col-xs-12 choose">
		Choose the tags:
	</div>
	<div id="tags" class="col-xs-12"></div>
	<div id="alphabet"></div>
	<div class="search_button" style="display: none;"></div>
</div>