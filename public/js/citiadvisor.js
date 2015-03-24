var angularApp = angular.module('chameleon', ['ui.bootstrap']);
    
/**==========================================
 *  Angular service
   ========================================== */
angularApp.factory("chameleonService", function(){
    
    return chameleon;

});



angularApp.controller('swissArmyKnifeController', ["$scope", "chameleonService", function($scope, chameleonService){
    
    console.log("DOM is Ready");
    
    $scope.configuration = configuration;
    $scope.chameleon = chameleonService;
    
    
    $scope.wscInit = function(){
        chameleonService.bootstrap($scope.configuration, $scope);
    };
    
    $scope.reset = function(){
        chameleonService.initialize();
    };
    
    $scope.wscStop = function(){
        chameleonService.closeSession();
    };
    
    $scope.answerIncomingCall = function(call){
        console.log("Accept call button is clicked!");
        chameleonService.acceptIncomingCall(call);
    };
    
    $scope.declineIncomingCall = function(call){
        console.log("Decline call button is clicked.");
        chameleonService.rejectIncomingCall(call);
    };
    
    $scope.cancelOutgoingCall = function(call){
        console.log("Cancel call button is clicked.");
        chameleonService.cancelOutgoingCall(call);
    };
    
    $scope.hangupCall = function(call){
        console.log("Hang up button clicked.");
        chameleonService.endActiveCall(call);
    };
    
    $scope.makeCall = function(){
        console.log("Make call button clicked");
        console.log("calling: " + $scope.outboundCallee);
        chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia);
    };
    
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;
    
    
}]);