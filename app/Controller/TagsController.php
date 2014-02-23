<?php 
/*********************************************************
 *                                                       *
 *  Developed by CJC Automatisering.                     *
 *  MIT License, copyright (c) 2014 MediaLab Amsterdam   *
 *                                                       *
 *********************************************************/
 ?>
<?php
class TagsController extends AppController {
		public $helpers = array ('Js' => array('Jquery'), 'Html', 'Form');
		var $name = 'Tag';
		var $uses = array('Taglib', 'Tag');
		var $component = array('Session');
		
		function getAllTags(){
            $values = array();
			$tags = $this->Taglib->find('all', array('order' => array('Taglib.tag ASC')));
			
            foreach($tags as $tag){
                $values[] = array($tag['Taglib']['id'], $tag['Taglib']['tag']);
            }
            $this->log($values);
			$this->autoRender = $this->layout =  false;
			echo json_encode($values);
		}
		
		function getTags() {
			$result = array();
			if(isset($_POST['id']) && $_POST['id'] != ""){
				$id = $_POST['id'];
			}
			else{
				$id = $this->Session->read('user_id');
			}

			$tags = $this->Tag->find('all', array(
										'conditions' => array($_POST['table'] . '_id' => $id),
										)
			);
			//var_dump($tags);
			foreach ($tags as $tag => $id) {

				$query = $this->Taglib->find('all', array(
									'conditions' => array('id' => $id['Tag']['tag_id'])
				));

				$result[$query[0]['Taglib']['id']] = $query[0]['Taglib']['tag'];
			}
			$this->autoRender = $this->layout =  false;
			echo json_encode($result);
		}

		function addTag() {
			$values['id'] = '';
			$values['tag'] = $_POST['tagname'];
			$result = $this->Taglib->save($values);
			$this->autoRender = $this->layout =  false;
			echo json_encode($result);
		}
}

?>