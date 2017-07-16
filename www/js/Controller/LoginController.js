angular.module($appModule).controller('LoginController', function($scope, $state)
{
	$scope.login = {
		'server_host' 	: 'albertolabs.com',
		'server_user' 	: 'demo@albertolabs.com',
		'server_pwd' 	: 'demo'
	};

	$scope.signin = function()
	{
		if( $scope.login.server_host.length && $scope.login.server_user.length && $scope.login.server_pwd.length )
		{
			// go to home page
			$state.go('index');
		}
		else
		{
			alert('All fields are required!');
		}
	}

});