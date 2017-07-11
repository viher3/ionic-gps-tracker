angular.module($appModule).controller('IndexController', function($scope)
{
  var intervalGetPosition;

  $scope.jsonPositionsLog   = [];
  $scope.isTrackingPosition = false;

  $scope.startTracking = function()
  {
    // init location listener
    initGetLocationListener();
  }

  $scope.stopTrackingPosition = function()
  {
    navigator.geolocation.clearWatch(intervalGetPosition);
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

      $scope.$apply();
    });
  }

  initGetLocationListener = function()
  {
    // init location listener
    intervalGetPosition = navigator.geolocation.watchPosition( function(position)
    {
      $scope.jsonPositionsLog.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      $scope.$apply();
    }, 
    function(error)
    {
      console.log(error.message);
    }, 
    { 
      timeout: 3000 
    });
  }
});