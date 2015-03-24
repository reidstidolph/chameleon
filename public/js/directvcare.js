var angularApp = angular.module('chameleon', ['ui.bootstrap', 'ngAnimate']);
    
/**==========================================
 *  Angular service
   ========================================== */
angularApp.factory("chameleonService", function(){
    
    return chameleon;

});



angularApp.controller('swissArmyKnifeController', ["$scope", "chameleonService", function($scope, chameleonService){
    
    console.log("DOM is Ready");
    
    $scope.configuration = configuration;
    
    
    
    $scope.configuration.callbacks.onIncomingData = function (event) {
        console.log("Got Data!!! " + event.data );
        var newData = JSON.parse(event.data);
        if (newData.customerVersion === $scope.syncData.customerVersion) {
            console.log("ignore.");
        } else if (newData.customerVersion !== $scope.syncData.customerVersion) $scope.syncData = newData;
    };
    
    $scope.chameleon = chameleonService;
    $scope.pageIsLoaded = false;
    $scope.syncData = {
        type : "syncData",
        customerVersion : 0,
        agentVersion : 0,
        form : {
            active : false,
            feild1 : "",
            feild2 : "",
            feild3 : "",
            feild4 : "",
            feild5 : "",
            feild6 : ""
        }
    };
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;
    
    setTimeout(function(){
        console.log("trigger removal of loader screen");
        $scope.pageIsLoaded = true;
        $scope.$apply();
    },1000);

    
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
        
        if ($scope.sessionMedia.data === true) {
            $scope.sessionMedia.dcConfig = [{"label":"chameleonDataChannel", "reliable" : true }];
        } else { $scope.sessionMedia.dcConfig = null }
        
        chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia);
    };
    
    $scope.$watch('syncData.form', function() {
        
        if (chameleonService.calls.active[0] && chameleonService.calls.active[0].dataChannels[0].getState() == "open") {
            console.log("sending form update");
            $scope.syncData.agentVersion++;
            chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
        }
    }, true);
    
    $scope.pushForm1 = function() {
        $scope.syncData.form.active = true;
        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
    };
    
    $scope.focus = function(element) {
        var dataToSend = {
            type : "command",
            action : "focus",
            element : element
        };
        
        chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify(dataToSend));
        
    };


    
}]);
