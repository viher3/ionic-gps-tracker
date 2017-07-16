angular.module($appModule, ['ionic'])

.run(function($ionicPlatform) 
{
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) 
{
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })

        .state('index', {
            url: '/index',
            templateUrl: 'templates/home.html',
            controller: 'IndexController'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});