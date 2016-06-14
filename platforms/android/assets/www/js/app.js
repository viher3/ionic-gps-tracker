// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionic-gps-tracker', ['ionic', 'ngMap'])

.run(function($ionicPlatform) 
{
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
.controller('GpsCtrl', function($scope, $ionicLoading) 
{
    // init pos
    $scope.positions = [{
      lat: 42.3569986,
      lng: -4.8816935
    }];

    // map loaded
    $scope.$on('mapInitialized', function(event, map) 
    {
      $scope.map = map;
    });

    $scope.centerOnMe= function()
    {
      $scope.positions = [];
      
      $ionicLoading.show({
        template: 'Loading...'
      });

      navigator.geolocation.getCurrentPosition(function(position) 
      {
        // get lat and long
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        // new map position
        var pos = new google.maps.LatLng(latitude, longitude);

        // add positions to array
        $scope.positions.push({lat: latitude,lng: longitude});

        // center map
        $scope.map.setCenter(pos);

        // hide loading mssg
        $ionicLoading.hide();
      });
    };

})
.controller('IndexCtrl', function($scope)
{
  var intervalGetPosition;

  $scope.jsonPositionsLog   = [];
  $scope.isTrackingPosition = false;

  $scope.startTracking = function()
  {
    intervalGetPosition = setInterval(function()
    { 
      getCurrentPosition(); 
    }, 
    5000);
  }

  getCurrentPosition = function()
  {
    navigator.geolocation.getCurrentPosition(function(position) 
    {
      // get lat and long
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      // add positions to array
      $scope.jsonPositionsLog.push({
        latitude: latitude,
        longitude: longitude
      });

      console.log(latitude + "/" + longitude);
    });
  }

  $scope.stopGettingPosition = function()
  {
    clearInterval(intervalGetPosition);
  }

})
;
