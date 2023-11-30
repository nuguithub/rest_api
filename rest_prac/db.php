<?php

// Database configuration
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'my_database';

// Create a connection
$db = new mysqli($host, $user, $password, $database);

// Check the connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}