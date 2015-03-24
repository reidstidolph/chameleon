
//some glabal Vars
var animateRingsOn = false;
var globalDesktopNotification;

$(document).ready(function(){
   $("#titleBar").click(function(){
      console.log("Got Click!");
      animateRingsOn = true;
      animateRings();
//      $("#container").animate({padding: '10px'},800);
      $("#container").animate({boxShadow: '40px 40px 40px #888888', padding: '10px', borderRadius: '25px'},800)
      console.log("added shadow");
      $("#container").animate({'height':'600px','width':'370px'},600,function()
      {
         $('#phoneContainer').animate({'opacity':'1.0'},3000)
      })

   });

   $("#container").draggable({
      handle: 'titleBar',
      containment: 'parent'
   });
   
   $("div.button").mouseenter(function(){
     $(this).addClass('mouseOver');
     }).mouseleave(function(){
        $(this).removeClass('mouseOver');
        $(this).removeClass('mouseClick');
     });

$("div.button").mouseup(function(){
     $(this).removeClass('mouseClick');
     }).mousedown(function(){
        document.getElementById("click").volume=0.15;
        document.getElementById("click").play();
        $(this).addClass('mouseClick');
     });

$("div.dialerButton").mouseenter(function(){
     $(this).addClass('mouseOver');
     }).mouseleave(function(){
        $(this).removeClass('mouseOver');
        $(this).removeClass('mouseClick');
     });

$("div.dialerButton").mouseup(function(){
     $(this).removeClass('mouseClick');
     }).mousedown(function(){
        $(this).addClass('mouseClick');
     });

$("div.endCallButton").mouseenter(function(){
     $(this).addClass('mouseOver');
     }).mouseleave(function(){
        $(this).removeClass('mouseOver');
        $(this).removeClass('mouseClick');
     });

$("div.endCallButton").mouseup(function(){
     $(this).removeClass('mouseClick');
     }).mousedown(function(){
        $(this).addClass('mouseClick');
     });

});




function goToPhone()
{
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '1';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '-83'
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
};

function goToHome()
{
   document.getElementById('homescreen').style.zIndex = '1';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '-83'
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
};

function goToSms()
{
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '1';
   document.getElementById('camera').style.zIndex = '-83'
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
};

function goToCamera()
{
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '1'
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
};

function goToContacts()
{
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '-83';
   document.getElementById('contacts').style.zIndex = '1';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
}

function goToInCall()
{
   document.getElementById("txtSessionTime").innerHTML = "00:00";
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '-83';
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '1';
   document.getElementById('incomingCall').style.zIndex = '-86';
   document.getElementById('lockScreen').style.zIndex = '-87';
}

function goToIncomingCall()
{
  
   document.getElementById('homescreen').style.zIndex = '-80';
   document.getElementById('dialer').style.zIndex = '-81';
   document.getElementById('sms').style.zIndex = '-82';
   document.getElementById('camera').style.zIndex = '-83';
   document.getElementById('contacts').style.zIndex = '-84';
   document.getElementById('inCall').style.zIndex = '-85';
   document.getElementById('incomingCall').style.zIndex = '1';
   document.getElementById('lockScreen').style.zIndex = '-87';
   animateRingsOn = true;
   document.getElementById("ringtone").play();
}



function validateKey(evt)
{
   var theEvent = evt || window.event;
   var key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode( key );
   var regex = /[0-9]|\*|#/;
   if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
   }
   console.log("got input: " + key);
   switch (key)
   {
      case '0': document.getElementById("key0").play();
         break;
      case '1': document.getElementById("key1").play();
         break;
      case '2': document.getElementById("key2").play();
         break;
      case '3': document.getElementById("key3").play();
         break;
      case '4': document.getElementById("key4").play();
         break;
      case '5': document.getElementById("key5").play();
         break;
      case '6': document.getElementById("key6").play();
         break;
      case '7': document.getElementById("key7").play();
         break;
      case '8': document.getElementById("key8").play();
         break;
      case '9': document.getElementById("key9").play();
         break;
      case '*': document.getElementById("keyAsterisk").play();
         break;
      case '#': document.getElementById("keySharp").play();
         break;
      default: console.log("no sound here");
   }
}

