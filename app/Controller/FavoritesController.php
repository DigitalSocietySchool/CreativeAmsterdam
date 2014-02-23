<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class FavoritesController extends AppController {
	public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
	var $name = 'Favorite';
	var $uses = array('Favorite', 'User', 'Event', 'Place');
	var $component = array('Session');

	function favoriteList(){}

	function addFavorite(){
		$values['Favorite']['user_id'] = $this->Session->read('user_id');
		$values['Favorite']['favorite_id'] = $_POST['id'];
		$values['Favorite']['type'] = $_POST['type'];
		$result = $this->Favorite->save($values);
		$this->autoRender = $this->layout =  false;
		echo json_encode($result);
	}

	function deleteFavorite(){
		$type = $_POST['type'];
		$id = $_POST['id'];
		$this->Favorite->deleteAll(array('user_id' => $this->Session->read('user_id'),
										'favorite_id' => $id,
										'type' => $type
			), false);
		$result = "deleteFavorite";
		$this->autoRender = $this->layout =  false;
		echo json_encode($result);
	}

	function getFavorites(){
		$favorites = array();
		$id = $this->Session->read('user_id');
		$results = $this->Favorite->find('all', array('conditions' => array('user_id' => $id)));
		foreach($results as $result => $favorite){
			$type = ucwords($favorite['Favorite']['type']);
			$result2 = $this->$type->find('all', array('conditions' => array('id' => $favorite['Favorite']['favorite_id'])));
			//fix me uitbreiden met works en socials. en location
			if($type == 'User'){
				$values['phone'] = $result2['0'][$type]['phone'];
				$values['surname'] = $result2['0'][$type]['surname'];
			}
			if($result2){
				$values['id'] = $result2['0'][$type]['id'];
				$values['name'] = $result2['0'][$type]['name'];
				$values['email'] = $result2['0'][$type]['email'];			
				$values['website'] = $result2['0'][$type]['website'];
				$values['ppicture'] = $result2['0'][$type]['p_picture'];
			
				$favorites[$type][] = $values;
			}
		}
		$this->autoRender = $this->layout =  false;
		echo json_encode($favorites);
	}

	function isFavorite(){
		$type = $_POST['type'];
		$id = $_POST['id'];
		if($this->Session->read('user_id') != ''){
			$result = $this->Favorite->find('all', array('conditions' => array(
							'user_id' => $this->Session->read('user_id'),
							'favorite_id' => $id,
							'type' => $type
							)));
			echo json_encode($result);
		}
		else{
			$errormessage = "loginError";
			echo json_encode($errormessage);

		}
		
		$this->autoRender = $this->layout =  false;
		
	}
}
