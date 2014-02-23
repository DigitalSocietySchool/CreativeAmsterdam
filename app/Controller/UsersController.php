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
require_once('smtp.php');
require_once('mail.php');
define('GUSER', ''); // GMail username
define('GPWD', ''); // GMail password

class UsersController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'User';
		var $uses = array('User', 'Location', 'Place', 'Work', 'Tag', 'Social');
		var $component = array('Session');


		function index(){}	

		function loginForm(){}
		function registerForm(){}
		function profile(){}
		function userPage(){}
		function addWidget(){}
		function addPlaceEvent(){}
		function addEvent(){}
		function addPlace(){}
		function editProfile(){}
		function adminPage(){}

		function smtpmailer($to, $from, $from_name, $subject, $body) { 
			
		}

		function checkSession() {
			$this->autoRender = $this->layout =  false;
			if($this->Session->read('user_id'))
				echo json_encode(true);
			else
				echo json_encode(false);
		}

		function editWebsite(){
			$values['User']['id'] = $this->Session->read('user_id');
			$values['User']['email'] = $_POST['website'];
			$this->User->save($values);
			$this->autoRender = $this->layout =  false;
			echo json_encode("SUCCESS");
		}

		function addTwitter() {
			$values['User']['id'] = $this->Session->read('user_id');
			$values['User']['widget_twitter'] = 1;
			$this->User->save($values);
			$this->autoRender = $this->layout =  false;
			echo json_encode("SUCCESS");
		}

		function checkLogin() {
			$this->autoRender = $this->layout =  false;
			$id = $this->Session->read('user_id');
			echo json_encode($id);
		}

		function getUser($id = null) {
			
			if(isset($_POST['id']) && $_POST['id'] != ""){
				
				$user = $this->User->find('all', array('conditions'=>array('id'=> $_POST['id'])));
			}
			else{
				$temp = "";
				if($id == null){
					$temp = $this->Session->read('user_id');
				}
				else{
					$temp = $id;
				}
				$user = $this->User->find('all', array('conditions'=>array('id'=> $temp)));
			}
			$this->autoRender = $this->layout = false;

			if($id == null){
				if($user)
					echo json_encode($user[0]['User']);
			}
			else {
				return $user[0]['User'];
			}
		}

		function getUsers(){
			$users = $this->User->find('all');
			$this->autoRender = $this->layout =  false;
			echo json_encode($users[0]['User']);
		}

		function getAllUsers(){
			$users = $this->User->find('all');
			$this->autoRender = $this->layout =  false;
			echo json_encode($users);
		}

		function validateLogin(){
			if(isset($_POST['username']) && isset($_POST['password'])){
				$username = $_POST['username'];
				$password = $_POST['password'];
				$user = $this->User->find('all', array('conditions'=>array('email' => $username , 'password' => sha1($password))));
				if(sizeof($user) > 0){
					$this->Session->write('user_id', $user[0]['User']['id']);
					echo json_encode($user['0']['User']);
				}
				else{
					$errormessage = "wrong credentials";
					echo json_encode($errormessage);
				}
				$this->autoRender = $this->layout =  false;
			}
			//echo json_encode($users[0]['User']);
		}
		
		function registerUser() {

			$email = $_POST['email'];
			$emails = $this->User->find('all', array('conditions'=>array('email' => $email)));
			if(sizeof($emails) > 0){
				$resultmessage = "email is already being used, use another";
			}
			else{
				if($_POST['street'] != '' && $_POST['housenr'] != '' && $_POST['city'] != ''){
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
					//$values['Location']['area'] = "";
					$values['Location']['city'] = $_POST['city'];
					$values['Location']['x'] = round($x_coordinate);
					$values['Location']['y'] = round($y_coordinate);
				}
				elseif($_POST['area'] != ""){
					$values['Location']['id'] = '';
					
					$values['Location']['area'] = $_POST['area'];
					
				}
				else{
					$resultmessage = "You have to either set an area or fill out the location form";
					$this->autoRender = $this->layout =  false;
					echo json_encode($resultmessage);
				}


				$this->Location->save($values);

				$values['User']['name'] = $_POST['name'];
				if(isset($_POST['phone']) && $_POST['phone'] != "")
					$values['User']['phone'] = $_POST['phone'];
				$values['User']['type'] = $_POST['type'];
				$values['User']['p_picture'] = "/img/uploads/" . $_POST['ppicture'];
				$values['User']['email'] = $email;
				$values['User']['location_id'] = $this->Location->id;
				if(isset($_POST['website']) && $_POST['website'] != "")
					$values['User']['website'] = $_POST['website'];
				$values['User']['password'] = sha1($_POST['password']);
				$values['User']['widget_calender'] = 0;
				$values['User']['widget_twitter'] = 0;

				$returnvalue = $this->User->save($values);

				$id = $this->User->id;
				$this->Session->write('user_id', $id);
				$tags = explode(";", $_POST['tags']);
				foreach($tags as $tag){
					$info = explode(":", $tag);
					if($info[0] != ""){
						$values['Tag']['tag_id'] = $info[0];
						$values['Tag']['user_id'] = $id;
						$this->Tag->save($values);
					}
				}

				$socials = explode(" ", $_POST['socials']);
				foreach($socials as $social){
					$info = explode(";", $social);
					if($info[0] != ""){
						$values['Social']['name'] = $info[0];
						$values['Social']['url'] = $info[1];
						$values['Social']['user_id'] = $id;
						$this->Social->save($values);
					}
				}
				$works = explode(" ", $_POST['works']);
				$counter = 1;
				foreach($works as $work){
					$info = explode(";", $work);
					if($info[0] != ""){
						$values['Work']['id'] = "";
						$values['Work']['position'] = "mid";
						$values['Work']['path'] = $info[1];
						$this->Work->save($values);

						$this->User->id = $id;
						$field = 'work_id' . $counter++;
						$this->User->saveField($field, $this->Work->id);
					}
				}

				$resultmessage = "addUser";

				$to      = $_POST['email'];
				$subject = 'subscription to creative city';
				$body = 'You have succesfully been subscribed to the creative city platform. This is a notification email and can be thrown away.';
				$from_name = "creative city";

				mail($to, $subject, $body);
				
			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($resultmessage);	
		}

		function editUser() {
			$user = $this->User->find('all', array('conditions'=>array('id' => $this->Session->read('user_id'))));
			
			$user_email = $user[0]['User']['email'];
			
			$emails = $this->User->find('all', array('conditions'=>array('email' => $_POST['email'])));
			
			if($user[0]['User']['email'] != $_POST['email'] && sizeof($emails) > 0){
				$resultmessage = "email is already being used, use another";
			}
			else{
				if($_POST['street'] != '' && $_POST['housenr'] != '' && $_POST['city'] != ''){
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
						'Location.house_nr' => "'".$_POST['housenr']."'",
						'Location.city' => "'".$_POST['city']."'",
						'Location.x' => round($x_coordinate),
						'Location.y' => round($y_coordinate)
					),
					array('Location.id =' => intval($user[0]['User']['location_id'])));
				}
				elseif($_POST['area'] != ""){
					$this->Location->updateAll(array(
						'Location.city' => "'".$_POST['area']."'",
					),
					array('Location.id =' => intval($user[0]['User']['location_id'])));
					
				}
				else{
					$resultmessage = "You have to either set an area or fill out the location form";
					$this->autoRender = $this->layout =  false;
					echo json_encode($resultmessage);
				}


				$values['User']['id'] = $this->Session->read('user_id');
				$values['User']['name'] = $_POST['name'];
				$values['User']['phone'] = $_POST['phone'];
				$values['User']['type'] = "user";
				if(isset($_POST['ppicture']) && $_POST['ppicture'] != ""){
					$split = trim($_POST['ppicture'], " \t");
					$values['User']['p_picture'] = "/img/uploads/" . $split;
				}
				$values['User']['email'] = $_POST['email'];
				//$values['User']['location_id'] = $this->Location->id;
				$values['User']['website'] = $_POST['website'];

				if(isset($_POST['password']) && $_POST['password'] != "")
					$values['User']['password'] = sha1($_POST['password']);
				$values['User']['widget_calender'] = 0;
				$values['User']['widget_twitter'] = 0;
				$values['User']['work_id1'] = null;
				$values['User']['work_id2'] = null;
				$values['User']['work_id3'] = null;

				$returnvalue = $this->User->save($values);

				$this->Tag->deleteAll(array('user_id' => $this->Session->read('user_id')), false);

				$tags = explode(";", $_POST['tags']);
				foreach($tags as $tag){
					$info = explode(":", $tag);
					if($info[0] != ""){
						$values['Tag']['tag_id'] = $info[0];
						$values['Tag']['user_id'] = $this->Session->read('user_id');
						$this->Tag->save($values);
					}
				}

				$this->Social->deleteAll(array('user_id' => $this->Session->read('user_id')), false);

				$socials = explode(" ", $_POST['socials']);
				foreach($socials as $social){
					$info = explode(";", $social);
					if($info[0] != ""){
						$values['Social']['name'] = $info[0];
						$values['Social']['url'] = $info[1];
						$values['Social']['user_id'] = $this->Session->read('user_id');
						$this->Social->save($values);
					}
				}

				for($i = 1; $i < 4; $i++){
					if($user[0]["User"]['work_id'.$i] != null){
						$id = $user[0]["User"]['work_id'.$i];
						$this->Work->deleteAll(array('id' => $id), false);
					}

				}

				$works = explode(" ", $_POST['works']);
				$counter = 1;
				foreach($works as $work){
					$info = explode(";", $work);
					if($info[0] != ""){
						$split = trim($info[1], " \t");

						$values['Work']['id'] = "";
						$values['Work']['position'] = "middle";
						$values['Work']['path'] = $split;
						$this->Work->save($values);

						$this->User->id =  $this->Session->read('user_id');
						$field = 'work_id' . $counter++;
						$this->User->saveField($field, $this->Work->id);
					}
				}

				$resultmessage = "addUser";

				$to      = $_POST['email'];
				$subject = 'subscription to creative city';
				$message = 'You have succesfully been subscribed to the creative city platform. This is notification email and can be thrown away.';
				$headers = "";

				mail($to, $subject, $message, $headers);
				
			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($resultmessage);	
		}

		function getWorks(){
			$values = array();
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$user = $this->User->find('all', array('conditions'=>array('id'=> $_POST['id'])));
			}
			else{
				$user = $this->User->find('all', array('conditions'=>array('id'=> $this->Session->read('user_id'))));
			}
			$temp1 = $this->Work->find('all', array('conditions' => array('id' => $user[0]['User']['work_id1'])));
			$temp2 = $this->Work->find('all', array('conditions' => array('id' => $user[0]['User']['work_id2'])));
			$temp3 = $this->Work->find('all', array('conditions' => array('id' => $user[0]['User']['work_id3'])));

			if(!empty($temp1)){
				$values['0'] = $temp1[0]['Work'];
			}
			if(!empty($temp2)){
				$values['1'] = $temp2[0]['Work'];
			}
			if(!empty($temp3)){
				$values['2'] = $temp3[0]['Work'];
			}
					
			$this->autoRender = $this->layout = false;
			echo json_encode($values);
		}

		function logout(){
			$this->Session->destroy();
			$this->autoRender = $this->layout = false;
			echo json_encode("logout");
		}

		function uploadImage(){
			$split = explode('\\', $_FILES["file"]["name"]); 
			$split = trim($split[0], " \t");
			move_uploaded_file($_FILES["file"]["tmp_name"], getcwd() . "/img/uploads/" . $split); 		
			$this->autoRender = $this->layout = false;
		}

		function cropImage(){
			$coords = $_POST['coords'];
			$src = $_POST['src'];
			$unlink_src = $src;
			$target_width = $target_height = 300;

			$temp_coords = explode(' ', $coords);
			$jpeg_quality = 90;
			$temp_src = strtolower($src);
			list($width, $height) = getimagesize('.' . $src);
			if(strrpos($temp_src, 'png')){
				$source = imagecreatefrompng('.' . $src);
				$exploded_src = explode('.', $src);			
				$length = sizeof($exploded_src);
				$extension = $exploded_src[$length - 1];
				$extension_size = -1 * (strlen($extension) + 1);
				$src = substr($src, 0, $extension_size);
				$src = $src .'_cropped.' . $extension;
			}
			else if(strrpos($temp_src, 'jpg') || strrpos($temp_src, 'jpeg')){
				$source = imagecreatefromjpeg('.' . $src);
				$exploded_src = explode('.', $src);				
				$length = sizeof($exploded_src);
				$extension = $exploded_src[$length - 1];
				$extension_size = -1 * (strlen($extension) + 1);
				$src = substr($src, 0, $extension_size);
				$src = $src .'_cropped.' . $extension;
			}

			$thumb = ImageCreateTrueColor($target_width, $target_height);
			
			$exp = 304 / $width;

			
			$result_code = imagecopyresampled($thumb , $source , 0 , 0 , intval($temp_coords[0]) / $exp , intval($temp_coords[1]) / $exp, 
								 $target_width, $target_height, intval($temp_coords[2]) / $exp , intval($temp_coords[3]) / $exp);

			imagejpeg($thumb, '.' . $src, $jpeg_quality);
			unlink('.' . $unlink_src);
			$this->autoRender = $this->layout = false;
			echo json_encode($src);
			
		}

		function deleteProfile(){
			$id = $this->Session->read('user_id');
			//
			if(isset($_POST['delete_id'])){
				$id = $_POST['delete_id'];
			}
		
			if($id == ""){
				$errormessage = "loginError";
			}
			else{	
				$user = $this->User->find('all', array("conditions" => array("id" => $id)));
				$location_id = $user[0]['User']['location_id'];
				$work_id1 = $user[0]['User']['work_id1'];
				$work_id2 = $user[0]['User']['work_id2'];
				$work_id3 = $user[0]['User']['work_id3'];

				

				$this->Tag->deleteAll(array('user_id' => $id), false);
				$this->Social->deleteAll(array('user_id' => $id), false);
				$this->User->deleteAll(array('id' => $id), false);

				$this->Work->deleteAll(array('id' => $work_id1), false);
				$this->Work->deleteAll(array('id' => $work_id2), false);
				$this->Work->deleteAll(array('id' => $work_id3), false);

				$this->Session->write('user_id', '');
				$errormessage = "deletePlace";
			}
			$this->autoRender = $this->layout = false;
			echo json_encode($errormessage);
		}
}

?>