function addDigit(text)
{
   var myString = document.getElementById("txtPhoneNumber").value;
   var length = myString.length;
   console.log("length is " + length);
   if (length <11) {
      document.getElementById("txtPhoneNumber").value += text;
   }
   switch (text)
   {
      case 0: document.getElementById("key0").play();
         break;
      case 1: document.getElementById("key1").play();
         break;
      case 2: document.getElementById("key2").play();
         break;
      case 3: document.getElementById("key3").play();
         break;
      case 4: document.getElementById("key4").play();
         break;
      case 5: document.getElementById("key5").play();
         break;
      case 6: document.getElementById("key6").play();
         break;
      case 7: document.getElementById("key7").play();
         break;
      case 8: document.getElementById("key8").play();
         break;
      case 9: document.getElementById("key9").play();
         break;
      case '*': document.getElementById("keyAsterisk").play();
         break;
      case '#': document.getElementById("keySharp").play();
         break;
      default: console.log("no sound here");
   }
}

function delDigit()
{
   var myString = document.getElementById("txtPhoneNumber").value;
   var newString = myString.substring(0, myString.length-1);
   document.getElementById("txtPhoneNumber").value = newString;
}

function makeCall()
{
   goToInCall();
   sipCall();
}

function terminateCall()
{
   sipHangUp();
   
   //goToPhone();
}

function answerCall()
{
   sipAnswerCall();
   animateRingsOn = false;
   document.getElementById("ringtone").pause();
   globalDesktopNotification.clear();
   goToInCall();
}

function unlockPhone()
{
   console.log("Phone has been Activated!!");

   //activate chameleon
    chameleon.bootstrap(configuration);

   //get a local video feed
   console.log("Requesting Camera Access");
   var cameraScreenVideo = document.getElementById("cameraScreenVideo"),
   incomingCallVideo = document.getElementById("incomingCallScreenVideo"),
   inCallVideo = document.getElementById("inCallScreenVideoLocal"), 
   videoObj = { "video": true },
   errBack = function(error) {
      console.log("Video capture error: ", error.code); 
   };

    navigator.getUserMedia = (navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia ||
         navigator.msGetUserMedia);
         
   // Put video listeners into place
   if (navigator.getUserMedia) {
      // Request access to video only
      navigator.getUserMedia(
         {
            video:true,
            audio:false
         },        
         function(stream) {
            var url = window.URL || window.webkitURL;
            cameraScreenVideo.src = url ? url.createObjectURL(stream) : stream;
            cameraScreenVideo.play();
            inCallVideo.src = url ? url.createObjectURL(stream) : stream;
            inCallVideo.play();
            incomingCallVideo.src = url ? url.createObjectURL(stream) : stream;
            incomingCallVideo.play();
         },
         function(error) {
            alert('Something went wrong. (error code ' + error.code + ')');
            return;
         }
      );
   }
   else {
      alert('Sorry, the browser you are using doesn\'t support getUserMedia');
      return;
   }

   // Request permission for desktop notifications
   setDesktopNotification();

   //transition to Home screen
   $('#lockScreenOverlay').animate({'opacity':'1.0'},500, function() {goToHome();}); 
   animateRingsOn = false;
}

