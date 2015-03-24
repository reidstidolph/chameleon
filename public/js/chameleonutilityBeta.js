var angularApp = angular.module('chameleon', ['ui.bootstrap', 'ngAnimate']);

var configuration = {
    sipUser : "",
    wscUri : "",
    sipUsername : "",
    sipPassword : "",
    localAudioId: "localAudio",
    remoteAudioId : "remoteAudio",
    ringtoneId : "ringtone",
    ringbackId: "ringback",
    localVideoId : "selfVideo",
    remoteVideoId : "remoteVideo",
    maxAttemptedCalls : 1,
    maxActiveCalls : 1,
    callbacks : {}
};

    
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
        $scope.remoteChat = event.data;
    };
    
    $scope.chameleon = chameleonService;
    $scope.pageIsLoaded = false;
    $scope.localChat;
    $scope.remoteChat;
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
    
    $scope.$watch('localChat', function() {
        
        if (chameleonService.calls.active[0] && chameleonService.calls.active[0].dataChannels[0].getState() == "open") {
            console.log("sending localChat update:  " + $scope.localChat);
            if ($scope.localChat === '') {
                chameleonService.calls.active[0].dataChannels[0].sendData(" ");
            } else chameleonService.calls.active[0].dataChannels[0].sendData($scope.localChat);
        }
    });

    
    $scope.goToFullScreen = function(id) {
        console.log("Going to fullscreen for id=" + id);
        goFullscreen(id);
    };
    
}]);

function goFullscreen(id) {
    // Get the element that we want to take into fullscreen mode
    var element = document.getElementById(id);
    
    // These function will not exist in the browsers that don't support fullscreen mode yet, 
    // so we'll have to check to see if they're available before calling them.
    
    if (element.mozRequestFullScreen) {
      // This is how to go into fullscren mode in Firefox
      // Note the "moz" prefix, which is short for Mozilla.
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      // This is how to go into fullscreen mode in Chrome and Safari
      // Both of those browsers are based on the Webkit project, hence the same prefix.
      element.webkitRequestFullScreen();
   }
   // Hooray, now we're in fullscreen mode!
  }