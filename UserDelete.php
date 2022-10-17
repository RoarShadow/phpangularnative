
<?php
    include 'database/dbconn.php';
    $data = json_decode(file_get_contents("php://input"));
 
    $out = array('error' => false);
 
    $id = $data->userid;
 
    $sql = "DELETE FROM users WHERE userid = '$id'";
    $query = $conn->query($sql);
 
    if($query){
        $out['message'] = 'Employee deleted Successfully';
    }
    else{
        $out['error'] = true;
        $out['message'] = 'Cannot delete';
    }
 
    echo json_encode($out);
?>