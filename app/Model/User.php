<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class User extends AppModel {
	var $name = 'User';
	var $useTable = 'user';
	var $primaryKey = 'id';
	var $recursive = -1;
	
	var $hasMany = array('Event' => array(
											'className' => 'Event',
											'foreignKey' => 'user_id',
											'dependent' => true								
										),
						 'Social' => array(
											'className' => 'Social',
											'foreignKey' => 'user_id',
											'dependent' => true								
										)
							);
	
}
?>