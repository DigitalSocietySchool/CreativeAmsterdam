<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class Favorite extends AppModel {
	var $name = 'Favorite';
	var $useTable = 'favorites';
	var $primaryKey = '';
	var $recursive = -1;
	var $hasMany = array('User' => array(
											'className' => 'User',
											'foreignKey' => 'user_id',
											'dependent' => true								
										),
						 'Favorite' => array(
											'className' => 'Favorite',
											'foreignKey' => 'favorite_id',
											'dependent' => true								
										)
							);	
}
?>