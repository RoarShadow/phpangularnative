'use strict';
 
app.controller('userCtrl', ['$scope', 'userService', '$window','$timeout', function($scope, userService,$window,$timeout){
	//logout

	$scope.logout = function(){
		userService.logout();
	}

    $scope.showAdd = function(){

        $scope.usernamev ="";
        $scope.fnamev = "";
        $scope.mnamev = "";
        $scope.lnamev = "";
        $scope.empnumv = "";
        $scope.passwordv = "";
        $scope.utypev = "";
        $scope.ulevelv = "";
        $scope.ucategoryv = "";
        $scope.approverv = "";
        $scope.approver2v = "";
        $scope.altapproverv = "";
        $scope.emailv = "";
        $scope.ucodefv = "";    
        $scope.isactivev = "";

        $scope.errorempnumv = false;
        $scope.errorfnamev = false;
        $scope.errorlnamev = false;
        $scope.errorpasswordv = false;
        $scope.errorutypev = false;
        $scope.errorulevelv = false;
        $scope.errorucategoryv = false;
        $scope.errorapproverv = false;
        $scope.errorapprover2v = false;
        $scope.erroraltapproverv = false;
        $scope.erroremailv = false;
        $scope.errorposition = false;
        $scope.errorisactivev = false;
        $scope.AddModal = true;
    
    }
    $scope.closeAdd = function(){
        $scope.AddModal = false;
    }
 
	//fetch login user
	var userrequest = userService.fetchuser();
	userrequest.then(function(response){
		$scope.user = response.data[0];
        $scope.fetch();
	});

    //fetch userlist
    $scope.fetch = function(){
        
        var userlistrequest = userService.fetchuserlist();
        userlistrequest.then(function(response){
            console.log(response.data)
            $scope.employee = response.data;
        },function (error){
            console.log(error, 'can not get data.');
        });
    }
	
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   
        $scope.reverse = !$scope.reverse;
    }

    $scope.clearMessage = function(){
        $scope.success = false;
        $scope.error = false;
    }

    $scope.AddModal = false;
    $scope.EditModal = false;
    $scope.DeleteModal = false;
 
    // $scope.errorname = false;
  

    $scope.autogenusername = function() {
        if($scope.empnumv){
            // $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
            $scope.usernamev = $scope.empnumv;
        }
        // if($scope.fnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
        // if($scope.mnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
        // if($scope.lnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
       
    };
    $scope.autogenusername2 = function() {
        if($scope.clickEmployee){
            // $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
            $scope.clickEmployee.username = $scope.clickEmployee.EmpNum;
        }
        // if($scope.fnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
        // if($scope.mnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
        // if($scope.lnamev){
        //     $scope.usernamev = $scope.fnamev.substr(0,1)+$scope.mnamev.substr(0,1)+$scope.lnamev.substr(0,1)+$scope.empnumv;
        // }
       
    };

        //adding user
    $scope.addnew = function(){
        var adduser = userService.createuser($scope);
        adduser.then(function(response){
            console.log(response.data)
            $scope.errorempnumv = false;
                $scope.errorfnamev = false;
                $scope.errorlnamev = false;
                $scope.errorpasswordv = false;
                $scope.errorutypev = false;
                $scope.errorulevelv = false;
                $scope.errorucategoryv = false;
                $scope.errorapproverv = false;
                $scope.errorapprover2v = false;
                $scope.erroraltapproverv = false;
                $scope.erroremailv = false;
                $scope.errorucodefv = false;
                $scope.errorisactivev = false;

            if(response.data.empnum){
                $scope.errorempnumv = true;
                $scope.errorMessage = response.data.message;
                $window.document.all('empnumv').focus();
            }
            else if(response.data.fname){
                $scope.errorfnamev = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('positionV').focus();
                $window.document.all('fnamev').focus();
            }
            else if(response.data.lname){
                $scope.errorlnamev = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('lnamev').focus();
            }
            else if(response.data.password){
                $scope.errorpasswordv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('passwordv').focus();
            }
            else if(response.data.utype){
                $scope.errorutypev = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('utypev').focus();
            }
            else if(response.data.ulevel){
                $scope.errorulevelv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('ulevelv').focus();
            }
            else if(response.data.ucategory){
                $scope.errorucategoryv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('ucategoryv').focus();
            }
            else if(response.data.approver){
                $scope.errorapproverv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('approverv').focus();
            }
            else if(response.data.approver2){
                $scope.errorapprover2v = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('approverv2').focus();
            }
            else if(response.data.altapprover){
                $scope.erroraltapproverv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('altapproverv').focus();
            }
            else if(response.data.email){
                $scope.erroremailv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('emailv').focus();
            }
            else if(response.data.ucode){
                $scope.errorucodefv = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('ucodefv').focus();
            }
            else if(response.data.isactive){
                $scope.errorisactivev = true;
                $scope.errorMessage = response.data.message;
                // $window.document.getElementById('officeV').focus();
                $window.document.all('isactivev').focus();
            }
            
            else if(response.data.error){
                $scope.error = true;
                $scope.errorMessage = response.data.message;
            }
            else{
                $scope.AddModal = false;
                $scope.success = true;
                $scope.successMessage = response.data.message;
                // setTimeout(function() {
                //     $scope.success = false;
                //   }, 1000);
                $timeout(function() {
                    $scope.success = false; 
                },3000);
                
                  
                $scope.fetch();
            } 
        },function (error){
            console.log(error, 'can not get data.');
        });
    }


    $scope.selectUser = function(userlist){
        $scope.clickEmployee = userlist;
    }
    //show edit modal
    $scope.showEdit = function(){
        $scope.EditModal = true;
    }
    //update selected user
    $scope.updateEmployee = function(){
        var edituser = userService.updateuser($scope.clickEmployee);
        edituser.then(function(response){
            console.log(response.data)
            if(response.data.error){
                $scope.error = true;
                $scope.errorMessage = response.data.message;
                $timeout(function() {
                    $scope.error = false; 
                },3000);
                $scope.fetch();
                
            }
            else{
                $scope.success = true;
                $scope.successMessage = response.data.message;
                $timeout(function() {
                    $scope.success = false; 
                },3000);
                $scope.closeEdit();
            }  
        },function (error){
            console.log(error, 'can not get data.');
        });
    }
    //close edit modal
    $scope.closeEdit = function(){
        $scope.EditModal = false;
    }
    //show delete modal
    $scope.showDelete = function(){
        $scope.DeleteModal = true;
    }
    //delete selected user
    $scope.deleteEmployee = function(){
        var deleteuser = userService.deleteuser($scope.clickEmployee);
        deleteuser.then(function(response){
            console.log(response.data)
            if(response.data.error){
                $scope.error = true;
                $scope.errorMessage = response.data.message;
                $timeout(function() {
                    $scope.error = false; 
                },3000);
            }
            else{
                $scope.success = true;
                $scope.successMessage = response.data.message;
                $timeout(function() {
                    $scope.success = false; 
                },3000);
                $scope.fetch();
                $scope.closeDelete();
            } 
        },function (error){
            console.log(error, 'can not get data.');
        });
       
    }
    //close delete modal
    $scope.closeDelete = function(){
        $scope.DeleteModal = false;
    }
}]);


 
//     $scope.showDelete = function(){
//         $scope.DeleteModal = true;
//     }
 
//     $scope.deleteEmployee = function(){
//         $http({
//             method: 'POST',
//             url: 'delete.php',
//             data: $scope.clickEmployee
//         }).then(function (data){
//             console.log(data)
//             if(data.data.error){
//                 $scope.error = true;
//                 $scope.errorMessage = data.data.message;
//             }
//             else{
//                 $scope.success = true;
//                 $scope.successMessage = data.data.message;
//                 $scope.fetch();
//             }  
//         },function (error){
//             console.log(error, 'can not get data.');
//         });
//     }
 
// });