<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class Event extends AppModel {
	var $name = 'Event';
	var $useTable = 'event';
	var $primaryKey = 'id';
	var $recursive = -1;	
}
?>