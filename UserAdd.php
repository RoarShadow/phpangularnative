<?php
    include 'database/sessionvariable.php'; 
    include 'database/dbconn.php';
    
    $data = json_decode(file_get_contents("php://input"));
 
    $out = array('error' => false, 'empnum' => false, 'fname' => false, 'lname' => false, 'username' => false, 'password' => false, 'utype' => false, 'ulevel' => false, 'ucategory' => false, 'approver' => false, 'approver2' => false, 'altapprover' => false, 'email' => false, 'ucode' => false);
 
    $empnumf = $data->empnumf;
    $fnamef = $data->fnamef;
    $mnamef = $data->mnamef;
    $lnamef = $data->lnamef;
    $usernamef = $data->usernamef;
    $passwordf = $data->passwordf;
    $utypef = $data->utypef;
    $ulevelf = $data->ulevelf;
    $ucategoryf = $data->ucategoryf;
    $approverf = $data->approverf;
    $approver2f = $data->approver2f;
    $altapproverf = $data->altapproverf;
    $emailf = $data->emailf;
    $ucodef = $data->ucodef;
    $isactivef = $data->isactivef;
    // var_dump($utypef);exit();
    
 
    if(empty($empnumf)){
        $out['empnum'] = true;
        $out['message'] = 'empnum is required'; 
    } 
    elseif(empty($fnamef)){
        $out['fname'] = true;
        $out['message'] = 'fname is required'; 
    }
    elseif(empty($lnamef)){
        $out['lname'] = true;
        $out['message'] = 'lname is required'; 
    }
    elseif(empty($passwordf)){
        $out['password'] = true;
        $out['message'] = 'password is required'; 
    }
    elseif(empty($utypef) && $utypef != 0){
        $out['utype'] = true;
        $out['message'] = 'user type is required'; 
    }
   
    elseif(empty($ulevelf)){
        $out['ulevel'] = true;
        $out['message'] = 'user level is required'; 
    }
    elseif(empty($ucategoryf)){
        $out['ucategory'] = true;
        $out['message'] = 'user category is required'; 
    }
    elseif(empty($approverf)){
        $out['approver'] = true;
        $out['message'] = 'approver is required'; 
    }
    elseif(empty($approver2f)){
        $out['approver2'] = true;
        $out['message'] = 'approver2 is required'; 
    }
    elseif(empty($altapproverf)){
        $out['altapprover'] = true;
        $out['message'] = 'alternative approver is required'; 
    }
    elseif(empty($emailf)){
        $out['email'] = true;
        $out['message'] = 'email is required and must be email format'; 
    }
    else{
        if(!empty($emailf)){
            $checkemail = checkemailformat($emailf);
            $regex = '/^[^0-9][_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
            if (!preg_match($regex, $checkemail)) {
                 // var_dump($checkemail);exit();
                $out['email'] = true;
                $out['message'] = 'email must be email format'; 
            } 
            elseif(empty($ucodef)){
                $out['ucode'] = true;
                $out['message'] = 'user code is required'; 
            }
            elseif(empty($isactivef)){
                $out['isactive'] = true;
                $out['message'] = 'Is Active is required'; 
            }
            else{
                $passwordf = sha1($passwordf);
                $sql = "INSERT INTO users (EmpNum,username, passwrd, FirstName, MiddleName,LastName,UserType,UserLevel,UserCategory,ApproverId,ApproverId2,AlternateApprover,UserEmail,UserCode,IsActive,CreatedById,CreatedDate) VALUES ('$empnumf', '$usernamef','$passwordf','$fnamef', '$mnamef', '$lnamef', '$utypef','$ulevelf','$ucategoryf','$approverf','$approver2f','$altapproverf','$emailf','$ucodef','$isactivef','$userLogId','$servertimenow')";
                $query = $conn->query($sql);
        //  var_dump($sql);exit();
                if($query){
                    $out['message'] = 'New User Added Successfully';
                }
                else{
                    $out['error'] = true;
                    $out['message'] = 'Cannot Add';
                }
            }
        }
        
  
    }
         
    echo json_encode($out);



    function checkemailformat($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
?>