<?php
  header("Access-Control-Allow-Origin: *");

  $result = array("id"=> -1);

  $name = $_POST['name'];
  $nickname = $_POST['nickname'];

  
  $pdo = new PDO("mysql:host=localhost;dbname=login", "root", "root");
  $statement = $pdo->prepare("SELECT * FROM User WHERE name = ? AND nickname = ?");
  $statement->execute([
    $name, $nickname
  ]);

  $result = $statement->fetch(PDO::FETCH_OBJ);

  if($result == null) {
    $my_Insert_Statement = $pdo->prepare("INSERT INTO User (name, nickname) VALUES (:first_name, :nick_name)");
    $my_Insert_Statement->bindParam(':first_name', $name);
    $my_Insert_Statement->bindParam(':nick_name', $nickname);
    if ($my_Insert_Statement->execute()) {
      
      $lastId = $pdo->lastInsertId();
      $statement = $pdo->prepare("SELECT * FROM User WHERE id = ? ");
      $statement->execute([ $lastId ]);

      $result = $statement->fetch(PDO::FETCH_OBJ);
    }
  }
  echo json_encode($result);
?>