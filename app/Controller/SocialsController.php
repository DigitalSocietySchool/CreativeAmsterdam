<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class SocialsController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Social';
		var $uses = array('Social');
		var $component = array('Session');
		
		function getSocials(){
			$id = 0;
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$id = $_POST['id'];
			}
			else{
				$id = $this->Session->read('user_id');
			}

			$socials = $this->Social->find('all', array(
										'conditions' => array(
												$_POST['table'] . '_id'=>$id)
										)
			);
			$this->autoRender = $this->layout =  false;
			echo json_encode($socials);
		}

		function addSocial() {
			
		}
}

?>