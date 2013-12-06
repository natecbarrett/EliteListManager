<?php
require_once '../db/db.php';

//Start the php session
session_start();


$mysqli = GetLoginDbConnection();

$id = $_POST['id'];

$sql = "DELETE FROM User WHERE id='$id'";

$res = $mysqli->query($sql);

echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"msg" => $mysqli->error
));

/* close connection */
$mysqli->close();
