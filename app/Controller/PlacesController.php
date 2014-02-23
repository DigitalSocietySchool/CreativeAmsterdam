<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
App::import('Controller', 'Locations');
App::import('Controller', 'Users');

class PlacesController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Place';
		var $uses = array('Place', 'Location', 'Tag', 'Social');
		var $component = array('Session');

		function profile(){}
		function editPlace(){}

		function addPlace(){
			//location adding.
			$street = str_replace(' ', '+', $_POST['street']);
			$address = $_POST['housenr'] . "+" . $street . ",+" . $_POST['city'] . ",+netherlands";
			$url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$address."&sensor=false";
			$data = @file_get_contents($url);
			$jsondata = json_decode($data,true);
			$LatLng = array(
		        'lat' => $jsondata["results"][0]["geometry"]["location"]["lat"],
		        'lng' => $jsondata["results"][0]["geometry"]["location"]["lng"],
		    );
			$location = new LocationsController;
			$location->constructClasses();

			$result = $location->wgs842rd($LatLng);
			$x_coordinate = $result['x'];
			$y_coordinate = $result['y'];

			$values['Location']['id'] = '';
			$values['Location']['street'] = $_POST['street'];
			$values['Location']['house_nr'] = $_POST['housenr'];
			$values['Location']['city'] = $_POST['city'];
			$values['Location']['x'] = round($x_coordinate);
			$values['Location']['y'] = round($y_coordinate);

			$this->Location->save($values);

			$values['Place']['id'] = '';
			$split = trim($_POST['ppicture'], " \t");
			$values['Place']['p_picture'] = "/img/uploads/" . $split;
			$values['Place']['p_picture'] = "/img/uploads/" . $_POST['ppicture'];
			$values['Place']['location_id'] = $this->Location->id;
			$values['Place']['name'] = $_POST['name'];
			$values['Place']['website'] = $_POST['website'];
			$values['Place']['email'] = $_POST['email'];
			$values['Place']['about'] = $_POST['about'];
			$values['Place']['user_id'] = $this->Session->read('user_id');

			for($i = 1; $i < 4; $i++){
					if(isset($_POST['picture'.$i]))
						$values['Place']['picture'.$i] = $_POST['picture'.$i];
			}

			$returnvalue = $this->Place->save($values);

			$id = $this->Place->id;
			$tags = explode(";", $_POST['tags']);
			foreach($tags as $tag){
				$info = explode(":", $tag);
				if($info[0] != ""){
					$values['Tag']['tag_id'] = $info[0];
					$values['Tag']['place_id'] = $id;
					$this->Tag->save($values);
				}
			}

			$socials = explode(" ", $_POST['socials']);
			foreach($socials as $social){
				$info = explode(";", $social);
				if($info[0] != ""){
					$values['Social']['name'] = $info[0];
					$values['Social']['url'] = $info[1];
					$values['Social']['place_id'] = $id;
					$this->Social->save($values);
				}
			}
			$resultmessage = "addPlace";
			$this->autoRender = $this->layout =  false;
			echo json_encode($resultmessage);
		}

		function getPlace($id = null) {
			$Locations = new LocationsController;
			$Locations->constructClasses();
			$temp = "";
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$temp = $_POST['id'];
			}
			if($id == null){
				$this->log("test");
				if($temp != "")
					$id = $temp;
				else
					$id = $this->Session->read('user_id'); 
				$Users = new UsersController;
				$Users->constructClasses();
				$user = $Users->getUser($id);				
				$location = $Locations->getLocation($user['location_id']);
				$this->autoRender = $this->layout =  false;
				echo json_encode($location[0]);
			}
			else{				
				$place = $this->Place->find('all', array('conditions'=>array('id'=>$id)));
				$location = $Locations->getLocation($place[0]['Place']['location_id']);
				$this->autoRender = $this->layout =  false;
				return $location[0];
			}
		}

		function getUserPlaces(){
			$id = $this->Session->read('user_id');
			$places = array();
			$results = $this->Place->find('all', array('conditions' => array('user_id' => $id)));
			foreach($results as $result_id => $result){
				$values['id'] = $result['Place']['id'];
				$values['name'] = $result['Place']['name'];
				$values['p_picture'] = $result['Place']['p_picture'];
				$places[] = $values;

			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($places);
		}

		function getAllPlaces(){
			$results = $this->Place->find('all');
			foreach($results as $result){
				$values['id'] = $result['Place']['id'];
				$values['name'] = $result['Place']['name'];
				$places[] = $values;

			}
			$this->autoRender = $this->layout = false;
			echo json_encode($places);
		}

		function getPlaceProfile(){
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$place = $this->Place->find('all', array('conditions'=>array('id'=> $_POST['id'])));
			}
			$this->autoRender = $this->layout = false;
			echo json_encode($place[0]['Place']);
		}

		function getPlaceLocation(){
			$id = $_POST['id'];
			
			$location = $this->Location->find('all', array('conditions' => array('id' => $id)));
			$this->autoRender = $this->layout = false;
			echo json_encode($location[0]['Location']);
		}

		function deletePlace(){
			$id = $this->Session->read('user_id');			
			if(isset($_POST['delete_id'])){
				$id = $_POST['delete_id'];
				$this->Tag->deleteAll(array('place_id' => $id), false);
				$this->Social->deleteAll(array('place_id' => $id), false);
				$this->Place->deleteAll(array('id' => $id), false);
				$errormessage = "deletePlace";
			}
			else{
				$place_id = $_POST['id'];
				if($id == ""){
					$errormessage = "loginError";
				}
				else{
					$place = $this->Place->find('all', array('conditions' => array('id' => $place_id)));
					if($place[0]['Place']['user_id'] == $id){
						$this->Tag->deleteAll(array('place_id' => $place[0]['Place']['id']), false);
						$this->Social->deleteAll(array('place_id' => $place[0]['Place']['id']), false);
						$this->Place->deleteAll(array('id' => $place[0]['Place']['id']), false);
						$errormessage = "deletePlace";
					}
					else
						$errormessage = "loginError";
				}
			}

			echo json_encode($errormessage);
			$this->autoRender = $this->layout = false;
		}

		function editPlaceProfile(){
			$id = $this->Session->read('user_id');
			$place = $this->Place->find('all', array("conditions" => array('id' => $_POST['id'])));
			if($id == ""){
				$errormessage = "loginError";
			}
			else{
				$street = str_replace(' ', '+', $_POST['street']);
				$address = $_POST['housenr'] . "+" . $street . ",+" . $_POST['city'] . ",+netherlands";
				$url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$address."&sensor=false";
				$data = @file_get_contents($url);
				$jsondata = json_decode($data,true);
				$LatLng = array(
			        'lat' => $jsondata["results"][0]["geometry"]["location"]["lat"],
			        'lng' => $jsondata["results"][0]["geometry"]["location"]["lng"],
			    );
				$location = new LocationsController;
				$location->constructClasses();

				$result = $location->wgs842rd($LatLng);
				$x_coordinate = $result['x'];
				$y_coordinate = $result['y'];

				$this->Location->updateAll(array(
							'Location.street' => "'".$_POST['street']."'",
							'Location.city' => "'".$_POST['city']."'",
							'Location.house_nr' => "'".$_POST['housenr']."'",
							'Location.x' => "'".round($x_coordinate)."'",
							'Location.y' => "'".round($y_coordinate)."'"
							), 
    						array('Location.id' => $place[0]['Place']['location_id']));

				$values['Place']['id'] = $_POST['id'];
				$values['Place']['name'] = $_POST['name'];
				$values['Place']['about'] = $_POST['about'];
				$values['Place']['email'] = $_POST['email'];
				$values['Place']['website'] = $_POST['website'];
				if(isset($_POST['ppicture']) && $_POST['ppicture'] != "")
					$values['Place']['p_picture'] = "/img/uploads/" . $_POST['ppicture'];
				$values['Place']['user_id'] = $this->Session->read('user_id');

				$returnvalue = $this->Place->save($values);

				$this->Tag->deleteAll(array('place_id' => $_POST['id']), false);

				$tags = explode(";", $_POST['tags']);
				foreach($tags as $tag){
					$info = explode(":", $tag);
					if($info[0] != ""){
						$values['Tag']['tag_id'] = $info[0];
						$values['Tag']['place_id'] = $_POST['id'];
						$this->Tag->save($values);
					}
				}

				$this->Social->deleteAll(array('place_id' => $_POST['id']), false);

				$socials = explode(" ", $_POST['socials']);
				foreach($socials as $social){
					$info = explode(";", $social);
					if($info[0] != ""){
						$values['Social']['name'] = $info[0];
						$values['Social']['url'] = $info[1];
						$values['Social']['place_id'] = $_POST['id'];
						$this->Social->save($values);
					}
				}


				$errormessage = "editPlace";
			}
			echo json_encode($errormessage);
			$this->autoRender = $this->layout = false;
		}
}