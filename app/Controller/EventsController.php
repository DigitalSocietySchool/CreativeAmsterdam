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
App::import('Controller', 'Places');
App::import('Controller', 'Users');

class EventsController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Event';
		var $uses = array('Event', 'Tag', 'Social', 'Location');
		var $component = array('Session');

		function profile(){}
		function editEvent(){}

		function addEvent(){

			//location adding.
			$id = $this->Session->read('user_id');
			if($id == ""){
				$errormessage = "loginError";
			}
			else{
				if(!(isset($_POST['place_id']))){
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

					$values['Event']['location_id'] = $this->Location->id;
				}
				else{
					$values['Event']['place_id'] = $_POST['place_id'];
				}
				

				$values['Event']['id'] = '';
				$values['Event']['name'] = $_POST['name'];
				$start = $_POST['date_from'] . " " . $_POST['time_from'];
				$values['Event']['start'] = $start;
				$end = $_POST['date_to'] . " " . $_POST['time_to'];
				$values['Event']['end'] = $end;
				$values['Event']['about'] = $_POST['about'];
				$values['Event']['email'] = $_POST['email'];
				$values['Event']['website'] = $_POST['website'];
				$values['Event']['p_picture'] = "/img/uploads/" . $_POST['ppicture'];
				/*$values['Event']['picture1'] = $_POST['picture1'];
				$values['Event']['picture2'] = $_POST['picture2'];
				$values['Event']['picture3'] = $_POST['picture3'];*/
				$values['Event']['user_id'] = $this->Session->read('user_id');
				$values['Event']['status'] = "active";

				for($i = 1; $i < 4; $i++){
					if(isset($_POST['picture'.$i]))
						$values['Event']['picture'.$i] = $_POST['picture'.$i];
				}


				$returnvalue = $this->Event->save($values);

				//$returnvalue = $this->Place->save($values);

				$id = $this->Event->id;
				$tags = explode(";", $_POST['tags']);
				foreach($tags as $tag){
					$info = explode(":", $tag);
					if($info[0] != ""){
						$values['Tag']['tag_id'] = $info[0];
						$values['Tag']['event_id'] = $id;
						$this->Tag->save($values);
					}
				}

				$socials = explode(" ", $_POST['socials']);
				foreach($socials as $social){
					$info = explode(";", $social);
					if($info[0] != ""){
						$values['Social']['name'] = $info[0];
						$values['Social']['url'] = $info[1];
						$values['Social']['event_id'] = $id;
						$this->Social->save($values);
					}
				}
				$resultmessage = "addEvent";
			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($resultmessage);
		}

		function getUserEvents(){
			$id = $this->Session->read('user_id');
			$events = array();
			$results = $this->Event->find('all', array('conditions' => array('user_id' => $id)));
			foreach($results as $result_id => $result){
				$values['id'] = $result['Event']['id'];
				$values['name'] = $result['Event']['name'];
				$values['p_picture'] = $result['Event']['p_picture'];
				$events[] = $values;

			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($events);
		}

		function getEventProfile(){
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$event = $this->Event->find('all', array('conditions'=>array('id'=> $_POST['id'])));
			}
			$this->autoRender = $this->layout = false;
			echo json_encode($event[0]['Event']);
		}

		function getEventLocation(){
			$id = $_POST['id'];
			$event = $this->Event->find('all', array("conditions"=>array('id' => $id)));
			$this->log($event);
			$places = new PlacesController;
			$places->constructClasses();
			$locations = new LocationsController;
			$locations->constructClasses();
			$location = array();
			if($event[0]['Event']['place_id'] != NULL){
				$location = $places->getPlace($event[0]['Event']['place_id']);
				$this->autoRender = $this->layout = false;
				echo json_encode($location['Location']);
			}
			if($event[0]['Event']['location_id'] != NULL){
				$location = $locations->getLocation($event[0]['Event']['location_id']);
				$this->autoRender = $this->layout = false;
				echo json_encode($location[0]['Location']);
			}
			
		}

		function editEventProfile(){
			$id = $this->Session->read('user_id');
			if($id == ""){
				$errormessage = "loginError";
			}
			else{
				if(!(isset($_POST['place_id']))){
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

				
					$values['Event']['location_id'] = $this->Location->id;
				}
				else
					$values['Event']['place_id'] = $_POST['place_id'];

				$values['Event']['id'] = $_POST['id'];
				$values['Event']['name'] = $_POST['name'];
				//$start = $_POST['start_data'] + " " + $_POST['start_time'];
				$values['Event']['start'] = "2014-01-13 12:34:00";
				//$end = $_POST['end_data'] + " " + $_POST['end_time'];
				$values['Event']['end'] = "2014-01-15 12:34:00";
				$values['Event']['about'] = $_POST['about'];
				$values['Event']['email'] = $_POST['email'];
				$values['Event']['website'] = $_POST['website'];
				if(isset($_POST['ppicture']) && $_POST['ppicture'] != ""){
					$split = trim($_POST['ppicture'], " \t");
					$values['Event']['p_picture'] = "/img/uploads/" . $split;
				}
				$values['Event']['user_id'] = $this->Session->read('user_id');
				$values['Event']['place_id'] = $_POST['place_id'];
				$values['Event']['status'] = "active";

				$this->Tag->deleteAll(array('event_id' => $_POST['id']), false);

				$tags = explode(";", $_POST['tags']);
				foreach($tags as $tag){
					$info = explode(":", $tag);
					$this->log($info);
					if($info[0] != ""){
						$values['Tag']['tag_id'] = $info[0];
						$values['Tag']['event_id'] = $_POST['id'];
						$this->Tag->save($values);
					}
				}

				$this->Social->deleteAll(array('event_id' => $_POST['id']), false);

				$socials = explode(" ", $_POST['socials']);
				foreach($socials as $social){
					$info = explode(";", $social);
					if($info[0] != ""){
						$values['Social']['name'] = $info[0];
						$values['Social']['url'] = $info[1];
						$values['Social']['event_id'] = $_POST['id'];
						$this->Social->save($values);
					}
				}


				$returnvalue = $this->Event->save($values);
				$errormessage = "editEvent";
			}
			echo json_encode($errormessage);
			$this->autoRender = $this->layout = false;
		}

		function deleteEvent(){
			$id = $this->Session->read('user_id');
			if(isset($_POST['delete_id'])){
				$id = $_POST['delete_id'];
				$this->Tag->deleteAll(array('event_id' => $id), false);
				$this->Social->deleteAll(array('event_id' => $id), false);
				$this->Event->deleteAll(array('id' => $id), false);
				$errormessage = "deleteEvent";
			}
			else{
				$event_id = $_POST['id'];
				if($id == ""){
					$errormessage = "loginError";
				}
				else{
					$event = $this->Event->find('all', array('conditions' => array('id' => $event_id)));
					if($event[0]['Event']['user_id'] == $id){
						$this->Tag->deleteAll(array('event_id' => $event_id), false);
						$this->Social->deleteAll(array('event_id' => $event_id), false);
						$this->Event->deleteAll(array('id' => $event_id), false);
						$errormessage = "deleteEvent";
					}
					else
						$errormessage = "loginError";
				}
			}

			echo json_encode($errormessage);
			$this->autoRender = $this->layout = false;
		}

		function getAllEvents(){
			$events = $this->Event->find('all');
			$this->autoRender = $this->layout =  false;
			echo json_encode($events);
		}
	}