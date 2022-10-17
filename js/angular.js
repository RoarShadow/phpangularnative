


// var app = angular.module('app', ['ngRoute','usercontainer']);


var app = angular.module('app', ['ngRoute','angularUtils.directives.dirPagination']);


app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	})
	.when('/home', {
		templateUrl: 'home.html',
		controller: 'homeCtrl'
	})	
	.when('/user', {
		templateUrl: 'user.html',
		controller: 'userCtrl'
		
	})
	.when('/reimbursement', {
		templateUrl: 'reimbursement.html',
		controller: 'reimburseCtrl'
		
	})
	.otherwise({
		redirectTo: '/'
	});
});
 
app.run(function($rootScope, $location, loginService){
	//prevent going to homepage if not loggedin
	var routePermit = ['/home'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routePermit.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(response){
				if(!response.data){
					$location.path('/');
				}
			});
 
		}
	});
	var routePermit1 = ['/user'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routePermit1.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(response){
				if(!response.data){
					$location.path('/');
				}
			});
 
		}
	});
	var routePermit2 = ['/reimbursement'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routePermit2.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(response){
				if(!response.data){
					$location.path('/');
				}
			});
 
		}
	});
	//prevent going back to login page if session is set
	var sessionStarted = ['/'];
	$rootScope.$on('$routeChangeStart', function(){
		if(sessionStarted.indexOf($location.path()) !=-1){
			var cantgoback = loginService.islogged();
			cantgoback.then(function(response){
				if(response.data){
					$location.path('/home');
				}
			});
		}
	});

	
});


// var primaryApp = angular.module('usercontainer', ['angularUtils.directives.dirPagination']);
// primaryApp.controller('employeeCTR',function($scope, $http, $window){
// 	$scope.AddModal = false;
//     $scope.EditModal = false;
//     $scope.DeleteModal = false;
 
//     $scope.errorname = false;
 
//     $scope.showAdd = function(){
//         $scope.namev = null;
//         $scope.positionv = null;
//         $scope.officev = null;
//         $scope.errorname = false;
//         $scope.errorposition = false;
//         $scope.erroroffice = false;
//         $scope.AddModal = true;
//     }

// 	$scope.closeAdd = function(){
//         $scope.AddModal = false;
//     }
// 	$scope.closeEdit = function(){
// 		$scope.EditModal = false;
//     }
// 	$scope.closeDelete = function(){
// 		$scope.DeleteModal = false;
//     }

   
//     $scope.fetch = function(){

	
//         $http({
//             method: 'GET',
//             url: 'UserFetch.php',
//         }).then(function (data){
//             console.log(data)
//             $scope.employee = data.data;      
//         },function (error){
//             console.log(error, 'can not get data.');
//         });
//     }
 
//     $scope.sort = function(keyname){
//         $scope.sortKey = keyname;   
//         $scope.reverse = !$scope.reverse;
//     }
 
//     $scope.clearMessage = function(){
//         $scope.success = false;
//         $scope.error = false;
//     }
 
//     $scope.addnew = function(){
//         $http({
//             method: 'POST',
//             url: 'UserAdd.php',
//             data:{name:$scope.namev, position:$scope.positionv, office:$scope.officev}
//         }).then(function (data){
//             console.log(data)
//             if(data.data.name){
//                 $scope.errorname = true;
//                 $scope.errorposition = false;
//                 $scope.erroroffice = false;
//                 $scope.errorMessage = data.data.message;
//                 $window.document.getElementById('name').focus();
//             }
//             else if(data.data.position){
//                 $scope.errorname = false;
//                 $scope.errorposition = true;
//                 $scope.erroroffice = false;
//                 $scope.errorMessage = data.data.message;
//                 $window.document.getElementById('position').focus();
//             }
//             else if(data.data.office){
//                 $scope.errorname = false;
//                 $scope.errorposition = false;
//                 $scope.erroroffice = true;
//                 $scope.errorMessage = data.data.message;
//                 $window.document.getElementById('office').focus();
//             }
//             else if(data.data.error){
//                 $scope.errorname = false;
//                 $scope.errorposition = false;
//                 $scope.erroroffice = false;
//                 $scope.error = true;
//                 $scope.errorMessage = data.data.message;
//             }
//             else{
//                 $scope.AddModal = false;
//                 $scope.success = true;
//                 $scope.successMessage = data.data.message;
//                 $scope.fetch();
//             }     
//         },function (error){
//             console.log(error, 'can not get data.');
//         });
//     }
 
//     $scope.selectEmployee = function(employee){
//         $scope.clickEmployee = employee;
//     }
 
//     $scope.showEdit = function(){
//         $scope.EditModal = true;
//     }
 
//     $scope.updateEmployee = function(){
//         $http({
//             method: 'POST',
//             url: 'UserEdit.php',
//             data: $scope.clickEmployee
//         }).then(function (data){
//             console.log(data)
//             if(data.error){
//                 $scope.error = true;
//                 $scope.errorMessage = data.data.message;
//                 $scope.fetch();
//             }
//             else{
// 				$scope.EditModal = false;
//                 $scope.success = true;
//                 $scope.successMessage = data.data.message;
//             }     
//         },function (error){
//             console.log(error, 'can not get data.');
//         });
//     }
 
//     $scope.showDelete = function(){
//         $scope.DeleteModal = true;
//     }
 
//     $scope.deleteEmployee = function(){
//         $http({
//             method: 'POST',
//             url: 'UserDelete.php',
//             data: $scope.clickEmployee
//         }).then(function (data){
//             console.log(data)
//             if(data.data.error){
//                 $scope.error = true;
//                 $scope.errorMessage = data.data.message;
//             }
//             else{
// 				$scope.DeleteModal = false;
//                 $scope.success = true;
//                 $scope.successMessage = data.data.message;
//                 $scope.fetch();
//             }  
//         },function (error){
//             console.log(error, 'can not get data.');
//         });
//     }
// });
