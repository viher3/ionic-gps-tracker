angular.module($appModule).controller('GpsController', function($scope, $ionicLoading) 
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