function updateClock()
{
   var currentTime = new Date ( );

   var currentHours = currentTime.getHours ( );
   var currentMinutes = currentTime.getMinutes ( );
   var currentSeconds = currentTime.getSeconds ( );
   var currentDay = currentTime.getDay ( );
   var currentMonth = currentTime.getMonth ( );
   var currentDayOfMonth = currentTime.getDate ( );

   // Pad the minutes and seconds with leading zeros, if required
   currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
   currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

   // Choose either "AM" or "PM" as appropriate
   var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

   // Convert the hours component to 12-hour format if needed
   currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

   // Convert an hours component of "0" to "12"
   currentHours = ( currentHours == 0 ) ? 12 : currentHours;

   // Convert to Day of Week
   var weekday=new Array(7);
   weekday[0]="Sun";
   weekday[1]="Mon";
   weekday[2]="Tue";
   weekday[3]="Wed";
   weekday[4]="Thu";
   weekday[5]="Fri";
   weekday[6]="Sat";


   // Convert to Month
   var month=new Array(11);
   month[0]="January";
   month[1]="February";
   month[2]="March";
   month[3]="April";
   month[4]="May";
   month[5]="June";
   month[6]="July";
   month[7]="August";
   month[8]="September";
   month[9]="October";
   month[10]="November";
   month[11]="December";

   // Compose current date string
   var currentDate = weekday[currentDay] + ", " + month[currentMonth] + " " + currentDayOfMonth ;

   // Compose the string for display
   var currentTimeString = currentHours + ":" + currentMinutes;

   // Update the time display
   document.getElementById("timeDisplay").firstChild.nodeValue = currentTimeString;
   document.getElementById("lockScreenTime").firstChild.nodeValue = currentTimeString;
   document.getElementById("lockScreenDate").firstChild.nodeValue = currentDate;
}

function animateRings()
{
   setInterval(function ()
   {
      if (animateRingsOn == true)
      {
         $('.ring1').css({'opacity':'1.0'});
         $('.ring1').animate({'opacity':'0.0'},500, 'swing')
         setTimeout(function ()
         {
            $('.ring2').css({'opacity':'1.0'});
            $('.ring2').animate({'opacity':'0.0'},500,'swing')
            setTimeout(function ()
            {
               $('.ring3').css({'opacity':'1.0'});
               $('.ring3').animate({'opacity':'0.0'},500, 'swing')
               setTimeout(function ()
               {
                  $('.ring4').css({'opacity':'1.0'});
                  $('.ring4').animate({'opacity':'0.0'},500, 'swing')
                  setTimeout(function ()
                  {
                     $('.ring5').css({'opacity':'1.0'});
                     $('.ring5').animate({'opacity':'0.0'},500, 'swing')
                  }, 100);
               }, 100);
            }, 100);
         }, 100);
      }
   }, 2000)
}

function startSessionTimer()
{

   var timerDisplay = document.getElementById("txtSessionTime");
   var sessionStartTime = sipSession.start_time;
   console.log(sessionStartTime);
   var updatedSessionTime = setInterval(function(){getCallDuration()},1000);

   function getCallDuration(){
      if (sipSession.end_time == null){ 
         var currentTime = new Date ( );

         var sessionTime = Math.abs(currentTime - sessionStartTime);
         var sessionTimeInDateObject = new Date(sessionTime);
         var sessionTimeSeconds = sessionTimeInDateObject.getSeconds();
         if (sessionTimeSeconds < 10 ) {sessionTimeSeconds = "0" + sessionTimeInDateObject.getSeconds();}
         var sessionTimeMinutes = sessionTimeInDateObject.getMinutes();
         if (sessionTimeMinutes < 10 ) {sessionTimeMinutes = "0" + sessionTimeInDateObject.getMinutes();}
         timerDisplay.innerHTML = sessionTimeMinutes + ":" + sessionTimeSeconds;
         
      }

      else {
         clearInterval(updatedSessionTime);

         var sessionTime = Math.abs(sipSession.end_time - sessionStartTime);
         var sessionTimeInDateObject = new Date(sessionTime);
         var sessionTimeSeconds = sessionTimeInDateObject.getSeconds();
         if (sessionTimeSeconds < 10 ) {sessionTimeSeconds = "0" + sessionTimeInDateObject.getSeconds();}
         var sessionTimeMinutes = sessionTimeInDateObject.getMinutes();
         if (sessionTimeMinutes < 10 ) {sessionTimeMinutes = "0" + sessionTimeInDateObject.getMinutes();}
         timerDisplay.innerHTML = sessionTimeMinutes + ":" + sessionTimeSeconds;

      }
   };

}

