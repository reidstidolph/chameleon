

var angularApp = angular.module('landingApp', ['ui.bootstrap', 'ngResource']);

angularApp.factory('chameleonResource', function($resource){
    return $resource('/api/globaldemos', {});
});

angularApp.controller('landingController', ['$scope', 'chameleonResource', function($scope, chameleonResource) {
    $scope.myUser = {};
    
    chameleonResource.query(function(response) {
        console.log(response);
        $scope.myUser.globalDemos = response;
    });
    
    $scope.launchDemo = function(link){
        window.open(link, '_blank');
    };
    
    
}]);