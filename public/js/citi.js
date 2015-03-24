var angularApp = angular.module('citi', []);

    
/**==========================================
 *  Angular service
   ========================================== */
angularApp.factory("chameleonService", function(){
    
    return chameleon;

});



angularApp.controller('citiController', ["$scope", "chameleonService", function($scope, chameleonService){
    
    $scope.pageIsLoaded = false;
    $scope.helpActive = false;
    $scope.madeHelpCall = false;
    
    console.log("Page is ready");
    setTimeout(function(){
        console.log("trigger removal of loader screen");
        $scope.pageIsLoaded = true;
        $scope.$apply();
    },1000);


    $scope.configuration = configuration;
    $scope.chameleon = chameleonService;
    
    $scope.talkToAdvisor = function(){
        console.log($scope.helpActive);
        document.getElementById("activate").play();
        $scope.helpActive = true;
        chameleonService.bootstrap($scope.configuration, $scope);
        console.log("Request for Help");
        console.log($scope.helpActive);
    };
    
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
        
        var errorCallback = function(e) {
            console.log('gUM Reeeejected!', e);
        };
        
        navigator.getUserMedia = navigator.getUserMedia ||
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.msGetUserMedia;
    
        navigator.getUserMedia({video: {
            mandatory: {
                chromeMediaSource: 'screen',
                maxWidth: 1280,
                maxHeight: 720
            },
            optional: []
        }, audio: false}, function(localMediaStream) {

            console.log("Making call with localMediaStream");
            chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia, localMediaStream);

        }, errorCallback);
        
        // chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia);
        
        
    };
    
    $scope.doVoiceCall = function(){
        console.log("Make voice call button clicked");
        chameleonService.makeCall("web4@example.com", audioCall);
    };
    
    $scope.doVideoCall = function(){
        console.log("Make video call button clicked");
/*
        var errorCallback = function(e) {
            console.log('gUM Reeeejected!', e);
        };
        
        navigator.getUserMedia = navigator.getUserMedia ||
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.msGetUserMedia;
    
        navigator.getUserMedia({
            audio: false,
            video: {
               mandatory: {
                   chromeMediaSource: 'screen',
                   maxWidth: 1280,
                   maxHeight: 720
               }
            }
        }, function(localMediaStream) {

            console.log("Making call with localMediaStream");
            chameleonService.makeCall("web4@example.com", videoCall, localMediaStream);

        }, errorCallback);
*/
        chameleonService.makeCall("web4@example.com", videoCall);
    };
    
    $scope.endHelp = function() {
        chameleonService.closeSession();
        $scope.helpActive = false;
        $scope.madeHelpCall = false;
    };
    
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;
    
    var audioCall = {
        audio : true,
        video : false,
        data  : false
    };
    
    var videoCall = {
        audio : true,
        video : true,
        data  : false
    };
    

}]);