function setDesktopNotification(){
   if (window.webkitNotifications) {
      console.log("Notifications are supported!");
   } else {
      console.log("Notifications are not supported for this Browser/OS version yet.");
      return;
   }
   window.webkitNotifications.requestPermission();
}

function incomingCallNotification(callerId){

   //check to make sure permissions for desktop notifications have been accepted
   if (window.webkitNotifications.checkPermission() == 0) {
      console.log("Notications are enabled.");
   } else {
      console.log("Notifications not enabled...skipping.");
      return;
   };

   //set notification text string from variable passed into function
   var notificationText = "Call from:  " + callerId;
   console.log("setting notifcation to:  " + notificationText);
  
   //set up notification parameters 
   incomingCallNotify = window.webkitNotifications.createNotification( '/favicon.ico', 'INCOMING CALL', notificationText );
   incomingCallNotify.onclose = function() { console.log("closing notification"); };
   incomingCallNotify.onclick = function() {
      window.focus();
      incomingCallNotify.cancel();
   }
 
   //show the notification
   incomingCallNotify.show();

   //method to clear the notification
   this.clear = function() {incomingCallNotify.cancel();};
}





var sipUa;
var sipSession;
var configuration = {
    sipUser : "web1@example.com",
    wscUri : "ws://155.212.214.157:7004/ws/webrtc/guest",
    sipUsername : "web1@example.com",
    sipPassword : "!Wsc!1234",
    localAudioId: "localAudio",
    remoteAudioId : "remoteAudio",
    ringtoneId : "ringtone",
    ringbackId: "ringback",
    localVideoId : "placeholder",
    remoteVideoId : "placeholder",
    maxAttemptedCalls : 1,
    maxActiveCalls : 1
};

console.log( configuration );

//initialize chameleon

function JsSIPinit()
{

   sipUa = new JsSIP.UA(configuration);

   sipUa.start();

   document.getElementById("txtRegStatus").innerHTML = 'Registering...';

   sipUa.on('registered', function(e){
      document.getElementById("txtRegStatus").innerHTML = 'Registered';
   });
   sipUa.on('unregistered', function(e){
      document.getElementById("txtRegStatus").innerHTML = 'Not Registered';
   });
   sipUa.on('registrationFailed', function(e){
      document.getElementById("txtRegStatus").innerHTML = 'Register Failed';
   });
   sipUa.on('newRTCSession', function(e){

//Test to see if the new session is an incoming or outgoing session

      if (e.data.originator == "remote" ){
         console.log( "it is an incoming call" );
         console.log( e.data.session );

//Set incoming caller ID in the GUI
         console.log( "Display Name is:  " + e.data.session.remote_identity.display_name );
         console.log( "URI User is:  " + e.data.session.remote_identity.uri.user );
         var incomingCallerUri = e.data.session.remote_identity.display_name;
	 var incomingCallerNumber = e.data.session.remote_identity.uri.user;
         console.log(incomingCallerUri);
         var incomingCallerId = incomingCallerUri;
         document.getElementById("txtCallerId").innerHTML = incomingCallerId;
         document.getElementById("txtPhoneNumber").value = incomingCallerNumber;
         document.getElementById("txtRemoteParty").innerHTML = incomingCallerId;
         globalDesktopNotification = new incomingCallNotification(incomingCallerId);

//set session options
         var selfView =   document.getElementById('inCallScreenVideoLocal');
         var remoteView =  document.getElementById('inCallScreenVideoRemote');

 
         var myEventHandlers = {
//         'connecting': function(e){ document.getElementById("txtCallStatus").innerHTML = 'Trying...'; },
            'progress':   function(e){ document.getElementById("txtCallStatus").innerHTML = 'Connecting...'; },
            'failed':     function(e){ 
               document.getElementById("txtCallStatus").innerHTML = 'Call Failed'; 
               document.getElementById("txtIncCallStatus").innerHTML = 'Call Canceled';
               animateRingsOn = false;
            },
            'started':    function(e){ 
               document.getElementById("txtCallStatus").innerHTML = 'Connected';
               startSessionTimer();


// Attach local stream to selfView
         if (sipSession.getLocalStreams().length > 0) {
            selfView.src = window.URL.createObjectURL(sipSession.getLocalStreams()[0]);
         }


// Attach remote stream to remoteView
         if (sipSession.getRemoteStreams().length > 0) {
            remoteView.src = window.URL.createObjectURL(sipSession.getRemoteStreams()[0]);
         }


/* Attach local stream to selfView
               if (e.data.session.getLocalStreams().length > 0) {
                  selfView.src = window.URL.createObjectURL(e.data.session.getLocalStreams()[0]);
               }


// Attach remote stream to remoteView
               if (e.data.session.getRemoteStreams().length > 0) {
                  remoteView.src = window.URL.createObjectURL(e.data.session.getRemoteStreams()[0]);
               }
*/
            },
            'ended':      function(e){ 
               document.getElementById("txtCallStatus").innerHTML = 'Call Ended'; 
               window.setTimeout(function() {goToPhone();},4000);
            }
         };

      for (event in myEventHandlers){
         e.data.session.on(event, myEventHandlers[event]);
      }
      console.log( e.data.session.events );

      var options = {
         'eventHandlers': myEventHandlers,
         'mediaConstraints': {'audio': true, 'video': true}
      };

      sipSession = e.data.session ;

      
//Call function to active incoming call screen
         goToIncomingCall();

      }

      else{
         console.log( "it is an outgoing call" );
         console.log( e.data.session );
         sipSession = e.data.session ;
      }
   });
}

