<?php

//Start the session
session_start();

//Empty the session array
$_SESSION = array();

//Destroy the session
session_destroy();

$result = array();

$result['success'] = true;
$result['msg'] = 'logout';

echo json_encode($result);