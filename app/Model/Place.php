<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class Place extends AppModel {
	var $name = 'Place';
	var $useTable = 'place';
	var $primaryKey = 'id';
	var $recursive = -1;
	
	var $hasMany = array('Location' => array(
											'className' => 'Location',
											'foreignKey' => 'location_id',
											'dependent' => true								
										)
							);	
}
?>