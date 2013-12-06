<?php
require_once 'db/db.php';

//Start the php session
session_start();


$mysqli = GetLoginDbConnection();

//Get the username
$username = $mysqli->real_escape_string(stripslashes($_POST['user']));

//Get the password.
$pass = $mysqli->real_escape_string(stripslashes($_POST['password']));

//Create the sql to get the info fro mthe users table.
$sql = "SELECT * FROM user WHERE userName='$username' AND password='$pass'";

//Array to hold the result
$result = array();

//Run the query
if ($resultdb = $mysqli->query($sql))
{
	//Get the number of rows returned.
	$count = $resultdb->num_rows;

	//Make sure we found it
	if ($count==1)
	{
		$_SESSION['authenticated'] = "yes";
		$_SESSION['userName'] = $username;

		$result['success'] = true;
		$result['msg'] = 'USer authenticated';
	}

	else
	{
		$result['success'] = false;
		$result['msg'] = "Incorrect user or password";
	}

	$resultdb->close();

}

$mysqli->close();

echo json_encode($result);


