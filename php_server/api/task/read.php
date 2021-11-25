<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Task.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate task object
  $task = new Task($db);

  // task query
  $result = $task->read();
  // Get row count
  $num = $result->rowCount();

  // Check if any tasks
  if($num > 0) {
    // Task array
    $tasks_arr = array();
    // $tasks_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $task_item = array(
        'id' => $id,
        'name' => $name,
      );

      // Push to "data"
      array_push($tasks_arr, $task_item);
      // array_push($tasks_arr['data'], $task_item);
    }

    // Turn to JSON & output
    echo json_encode($tasks_arr);

  } else {
    // No Tasks
    echo json_encode(
      array('message' => 'No Tasks Found')
    );
  }
