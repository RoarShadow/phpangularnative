'use strict';
 
app.factory('reimburseService', function($http, $location, sessionService){
	return{
		logout: function(){
			sessionService.destroy('user');	
			$location.path('/');
		},
		fetchuser: function(){
			var user = $http.get('fetch.php');
			return user;
		},
		fetchreimblist: function(){
			var reimblist = $http.get('fetchReimb.php');
			return reimblist;
		},
	
	}
});