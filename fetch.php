<?php
	session_start();
 
	include 'database/dbconn.php';
 
	$output = array();
	$sql = "SELECT * FROM users WHERE userid = '".$_SESSION['user']."'";
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}
 
	echo json_encode($output);
?>