<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class LocationsController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Location';
		var $uses = array('Location');
		var $component = array('Session');

		function addLocation(){
			$x_coordinate = $_POST['x'];
			$y_coordinate = $_POST['y'];
			$radius = $_POST['radius'];

			$values['Location']['id'] = '';
			$values['Location']['x'] = $x_coordinate;
			$values['Location']['y'] = $y_coordinate;
			$values['Location']['radius'] = $radius;

			$returnvalue = $this->Location->save($values);
			$this->autoRender = $this->layout =  false;
			echo json_encode($returnvalue);
		}

		function getLocation($id = null) {
			if($id == null) 
				$id = $this->Session->read('user_id'); 

			$location = $this->Location->find('all', array('conditions'=>array('id'=>$id)));
			$this->autoRender = $this->layout =  false;
			if($id == null)
				echo json_encode($location);
			else
				return $location;
		}

		function wgs842rd($coords){
			//$SomX = 0;
			//$SomY = 0;
			//$dF = 0;
			//$dL = 0;
			$InputF = $coords['lat'];
			$InputL = $coords['lng'];
			$X = 0;
			$Y = 0;


			$dF = 0.36 * ($InputF - 52.15517440);
			$dL = 0.36 * ($InputL - 5.38720621);

			$SomX= (190094.945 * $dL) + (-11832.228 * $dF * $dL) + (-144.221 * pow($dF,2) * $dL) + (-32.391 * pow($dL,3)) + (-0.705 * $dF) + (-2.340 * pow($dF,3) * $dL) + (-0.608 * $dF * pow($dL,3)) + (-0.008 * pow($dL,2)) + (0.148 * pow($dF,2) * pow($dL,3));

			$SomY = (309056.544 * $dF) + (3638.893 * pow($dL,2)) + (73.077 * pow($dF,2) ) + (-157.984 * $dF * pow($dL,2)) + (59.788 * pow($dF,3) ) + (0.433 * $dL) + (-6.439 * pow($dF,2) * pow($dL,2)) + (-0.032 * $dF * $dL) + (0.092 * pow($dL,4)) + (-0.054 * $dF * pow($dL,4));

			$X = 155000 + $SomX;
			$Y = 463000 + $SomY;

			$values['x'] = $X; 
		    $values['y'] = $Y;
			return $values;
		}
}
?>