<?php

require_once '../db/db.php';

//Start the php session
session_start();


$mysqli = GetLoginDbConnection();

/* check connection */
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

$sql = "SELECT id, name, username, email, picture, Group_id FROM user";
$res = $mysqli->query($sql);

$return_res = array();
while (($row = $res->fetch_assoc()) != FALSE)
{
	$return_res['success'] = true;
	$return_res['data'][] = $row;
}

echo json_encode($return_res);
