<?php
  header("Access-Control-Allow-Origin: *");
  $pdo = new PDO("mysql:host=localhost;dbname=login", "root", "root");
 
session_start(); //to ensure you are using same session
session_destroy(); //destroy the session
// header("location:herStoryGame"); //to redirect back to "index.php" after logging out
exit();
  ?>