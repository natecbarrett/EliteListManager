<?php




class ConnectionFactory
{
	private static $factory;
	public static function getFactory()
	{
		if (!self::$factory)
			self::$factory = new ConnectionFactory();
		return self::$factory;
	}

	private $db;

	public function getLoginSystemConnection() {

		$server = "192.129.201.37";
		$user = "systemuser";
		$pass = "SGDKLCL3Scu4MM9E";
		$dbName = "login_system";

		/*
		$server = "localhost";
		$user = "root";
		$pass = "root";
		$dbName = "login_system";*/

		if (!$this->db) $this->db = new mysqli($server, $user, $pass, $dbName);
		return $this->db;
	}

	public function getSystemConnection() {

		$server = "192.129.201.37";
		$user = "systemuser";
		$pass = "SGDKLCL3Scu4MM9E";
		$dbName = "login_system";

		/*
		$server = "localhost";
		$user = "root";
		$pass = "root";
		$dbName = "list_manager";*/

		if (!$this->db) $this->db = new mysqli($server, $user, $pass, $dbName);
		return $this->db;
	}
}

function GetLoginDbConnection()
{
	return ConnectionFactory::getFactory()->getLoginSystemConnection();
}

function GetDbConnection()
{
	return ConnectionFactory::getFactory()->getLoginSystemConnection();
}


