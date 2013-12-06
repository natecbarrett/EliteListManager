<?php

require_once '../db/db.php';

//Start the php session
session_start();


$mysqli = GetLoginDbConnection();

//Get the id of the user, if there is one in the post.
$id = isset($_POST['id']) ? $_POST['id'] : 0;

//get the username from the post.
$userName = $_POST['username'];

//Get the full name from the post.
$name = $_POST['name'];

//Get the email fro mthe post.
$email = $_POST['email'];

//Get the group from the post.
$group = $_POST['Group_id'];

//The defautl password.
$password = "e10adc3949ba59abbe56e057f20f883e";

//The upload directory to use.
$uploads_dir = '../../resources/profileImages';

//Check to see if the user uploaded a file.
if(isset($_FILES))
{
	//The temp file name.
	$tmpName = $_FILES['picture']['tmp_name'];

	//The filename.
	$fileName = $_FILES['picture']['name'];

	//Move the file to our upload directory.
	move_uploaded_file($tmpName, "$uploads_dir/$fileName");
}

//Check to see if the id is 0, if so, we are creating a new record
if ($id ==  0)
{

	$sql = "INSERT INTO user (name, userName, password, email, picture, Group_id) VALUES ('$name', '$userName', '$password', '$email', '$fileName', '$group')";

	//Run the query to do the insert.
	if ($res = $mysqli->query($sql)) {

		//Get the id fo the created user.
		$id = $mysqli->insert_id;
	}

}

else
{

	$sql = "UPDATE user SET name = '$name', userName = '$userName', email = '$email', ";

	//If we have a file, update the filename.
	if ($fileName != null) {
		$sql .= "picture = '$fileName', ";
	}

	$sql .= "Group_id = '$group' WHERE id='$id'";

	$res = $mysqli->query($sql);
}

header('Content-type: text/html');

echo json_encode(array(
	"success" => $mysqli->error == '',
	"msg" => $mysqli->error,
	"id" => $id
));

/* close connection */
$mysqli->close();