//send an outbound call
function sipCall()
{
   var selfView =   document.getElementById('inCallScreenVideoLocal');
   var remoteView =  document.getElementById('inCallScreenVideoRemote');

// Register callbacks to desired call events
   var myEventHandlers = {
      'progress':   function(e){
         document.getElementById("txtCallStatus").innerHTML = 'Ringing...';
         document.getElementById("ringbackTone").play();
      },
      'failed':     function(e){
         document.getElementById("txtCallStatus").innerHTML = 'Call Failed';
         document.getElementById("ringbackTone").pause();
      },
      'started':    function(e){
         sipSession = e.sender;
         console.log('sipSession data:  ' + sipSession);
         document.getElementById("txtCallStatus").innerHTML = 'Connected';
         document.getElementById("ringbackTone").pause();
         startSessionTimer();

// Attach local stream to selfView
         if (sipSession.getLocalStreams().length > 0) {
            selfView.src = window.URL.createObjectURL(sipSession.getLocalStreams()[0]);
         }


// Attach remote stream to remoteView
         if (sipSession.getRemoteStreams().length > 0) {
            remoteView.src = window.URL.createObjectURL(sipSession.getRemoteStreams()[0]);
         }

      },
      'ended':      function(e){
         document.getElementById("txtCallStatus").innerHTML = 'Call Ended';
         window.setTimeout(function() {goToPhone();},4000);
         document.getElementById("ringbackTone").pause();
      }
   };

   var calledNumber = document.getElementById("txtPhoneNumber");
   document.getElementById("txtRemoteParty").innerHTML = calledNumber.value;
   console.log("calledNumber is " + calledNumber.value);
   var calledUri = 'sip:' + calledNumber.value + "@" + out_ruri_host;
   console.log( 'Called Uri = ' + calledUri );

   var options = {
      'eventHandlers': myEventHandlers,
      'mediaConstraints': {'audio': true, 'video': true}
   };

   console.log(options);

   sipUa.call(calledUri, options);

}

function sipInboundCall()
{
  console.log('Welcome to the sipInboundCall function!');
}

function sipHangUp()
{
   sipSession.terminate();
}

function sipAnswerCall()
{
   sipSession.answer();
}




