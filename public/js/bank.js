var angularApp = angular.module('bank', []);

    
/**==========================================
 *  Angular service
   ========================================== */
angularApp.factory("chameleonService", function(){
    
    return chameleon;

});



angularApp.controller('bankController', ["$scope", "chameleonService", function($scope, chameleonService){
    
    $scope.pageIsLoaded = false;
    $scope.helpActive = false;
    $scope.madeHelpCall = false;
    $scope.widgetDocked = null;
    
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
    
    
    console.log("Page is ready");
    setTimeout(function(){
        console.log("trigger removal of loader screen");
        $scope.pageIsLoaded = true;
        $scope.$apply();
    },1000);


    $scope.configuration = configuration;
    
    $scope.configuration.callbacks.onIncomingData = function (event) {
        console.log("Got Data!!! " + event.data );
        var newData = JSON.parse(event.data);
        
        if (newData.type == "syncData") {
            if (newData.agentVersion === $scope.syncData.agentVersion) {
                console.log("ignore.");
            } else if (newData.agentVersion !== $scope.syncData.agentVersion) $scope.syncData = newData;
            
            if($scope.syncData.form.active === true) {
                $scope.widgetDocked = true;
            }
        }
        
        if (newData.type == "command") {
            console.log ("Got a command: " + newData.action );
            var element = document.getElementById(newData.element);
            element.classList.add('focusElement');
            
            setTimeout(function(){
                element.classList.remove('focusElement');
            },1000);
        }
    };
    
    $scope.chameleon = chameleonService;
    
    $scope.talkToAdvisor = function(){
        console.log($scope.helpActive);
        document.getElementById("activate").play();
        $scope.helpActive = true;
        $scope.widgetDocked = null;
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
        $scope.syncData.form.active = false;
        
        chameleonService.makeCall(configuration.callee, audioCall);
    };
    
    $scope.doVideoCall = function(){
        console.log("Make video call button clicked");
        $scope.syncData.form.active = false;
        chameleonService.makeCall(configuration.callee, videoCall);
    };
    
    
    $scope.endHelp = function() {
        chameleonService.closeSession();
        $scope.helpActive = false;
        $scope.syncData.form.active = false;
        $scope.madeHelpCall = false;
        document.getElementById("deactivate").play();
    };
    
    $scope.toggleWidgetDock = function() {
        
        if($scope.syncData.form.active === true) {
            
            $scope.widgetDocked = true;
            return;
        }
        
        if ($scope.widgetDocked === null) $scope.widgetDocked = true;
        else $scope.widgetDocked = !$scope.widgetDocked;
    };
    
    $scope.submitForm = function() {
        $scope.syncData.form.active = false;
        $scope.widgetDocked = false;
    };
    
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;



    var audioCall = {
        audio : true,
        video : false,
        data    : true,
        dcConfig : [{"label":"chameleonDataChannel", "reliable" : true }]
    };
  
    var videoCall = {
        audio : true,
        video : true,
        data    : false,
        dcConfig : [{"label":"chameleonDataChannel", "reliable" : true }]
    };

/*
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
*/
    
    $scope.$watch('syncData.form', function() {
        
        if (chameleonService.calls.active[0] && chameleonService.calls.active[0].dataChannels[0].getState() == "open") {
            console.log("sending form update.");
            $scope.syncData.customerVersion++;
            chameleonService.calls.active[0].dataChannels[0].sendData(JSON.stringify($scope.syncData));
        }
    }, true);

}]);