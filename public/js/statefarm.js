var angularApp = angular.module('statefarm', []);

    
/**==========================================
 *  Angular service
   ========================================== */
angularApp.factory("chameleonService", function(){
    
    return chameleon;

});



angularApp.controller('statefarmController', ["$scope", "chameleonService", function($scope, chameleonService){
    
    $scope.pageIsLoaded = false;
    $scope.helpActive = false;
    $scope.testShow = false;
    $scope.madeHelpCall = false;
    
    console.log("Page is ready");
    setTimeout(function(){
        console.log("trigger removal of loader screen");
        $scope.pageIsLoaded = true;
        $scope.$apply();
    },1000);


    $scope.configuration = configuration;
    $scope.chameleon = chameleonService;
    
    $scope.requestForHelp = function(){
        console.log($scope.helpActive);
        $scope.helpActive = true;
        chameleonService.bootstrap($scope.configuration, $scope);
        recognition.start();
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
        chameleonService.makeCall($scope.outboundCallee, $scope.sessionMedia, endCallBack);
    };
    
    $scope.endHelp = function() {
        chameleonService.closeSession();
        $scope.helpActive = false;
        recognition.stop();
        $scope.madeHelpCall = false;
        speechMatched = false;
    };
    
    $scope.outboundCallee;
    $scope.sessionMedia = {};
    $scope.sessionMedia.audio = true;
    $scope.sessionMedia.video = false;
    $scope.sessionMedia.data = false;
    
    var finalTranscript;
    var recognizing = false;
    var recognition;
    var speechMatched = false;
    $scope.matchTryCount = 0;
    
    if (!('webkitSpeechRecognition' in window)) {
        alert("You need to use a newer browser for this demo. Please open page in Chrome 35 or later.");
    } else {
        
        recognition = new webkitSpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = ['English', ['en-US', 'United States']];
        
        recognition.onstart = function() { console.log("listening for speech...") };
        recognition.onresult = function(event) {
            var interimTranscript = '';
            
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }
            console.log(interimTranscript);
            
            if (interimTranscript == "like a good neighbor statefarm is there" && speechMatched === false) {
                console.log("matched!");
                recognition.stop();
                speechMatched = true;
                console.log("State Farm to the RESCUE!");
                chameleonService.makeCall("web2@example.com", {audio: "SENDRECV", video: "RECVONLY", data: false});
                $scope.madeHelpCall = true;
            }
        };
    }
    recognition.onerror = function(event) { console.log("an error listenign for speech occured: " + JSON.stringify(event)) };
    recognition.onend = function() {
        if (speechMatched === false && $scope.helpActive === true) {
            console.log("have not matched speech pattern yet....restarting listener.");
            recognition.start();
            $scope.matchTryCount++;
        } else if (speechMatched === true) {
            console.log("done listening for speech");
            $scope.matchTryCount = 0;
        }
    };

}]);