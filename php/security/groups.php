<?php

require_once '../db/db.php';

//Start the php session
session_start();


$mysqli = GetLoginDbConnection();


$sql = "SELECT * FROM GROUPS";

$result = array();

if ($resultdb = $mysqli->query($sql)) {

	while($profile = $resultdb->fetch_assoc()) {
		$result[] = $profile;
	}

	$resultdb->close();
}

echo json_encode(array(
	"success" => $mysqli->connect_errno == 0,
	"data" => $result
));

/* close connection */
$mysqli->close();