<?php
 
session_start();
 
include 'database/dbconn.php';
 
$out = array('error' => false);
 
$user = json_decode(file_get_contents('php://input'));
 
$username = $user->username;	
$password = sha1($user->password);
 
$sql = "SELECT * FROM users WHERE username='$username' AND passwrd='$password'";
$query = $conn->query($sql);
 
if($query->num_rows>0){
	$row = $query->fetch_array();
	$out['message'] = 'Login Successful';
	$out['user'] = uniqid('ang_');
	$_SESSION['user'] = $row['userid'];
	$_SESSION['datenow'] = date("Y-m-d H:i:s");
}
else{
	$out['error'] = true;
	$out['message'] = 'Invalid Login';
}
 
echo json_encode($out);
 
?>