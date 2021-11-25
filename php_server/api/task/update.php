<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Task.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate task object
  $task = new Task($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $task->id = $data->id;

  $task->name = $data->name;

  // Update task
  if($task->update()) {
    echo json_encode(
      array('message' => 'Task Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'Task Not Updated')
    );
  }

