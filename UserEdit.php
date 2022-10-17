
<?php
    include 'database/sessionvariable.php'; 
    include 'database/dbconn.php';
    $data = json_decode(file_get_contents("php://input"));
 
    $out = array('error' => false);
 
    $empnumf = $data->EmpNum;
    $fnamef = $data->FirstName;
    $mnamef = $data->MiddleName;
    $lnamef = $data->LastName;
    $usernamef = $data->username;
    $passwordf = $data->passwrd;
    $utypef = $data->UserType;
    $ulevelf = $data->UserLevel;
    $ucategoryf = $data->UserCategory;
    $approverf = $data->ApproverId;
    $approver2f = $data->ApproverId2;
    $altapproverf = $data->AlternateApprover;
    $emailf = $data->UserEmail;
    $ucodef = $data->UserCode;
    $isactivef = $data->IsActive;
    $id = $data->userid;

    $checkpassword = "SELECT * FROM users WHERE passwrd = '".$passwordf."' AND  userid ='".$id."' ";
    $checkpasswordres = $conn->query($checkpassword);
    if($checkpasswordres){
        if(mysqli_num_rows($checkpasswordres) > 0){
            // var_dump($checkpassword);exit();
            $sql = "UPDATE users SET EmpNum = '$empnumf', FirstName = '$fnamef', MiddleName = '$mnamef', LastName = '$lnamef', username = '$usernamef', passwrd = '$passwordf', UserType = '$utypef', UserLevel = '$ulevelf', UserCategory = '$ucategoryf', ApproverId = '$approverf', ApproverId2 = '$approver2f', AlternateApprover = '$altapproverf', UserEmail = '$emailf', UserCode = '$ucodef', IsActive = '$isactivef', UpdatedById = '$userLogId', UpdatedDate = '$servertimenow' WHERE userid  = '$id' ";
            $query = $conn->query($sql);
        }
        else{
            $passwordf = sha1($passwordf);
            $sql = "UPDATE users SET EmpNum = '$empnumf', FirstName = '$fnamef', MiddleName = '$mnamef', LastName = '$lnamef', username = '$usernamef', passwrd = '$passwordf', UserType = '$utypef', UserLevel = '$ulevelf', UserCategory = '$ucategoryf', ApproverId = '$approverf', ApproverId2 = '$approver2f', AlternateApprover = '$altapproverf', UserEmail = '$emailf', UserCode = '$ucodef', IsActive = '$isactivef', UpdatedById = '$userLogId', UpdatedDate = '$servertimenow' WHERE userid  = '$id' ";
            $query = $conn->query($sql);
    
        }
     
        

    }
   
//  var_dump($sql );exit();
    if($query){
        $out['message'] = 'Employee updated Successfully';
    }
    else{
        $out['error'] = true;
        $out['message'] = 'Cannot update';
    }
 
    echo json_encode($out);
?>