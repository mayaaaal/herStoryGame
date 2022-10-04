<?php
header("Access-Control-Allow-Origin: *");

$name = $_POST['name'];
$nickname = $_POST['nickname'];

$pdo = new PDO("mysql:host=localhost;dbname=login", "root", "");
$statement = $pdo->prepare("SELECT * FROM User WHERE name = ? AND nickname = ?");
$statement->execute([
    $name, $nickname
]);


if($statement->fetch(PDO::FETCH_OBJ) != null) {
    echo "OK";
} else {
 

    $my_Insert_Statement = $pdo->prepare("INSERT INTO User (name, nickname) VALUES (:first_name, :nick_name)");
    $my_Insert_Statement->bindParam(':first_name', $name);
    $my_Insert_Statement->bindParam(':nick_name', $nickname);
    if ($my_Insert_Statement->execute()) {
    echo "New record created successfully";
  } else {
    echo "Unable to create record";
  }
    echo "KO";
}

?>