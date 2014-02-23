<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
App::import('Controller', 'Places');
App::import('Controller', 'Location');

class SearchesController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Search';
		var $uses = array('Tag', 'Event', 'Place', 'User', 'Taglib', 'Location');
		var $component = array('Session');

		function searchForm(){}
		function searchTags(){}
		function searchList(){}
		function searchMap(){}

		function getSearchResult() {
			$features = array();
			$organisation = "";
			if(isset($_POST['search_args']))
				$queries = explode(",", $_POST['search_args']);
			if(isset($_POST['tags']))
				$tags = explode(",", $_POST['tags']);
			$place = new PlacesController;
			$place->constructClasses();
			$location = new LocationsController;
			$location->constructClasses();
			foreach ($queries as $query => $value) {
				if($value != "org")
					$events[$value] = $this->Tag->find('all', array('conditions' => array($value . '_id !=' => NULL)));
				else
					$events[$value] = $this->Tag->find('all', array('conditions' => array('user_id !=' => NULL)));
			}
			foreach ($events as $event => $temp){
				foreach ($temp as $feature_count => $feature){
					foreach($feature as $tag_single){
						$tag_name = $this->Taglib->find('all', array('conditions' => array('id' => $tag_single['tag_id'])));
						foreach($tags as $tag){
							if($tag == $tag_name[0]['Taglib']['tag']){
								if($event != "org"){
									$id = $feature['Tag'][$event . '_id'];
							 		$array_id = $event . "_" . $feature['Tag'][$event . '_id'];
							 	}
							 	else{
							 		$id = $feature['Tag']['user_id'];
							 		$array_id = "user_" . $feature['Tag']['user_id'];
							 	}
							 	$values = array();
								if(!array_key_exists($array_id, $features)){
									$table = ucwords($event);
									$type = $table;
									if($table == "Place"){
										$result = $this->Place->find('all', array('conditions' => array('id' => $id)));
										$result2 = $place->getPlace($id);
										$latlon = $result2['Location']['x'] . "," . $result2['Location']['y'];
										$values = array("id" => $id,"name" => $result[0]['Place']['name'], "p_picture" => $result[0]['Place']['p_picture'], "type" => 'Place', "LatLon" => $latlon);
									}
									else{
										if($table == "Org")
											$result = $this->User->find('all', array('conditions' => array('id' => $id)));
										else
											$result = $this->$table->find('all', array('conditions' => array('id' => $id)));
										if($table == "User" || $table == "Org"){
											if($result[0]['User']['type'] == 'org' && $table == "Org"){	
												$result2 = $location->getLocation($result[0]['User']['location_id']);
												$latlon = $result2['0']['Location']['x'] . "," . $result2['0']['Location']['y'];											
												$type = 'organisation';
												$values = array("id" => $id,"name" => $result[0]['User']['name'], "p_picture" => $result[0]['User']['p_picture'], "type" => "organisation", "LatLon" => $latlon);
											}
											else if($result[0]['User']['type'] == 'user' && $table == "User"){
												$result2 = $location->getLocation($result[0][$table]['location_id']);
												$latlon = $result2['0']['Location']['x'] . "," . $result2['0']['Location']['y'];											
												$type = 'organisation';
												$values = array("id" => $id,"name" => $result[0][$table]['name'], "p_picture" => $result[0][$table]['p_picture'], "type" => "user", "LatLon" => $latlon);
											}
										}
										else{						
											$result2 = $place->getPlace($result[0][$table]['place_id']);
											$latlon = $result2['Location']['x'] . "," . $result2['Location']['y'];
											$values = array("id" => $id,"name" => $result[0][$table]['name'], "p_picture" => $result[0][$table]['p_picture'], "type" => $type, "LatLon" => $latlon);
										}
										
									} 	
									if($values != NULL)
										$features[$array_id] = $values;
								}
							}
						}
					}
					
						
				}
			}
			$this->log($features);
			$this->autoRender = $this->layout =  false;
			echo json_encode($features);
		}

		function getSearchResultByInput() {
			$input = $_POST['input'];
			$input = strtolower($input);
			$values = array();
			$place_controller = new PlacesController;
			$place_controller->constructClasses();
			$location_controller = new LocationsController;
			$location_controller->constructClasses();
			
			$users = $this->User->find('all');

			foreach($users as $user){
				$name = $user['User']['name'];
				$name = strtolower($name);

				$location_id;
				if($user['User']['location_id'] != ""){
					$location_id = $user['User']['location_id'];
				}

				$user_location = $this->Location->find('all', array('conditions' => array('id' => $location_id)));

				if(strpos($name, $input) !== false || strpos($user_location[0]['Location']['street'], $input) !== false){
					$latlon = $user_location['0']['Location']['x'] . "," . $user_location['0']['Location']['y'];
					$values[] = array("id" => $user['User']['id'],"name" => $user['User']['name'], "p_picture" => $user['User']['p_picture'], "type" => "user", "LatLon" => $latlon);
		
				}
			}

			$places = $this->Place->find('all');
			foreach($places as $place){
				$name = $place['Place']['name'];
				$name = strtolower($name);

				$location_id;
				if($place['Place']['location_id'] != ""){
					$location_id = $place['Place']['location_id'];
				}

				$place_location = $this->Location->find('all', array('conditions' => array('id' => $location_id)));

				if(strpos($name, $input) !== false || strpos($place_location[0]['Location']['street'], $input) !== false){
					$result2 = $location_controller->getLocation($place['Place']['location_id']);
					$latlon = $result2['0']['Location']['x'] . "," . $result2['0']['Location']['y'];
					$values[] = array("id" => $place['Place']['id'],"name" => $place['Place']['name'], "p_picture" => $place['Place']['p_picture'], "type" => "Place", "LatLon" => $latlon);
		
				}
			}

			$events = $this->Event->find('all');
			foreach($events as $event){
				$name = $event['Event']['name'];
				$name = strtolower($name);

				$location_id;
				if($event['Event']['location_id'] != ""){
					$location_id = $event['Event']['location_id'];
				}

				$event_location = $this->Location->find('all', array('conditions' => array('id' => $location_id)));

				if(strpos($name, $input) !== false || strpos($event_location[0]['Location']['street'], $input) !== false){
					$result2 = $place_controller->getPlace($event['Event']['place_id']);
					$latlon = $result2['Location']['x'] . "," . $result2['Location']['y'];
					$values[] = array("id" => $event['Event']['id'],"name" => $event['Event']['name'], "p_picture" => $event['Event']['p_picture'], "type" => "Event", "LatLon" => $latlon);
		
				}
			}

			$this->autoRender = $this->layout =  false;
			echo json_encode($values);
		}


		function showEvent($id){
			$this->Session->write('selected_item', $id);
		}
		function showUser($id){
			$this->Session->write('selected_item', $id);
		}
		function showPlace($id){
			$this->Session->write('selected_item', $id);
		}

		function searchItem(){
			$result = $this->$_POST['type']->find('all', array('conditions' => array('id' => $this->Session->read('selected_item'))));
			//fix me aanroep voor works en socials en locatie

			$this->autoRender = $this->layout =  false;
			echo json_encode($result[0][$_POST['type']]);
		}

		function broadcastPosition(){
			$location = new LocationsController;
			$location->constructClasses();

			$LatLng = explode(":",$_POST['latlng']);
			$LatLng_temp = array(
			        'lat' => $LatLng[0],
			        'lng' => $LatLng[1],
			    );
			$result = $location->wgs842rd($LatLng_temp);
			$x_coordinate = $result['x'];
			$y_coordinate = $result['y'];
			$coords = array($x_coordinate, $y_coordinate);
			$this->autoRender = $this->layout =  false;

			echo json_encode($coords);
		}
}

?> 