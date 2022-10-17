'use strict';
 
app.factory('userService', function($http, $location, sessionService){
	return{
		logout: function(){
			sessionService.destroy('user');
			$location.path('/');
		},
		fetchuser: function(){
			var user = $http.get('fetch.php');
			return user;
		},
		fetchuserlist: function(){
			var employee = $http.get('UserFetch.php');
			return employee;
		},
		createuser: function(scope){
			var checkadduser = $http({
				            method: 'POST',
				            url: 'UserAdd.php',
				            data:{
								empnumf:scope.empnumv, 
								fnamef:scope.fnamev, 
								mnamef:scope.mnamev, 
								lnamef:scope.lnamev, 
								usernamef:scope.usernamev, 
								passwordf:scope.passwordv, 
								utypef:scope.utypev, 
								ulevelf:scope.ulevelv, 
								ucategoryf:scope.ucategoryv, 
								approverf:scope.approverv, 
								approver2f:scope.approver2v, 
								altapproverf:scope.altapproverv, 
								emailf:scope.emailv, 
								ucodef:scope.ucodefv, 
								isactivef:scope.isactivev
							}
				        });
			return checkadduser;
		},
		updateuser: function(clickEmployee){
			var checkupdateuser = $http({
				            method: 'POST',
				            url: 'UserEdit.php',
				            data:clickEmployee
				        });
			return checkupdateuser;
		},
		deleteuser: function(clickEmployee){
			var checkdeleteuser = $http({
				            method: 'POST',
				            url: 'UserDelete.php',
				            data:clickEmployee
				        });
			return checkdeleteuser;
		}
	}
});