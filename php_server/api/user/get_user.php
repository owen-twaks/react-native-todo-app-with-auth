<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/User.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate user object
  $user = new User($db);

  // Get email and password
  $user->email = isset($_GET['email']) ? $_GET['email'] : die();
  $user->password = isset($_GET['password']) ? $_GET['password'] : die();

  // Get user
  $user->get_user();

  // Create array
  $user_arry = array(
    'id' => $user->id,
    'firstname' => $user->firstname,
    'lastname' => $user->lastname,
    'email' => $user->email,
    'avatar' => $user->avatar,
  );

  // Make JSON
  print_r(json_encode($user_arry));