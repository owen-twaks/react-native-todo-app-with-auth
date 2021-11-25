<?php 
  class User {
    // DB stuff
    private $conn;
    private $table = 'users';

    // User Properties
    public $id;
    public $user;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Single User
    public function get_user() {
          // Create query
          $query = 'SELECT 
            id,
            firstname,
            lastname,
            email,
            avatar
          FROM ' . $this->table . '
          WHERE
            email = :email
            AND password = :password
          LIMIT 0,1';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind data
          $stmt->bindParam(':email', $this->email);
          $stmt->bindParam(':password', $this->password);
          // $stmt->bindParam('password',$this->password);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->id = $row['id'];
          $this->firstname = $row['firstname'];
          $this->lastname = $row['lastname'];
          $this->email = $row['email'];
          $this->avatar = $row['avatar'];
    }

    // Create User
    public function register_user() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET firstname = :firstname, lastname = :lastname, email = :email, password= :password';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->firstname = htmlspecialchars(strip_tags($this->firstname));
          $this->lastname = htmlspecialchars(strip_tags($this->lastname));
          $this->email = htmlspecialchars(strip_tags($this->email));
          $this->password = htmlspecialchars(strip_tags($this->password));

          // Bind data
          $stmt->bindParam(':firstname', $this->firstname);
          $stmt->bindParam(':lastname', $this->lastname);
          $stmt->bindParam(':email', $this->email);
          $stmt->bindParam(':password', $this->password);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update User Profile
    public function update_avatar() {
          // Create query
          $query = 'UPDATE ' . $this->table . ' SET avatar = :avatar WHERE id = :id';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->avatar = htmlspecialchars(strip_tags($this->avatar));
          $this->id = htmlspecialchars(strip_tags($this->id));

          // Bind data
          $stmt->bindParam(':avatar', $this->avatar);
          $stmt->bindParam(':id', $this->id);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }
    
  }