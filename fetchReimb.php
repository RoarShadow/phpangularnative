
<?php
	session_start();
    include 'database/dbconn.php';
    //  var_dump($_SESSION['user'])exit();
    $output = array();
    $sql = "SELECT *,sum(Amount) as totalamount FROM reimbursements GROUP BY ExpenseCountId ORDER BY CreatedDate DESC";
    $query=$conn->query($sql);
    while($row=$query->fetch_array()){
        $output[] = $row;
    }
 
    echo json_encode($output);
    // echo json_encode($output, JSON_UNESCAPED_SLASHES);
?>