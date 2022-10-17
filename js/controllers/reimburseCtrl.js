'use strict';
 
app.controller('reimburseCtrl', ['$scope', 'reimburseService', '$window','$timeout', function($scope, reimburseService,$window,$timeout){
	//logout
    $scope.logout = function(){
		reimburseService.logout();
	}

	//fetch login user
	var userrequest = reimburseService.fetchuser();
	userrequest.then(function(response){
		$scope.user = response.data[0];
        $scope.fetch();
	});
  $scope.pendingtab = false;
	$scope.clearMessage = function(){
        $scope.success = false;
        $scope.error = false;
  }

    //fetch userlist
  $scope.fetch = function(){
    var reimblistrequest = reimburseService.fetchreimblist();
      reimblistrequest.then(function(response){
        console.log(response.data)
        $scope.reimblist = response.data;
      },function (error){
        console.log(error, 'can not get data.');
      });
  }

  $scope.sort = function(keyname){
    $scope.sortKey = keyname;   
    $scope.reverse = !$scope.reverse;
  }	

  $scope.pendingtabm = function(){
    $scope.pendingtab = true;
    $scope.approvedtab = false;
    $scope.foryourapprovaltab = false;
  }
  $scope.approvedtabm = function(){
    $scope.pendingtab = false;
    $scope.approvedtab = true;
    $scope.foryourapprovaltab = false;
  }
  $scope.foryourapprovaltabm = function(){
    $scope.pendingtab = false;
    $scope.approvedtab = false;
    $scope.foryourapprovaltab = true;
  }

  $scope.showAdd = function(){
    $scope.AddModal = true;
  }
  $scope.closeAdd = function(){
    $scope.AddModal = false;
  }   

}]);

// function openCity(evt, cityName) {
// 	var i, tabcontent, tablinks;
// 	tabcontent = document.getElementsByClassName("tabcontent");
// 	for (i = 0; i < tabcontent.length; i++) {
// 	  tabcontent[i].style.display = "none";
// 	}
// 	tablinks = document.getElementsByClassName("tablinks");
// 	for (i = 0; i < tablinks.length; i++) {
// 	  tablinks[i].className = tablinks[i].className.replace(" active", "");
// 	}
// 	document.getElementById(cityName).style.display = "block";
// 	evt.currentTarget.className += " active";
//   }