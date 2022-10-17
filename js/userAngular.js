var primaryApp = angular.module('employeeapp', ['angularUtils.directives.dirPagination']);
primaryApp.controller('employeeCTR',function($scope, $http, $window){
    $scope.AddModal = true;
    $scope.EditModal = false;
    $scope.DeleteModal = false;
 
    $scope.errorname = false;
 
    $scope.showAdd = function(){
        $scope.name = null;
        $scope.position = null;
        $scope.office = null;
        $scope.errorname = false;
        $scope.errorposition = false;
        $scope.erroroffice = false;
        $scope.AddModal = true;
    }
   
    $scope.fetch = function(){
        $http({
            method: 'GET',
            url: 'UserFetch.php',
        }).then(function (data){
            console.log(data)
            $scope.employee = data.data;      
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
 
    $scope.addnew = function(){
        $http({
            method: 'POST',
            url: 'add.php',
            data:{name:$scope.name, position:$scope.position, office:$scope.office}
        }).then(function (data){
            console.log(data)
            if(data.data.name){
                $scope.errorname = true;
                $scope.errorposition = false;
                $scope.erroroffice = false;
                $scope.errorMessage = data.data.message;
                $window.document.getElementById('name').focus();
            }
            else if(data.data.position){
                $scope.errorname = false;
                $scope.errorposition = true;
                $scope.erroroffice = false;
                $scope.errorMessage = data.data.message;
                $window.document.getElementById('position').focus();
            }
            else if(data.data.office){
                $scope.errorname = false;
                $scope.errorposition = false;
                $scope.erroroffice = true;
                $scope.errorMessage = data.data.message;
                $window.document.getElementById('office').focus();
            }
            else if(data.data.error){
                $scope.errorname = false;
                $scope.errorposition = false;
                $scope.erroroffice = false;
                $scope.error = true;
                $scope.errorMessage = data.data.message;
            }
            else{
                $scope.AddModal = false;
                $scope.success = true;
                $scope.successMessage = data.data.message;
                $scope.fetch();
            }     
        },function (error){
            console.log(error, 'can not get data.');
        });
    }
 
    $scope.selectEmployee = function(employee){
        $scope.clickEmployee = employee;
    }
 
    $scope.showEdit = function(){
        $scope.EditModal = true;
    }
 
    $scope.updateEmployee = function(){
        $http({
            method: 'POST',
            url: 'edit.php',
            data: $scope.clickEmployee
        }).then(function (data){
            console.log(data)
            if(data.error){
                $scope.error = true;
                $scope.errorMessage = data.data.message;
                $scope.fetch();
            }
            else{
                $scope.success = true;
                $scope.successMessage = data.data.message;
            }     
        },function (error){
            console.log(error, 'can not get data.');
        });
    }
 
    $scope.showDelete = function(){
        $scope.DeleteModal = true;
    }
 
    $scope.deleteEmployee = function(){
        $http({
            method: 'POST',
            url: 'delete.php',
            data: $scope.clickEmployee
        }).then(function (data){
            console.log(data)
            if(data.data.error){
                $scope.error = true;
                $scope.errorMessage = data.data.message;
            }
            else{
                $scope.success = true;
                $scope.successMessage = data.data.message;
                $scope.fetch();
            }  
        },function (error){
            console.log(error, 'can not get data.');
        });
    }
 
});