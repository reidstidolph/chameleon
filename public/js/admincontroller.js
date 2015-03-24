

angularApp.factory('chameleonUsers', function($resource){
    return $resource('/api/users', {});
});



angularApp.controller('adminController', ['$scope', 'chameleonUsers', function($scope, chameleonUsers) {
    $scope.chameleonAdminData = {};
    
    chameleonUsers.query(function(response) {
        console.log(response);
        $scope.chameleonAdminData.users = response;
    });
    
    
}]);