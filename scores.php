<?php
header("Access-Control-Allow-Origin: *");

$userID = $_POST['userID'];
$score = $_POST['score'];

$pdo = new PDO("mysql:host=localhost;dbname=login", "root", "");
$statement = $pdo->prepare("INSERT INTO scores (id_user, score, date) VALUES (?,?, NOW())");
$ok= $statement->execute([
    $userID, $score
]);

$statement = $pdo->prepare("SELECT COUNT(id_user) AS numOfTims,AVG(score) AS avarage FROM scores WHERE id_user = ? ");
  $statement->execute([
    $userID
  ]);

  $result = $statement->fetch(PDO::FETCH_OBJ);
  echo json_encode($result);



// if($statement->fetch(PDO::FETCH_OBJ) != null) {
//     echo "OK";
// } else {
 

//     $my_Insert_Statement = $pdo->prepare("INSERT INTO User (name, nickname) VALUES (:first_name, :nick_name)");
//     $my_Insert_Statement->bindParam(':first_name', $name);
//     $my_Insert_Statement->bindParam(':nick_name', $nickname);
//     if ($my_Insert_Statement->execute()) {
//     echo "New record created successfully";
//   } else {
//     echo "Unable to create record";
//   }
//     echo "KO";
// }

?>