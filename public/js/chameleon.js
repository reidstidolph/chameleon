/**
 * 
 * v0.1
 * 
 * /



/**==========================================
 *  Vars
   ========================================== */

var wsc=(function(){REVISION:"1.0";var z=null;var m=null;var C=null;var x=null;var y={};y.isFirefox=false;y.isChrome=false;y.supportSessionStorage=false;if(navigator.mozGetUserMedia){y.isFirefox=true;z=mozRTCPeerConnection;RTCSessionDescription=mozRTCSessionDescription;RTCIceCandidate=mozRTCIceCandidate;m=navigator.mozGetUserMedia.bind(navigator);C=function(e,D){e.mozSrcObject=D;e.play()};x=function(D,e){D.mozSrcObject=e.mozSrcObject;D.play()}}else{if(navigator.webkitGetUserMedia){y.isChrome=true;z=webkitRTCPeerConnection;m=navigator.webkitGetUserMedia.bind(navigator);C=function(e,D){e.src=webkitURL.createObjectURL(D)};x=function(D,e){D.src=e.src};if(!webkitMediaStream.prototype.getVideoTracks){webkitMediaStream.prototype.getVideoTracks=function(){return this.videoTracks};webkitMediaStream.prototype.getAudioTracks=function(){return this.audioTracks}}if(!webkitRTCPeerConnection.prototype.getLocalStreams){webkitRTCPeerConnection.prototype.getLocalStreams=function(){return this.localStreams};webkitRTCPeerConnection.prototype.getRemoteStreams=function(){return this.remoteStreams}}}else{}}try{y.supportSessionStorage=("sessionStorage" in window&&window.sessionStorage!==null)}catch(v){}var B={};B.LOGLEVEL={DEBUG:2,INFO:4,WARN:6,ERROR:8,OFF:10};var t=console;var g=null;var c=B.LOGLEVEL.WARN;var s={};var u={};var r={};var j={};var d={};var p=function(Z){var K=B.OFFER_ANSWER_STATE.INITIAL;var F=B.OFFER_ANSWER_STATE.INITIAL;var I=[],M=Z,G="",J="",T="",W="",P="";needSendUpdate=false,offerArgument=null;var X=false;var Y=false;var O=function(){return K};var N=function(){return F};var aa=function(ad){if(!X){if(ad&&ad.indexOf("\r\na=group:BUNDLE ")>0){X=true}}};var e=function(){return X};var U=function(ad){M.remoteMedias=u.getMediaFromSDP(ad)};var E=function(ai,ad){g.debug("Trying to update offer-answer state to : "+ai);var ag="",ah=false,ae=0;for(ag in B.OFFER_ANSWER_STATE){if(B.OFFER_ANSWER_STATE[ag]===ai){ah=true;break}}switch(ai){case B.OFFER_ANSWER_STATE.OFFER_SENT:G=ad;needSendUpdate=false;if(M.iceHandler){M.iceHandler.clearGotNewCandidateFlag()}K=ai;break;case B.OFFER_ANSWER_STATE.OFFER_GOT:J=ad;F=ai;aa(ad);break;case B.OFFER_ANSWER_STATE.ANSWER_SENT:T=ad;needSendUpdate=false;if(M.iceHandler){M.iceHandler.clearGotNewCandidateFlag()}F=ai;P=J;U(P);break;case B.OFFER_ANSWER_STATE.ANSWER_GOT:W=ad;K=ai;aa(ad);P=ad;U(P);break;case B.OFFER_ANSWER_STATE.ACK_SENT:K=ai;break;case B.OFFER_ANSWER_STATE.ACK_GOT:F=ai;break;case B.OFFER_ANSWER_STATE.OFFER_REJECTED:needSendUpdate=false;K=ai;if(M.peerConnection){var af=null;M.peerConnection.__wscLastLocalSdp;u.setLocalDescription(M.peerConnection,af)}break;case B.OFFER_ANSWER_STATE.OFFER_REJECT:F=ai;break}if((offerArgument!=null||needSendUpdate)&&S()){ac()}M.offerAnswerManager.masterState=K;M.offerAnswerManager.slaveState=F;if(M.earlyMediaState){M.earlyMediaState=ai}return 0};var Q=function(af,ad){var ae=H(af),ag=H(ad);if(ae.sessionId>ag.sessionId){return 1}else{if(ae.sessionId<ag.sessionId){return -1}else{if(ae.port>ag.port){return 1}else{if(ae.port<ag.port){return -1}else{return 0}}}}};var H=function(ag){var am=ag.split("\r\n"),ak=am.length,ai,aj,al,ad,af,ae,ah;for(ai=0;ai<ak;ai++){aj=am[ai].split("=");switch(aj[0]){case"o":al=aj[1];ah=al.split(" ")[0];break;case"m":ad=aj[1];af=ad.split(" ");ae=af[1];break}if(ae&&ah){break}}return{sessionId:ah,port:ae}};var L=function(af){var ae,ad=I.length;for(ae=0;ae<ad;ae++){if(V(I[ae],af)){return false}}I.push(af);return true};var R=function(ad){if(M.session.sessionState==B.SESSIONSTATE.CONNECTED){if(ad){offerArgument=ad}else{needSendUpdate=true}}else{g.debug("Session is not connected, ignore peerConnection candidates update request.")}if(S()){ac()}};var ac=function(){if((offerArgument!=null||needSendUpdate)&&M.peerConnection&&M.peerConnection.localDescription&&M.peerConnection.localDescription.sdp){Y=true;var ah=(Z.checkSdpInterval)?(Z.checkSdpInterval):200;var ae=(Z.checkSdpTimeout)?(Z.checkSdpTimeout):3000;var ag=new Date().getTime();var ad=function(ap){if(!M||!M.peerConnection||!M.peerConnection.localDescription||!M.peerConnection.localDescription.sdp){return}var al=((new Date().getTime()-ag)>ae);var ao=M.peerConnection.localDescription.sdp;var an=(ao.indexOf("m=video ")>0);var au=(ao.indexOf("m=video 1 ")>0);var aq=(ao.indexOf("m=audio ")>0);var aj=(ao.indexOf("m=audio 1 ")>0);var ar=(ao.indexOf("m=application ")>0);var am=(ao.indexOf("m=application 1 ")>0);var ai=(!aj&&!au&&!am);if(!al&&ap&&!ai){g.debug("Send offer: the sdp does not match condition. "+(aq?(aj?"has 'm=audio 1 '":"no 'm=audio 1 '"):"no audio")+"; "+(an?(au?"has 'm=video 1 '":"no 'm=video 1 '"):"no video")+"; "+(ar?(am?"has 'm=application 1 '":"no 'm=application 1 '"):"no application")+", waiting "+ah+"ms...");setTimeout(function(){ad(true)},ah)}else{if(ap){g.debug("Send offer: "+(al?ae+" ms past. ":"the sdp does match condition. ")+(aq?(aj?"has 'm=audio 1 '":"no 'm=audio 1 '"):"no audio")+"; "+(an?(au?"has 'm=video 1 '":"no 'm=video 1 '"):"no video")+"; "+(ar?(am?"has 'm=application 1 '":"no 'm=application 1 '"):"no application")+", going to send offer...")}if(offerArgument!=null){j.sendOfferImpl(M,offerArgument.extHeaders);Y=false;offerArgument=null}else{if(needSendUpdate){g.info("Send offer update for candidates change.");var at=function(){if(M&&M.peerConnection&&S(true)){j.sendOfferImpl(M);needSendUpdate=false}Y=false};var av=function(aw){Y=false;g.warn("Set local description failed: ",aw)};var ak=new RTCSessionDescription({type:"offer",sdp:M.peerConnection.localDescription.sdp});u.setLocalDescription(M,ak,at,av)}else{}}}};var af=(Z.sdpFilter=="none")?false:true;ad(af)}};var S=function(ad){var ae=false;if(M.callState){var ag=M.callState.state;if(ag===B.CALLSTATE.END||ag===B.CALLSTATE.ERROR||ag===B.CALLSTATE.FAILED){ae=true}}var af=(K===B.OFFER_ANSWER_STATE.ACK_SENT||K===B.OFFER_ANSWER_STATE.INITIAL||K===B.OFFER_ANSWER_STATE.OFFER_REJECTED)&&(F===B.OFFER_ANSWER_STATE.ACK_GOT||F===B.OFFER_ANSWER_STATE.OFFER_REJECT||F===B.OFFER_ANSWER_STATE.INITIAL)&&!ae&&(ad||!Y);g.debug((af?"Can":"Cannot")+" send offer now. The offer-answer master/slave state is: "+M.offerAnswerManager.getMasterState()+" / "+M.offerAnswerManager.getSlaveState()+", call State: "+M.callState.state+", session State: "+M.session.sessionState+", isSendingOffer: "+Y+", Ignore isSendingOffer: "+(ad?"true":"false"));return af};var V=function(ae,ad){if(ae.candidate===ad.candidate&&ae.sdpMLineIndex===ad.sdpMLineIndex&&ae.sdpMid===ad.sdpMid){return true}else{return false}};var ab=function(){K=B.OFFER_ANSWER_STATE.INITIAL;F=B.OFFER_ANSWER_STATE.INITIAL;G="",J="",T="",W=""};var D=function(){return P};return{masterState:K,slaveState:F,getMasterState:O,getSlaveState:N,updateState:E,addCandidate:L,reset:ab,trySendOffer:R,canSendOffer:S,isRemoteBundle:e,getLatestActiveRemoteSdp:D}};var l=function(e){this.session=e;this.packageType=B.PACKAGE.REGISTER;e.packagesMap.put(this.packageType,this)};l.prototype={toJSON:function(){var e={};var E={session:""};for(var D in this){if(D in E){continue}else{e[D]=this[D]}}return e},onMessage:function(I){var F=I.control.type;if(F===B.TYPE.RESPONSE){var V=this.session.sessionState;if(this.session.sessionId&&(this.session.sessionId!=I.control.session_id)){r.clearSession(this.session);this.session.lastOutboundSeq=1;this.session.lastInboundRequest=null;this.session.userName=I.header.initiator;this.session.sessionId=I.control.session_id;this.session.setSessionState(B.SESSIONSTATE.CONNECTED);if(this.session.successCallback){try{this.session.successCallback()}catch(T){g.warn("The callback function 'session.successCallback()' exception: "+T)}}}else{this.session.setSessionState(B.SESSIONSTATE.CONNECTED);switch(V){case B.SESSIONSTATE.NONE:this.session.userName=I.header.initiator;this.session.sessionId=I.control.session_id;if(this.session.successCallback){try{this.session.successCallback()}catch(T){g.warn("The callback function 'session.successCallback()' exception:"+T)}}break;case B.SESSIONSTATE.RECONNECTING:g.info("Session re-connected.");if(this.session.sessionTimeOut){window.clearTimeout(this.session.sessionTimeOut)}if(this.session.reConnectTimeOut){window.clearTimeout(this.session.reConnectTimeOut)}var E=I.header.sslr;this.session.unACKedMsgQueue.reSendMessage(this.session,E);var R=this.session.packagesMap.entry;var P=this.session.subSessionsMap.entry;for(var Q in R){var G=this.session.getPackage(Q);var D=P[Q];if(G&&G.onResurrect){for(var X in D.entry){G.onResurrect(D.get(X))}}}break;case B.SESSIONSTATE.RELOADING:g.info("Session re-loaded.");var E=I.header.sslr;var N=this.session.rehydrationData;if(N){var R=N.packagesMap.entry;var P=N.subSessionsMap.entry;for(var Q in R){var G=this.session.getPackage(Q);var D=P[Q];if(G&&G.onRehydration){G.onRehydration(D)}}}if(this.session.successCallback){try{this.session.successCallback()}catch(T){g.warn("The callback function 'session.successCallback()' exception:"+T)}}if(this.session.lastInboundRequest){r.handleWsData(this.session.lastInboundRequest,this.session)}break}}r.updateActivityMarker(this.session);r.schedulePing(this.session,false)}else{if(F===B.TYPE.ERROR){var K=I.header.error_code,S=I.header.reason,L=new s.ErrorInfo(K,S),H=true,W=null,U=0;if(K==B.ERRORCODE.UNAUTHORIZED||K==B.ERRORCODE.PROXYAUTH_REQUIRED){g.debug("Authentication failed: "+L.code);var O=this.session.authHandler;if(O&&O.refresh){while(H&&U<3){U++;try{var J=I.header.authenticate,M=O.refresh(s.AUTHTYPE.SERVICE,J);if(s.checkAuthInfo(s.AUTHTYPE.SERVICE,M)){r.sendRegister(this.session,M);H=false}else{if(M==false||M==null){W="No correct information was returned from the callback function 'AuthHandler.refresh()', or the user canceled the operation.";break}else{W="No correct information was returned from the callback function 'AuthHandler.refresh()'. Please try again.";g.warn(W)}}}catch(T){W="Handle unauthenticated message error:"+T;g.error(W);H=true}}}else{W="No AuthHandler object was created for this Session, or this AuthHandler lacks the callback function, 'AuthHandler.refresh()'."}}if(H==true){if(W){S=S+"("+W+")"}g.warn("Session connect failed:"+S);r.invokeSessionError(this.session,K,S);this.session.close()}}}}};var a=function(D){if(!D){var e="The parameter 'session' cannot be null!";g.error(e);throw e}this.packageType=B.PACKAGE.CALL;D.registerPackage(this);this.session=D;this.onIncomingCall=null;this.onResurrect=null};a.prototype={getCalls:function(){var E=new Array();var F=this.session.getSubSessionsByPackageType(B.PACKAGE.CALL);var e=null;if(F){e=F.values();for(var D=0;D<e.length;D++){E[D]=e[D]}}return E},createCall:function(F,D,J){var K,E,e,I,G=this.session,H=this.session.userName;if(F==null||F==""){E="The callee cannot be empty!";g.warn(E);throw"CallPackage.createCall(): Empty callee exception."}e=B.CONSTCS.CLIENT+(G.lastOutboundSeq+1);K=this.prepareCall(G,D,H,F);K.subSessionId=e;K.onCallError=J;this.putCall(e,K);return K},close:function(){var D=this.getCalls();for(var e=0;e<D.length;e++){var E=D[e];E.end();E=null}},clear:function(){var D=this.getCalls();for(var e=0;e<D.length;e++){var E=D[e];j.clearCall(E);E=null}},onMessage:function(G){var F=this.session,D=G.control.subsession_id,e=this.session.getSubSession(D),E=G.getExtHeaders();if(e===null){e=this.prepareCall(F)}if(E){e.lastServerExtHeader=E}e.onMessage(G)},onRehydration:function(G){for(var K in G.entry){var F=G.entry[K];var D=F.caller;var I=F.callee;var e=F.callConfig;var E=new h(e.audioConfig,e.videoConfig,e.dataChannelConfig);var M=this.prepareCall(this.session,E,D,I);M.callState=new w(F.callState.state,F.callState.status.code,F.callState.status.reason);M.earlyMediaState=F.earlyMediaState;M.subSessionId=F.subSessionId;var N;if(F.remoteMedias&&F.remoteMedias.length){N=new Array();for(var H=0;H<F.remoteMedias.length;H++){var J=F.remoteMedias[H];var L=new Media(J.mode,J.port,J.type);N[H]=L}}M.remoteMedias=N;M.offerAnswerManager.updateState(F.offerAnswerManager.masterState);M.offerAnswerManager.updateState(F.offerAnswerManager.slaveState);M.iceTimeout=F.iceTimeout;this.putCall(K,M);this.onResurrect(M)}},prepareCall:function(F,E,e,D){return new b(F,E,e,D)},putCall:function(D,e){this.session.putSubSession(B.PACKAGE.CALL,D,e)},toJSON:function(){var e={};var E={session:""};for(var D in this){if(D in E){continue}else{e[D]=this[D]}}return e}};j.REINVITE_CANCEL_BY_SERVER="##re-invite_cancel@server##";j.createRequest=function(D){var H=new s.Message(),e=D.session.lastInboundSeq,F=j.getInitiator(D),G=j.getTarget(D),E=null;if(D.subSessionId){E=D.subSessionId}else{E=B.CONSTCS.CLIENT+(D.session.lastOutboundSeq+1)}H.control.type=B.TYPE.REQUEST;H.control.subsession_id=E;H.control.package_type=B.PACKAGE.CALL;H.control.ack_sequence=e;H.header.initiator=F;H.header.target=G;return H};j.createResponse=function(D){var I=new s.Message(),H=D.lastServerCorrelationId,e=D.session.lastInboundSeq,F=D.caller,G=D.callee,E=D.subSessionId;I.control.type=B.TYPE.RESPONSE;I.control.subsession_id=E;I.control.package_type=B.PACKAGE.CALL;I.control.correlation_id=H;I.control.ack_sequence=e;I.header.initiator=F;I.header.target=G;return I};j.createError=function(D){var I=new s.Message(),H=D.lastServerCorrelationId,e=D.session.lastInboundSeq,F=D.caller,G=D.callee,E=D.subSessionId;I.control.type=B.TYPE.ERROR;I.control.subsession_id=E;I.control.package_type=B.PACKAGE.CALL;I.control.correlation_id=H;I.control.ack_sequence=e;I.header.initiator=F;I.header.target=G;return I};j.createMessage=function(D){var H=new s.Message(),e=D.session.lastInboundSeq,F=j.getInitiator(D),G=j.getTarget(D),E=D.subSessionId;H.control.type=B.TYPE.MESSAGE;H.control.subsession_id=E;H.control.package_type=B.PACKAGE.CALL;H.control.ack_sequence=e;H.header.initiator=F;H.header.target=G;return H};j.sendOffer=function(e,D){e.offerAnswerManager.trySendOffer({extHeaders:D})};j.sendOfferImpl=function(F,I){if(F.callState.state==B.CALLSTATE.ENDED||F.callState.state==B.CALLSTATE.FAILED){g.warn("Call has ended while sending offer, clear the call.");j.clearCall(F)}else{var J=j.createRequest(F),H=F.session.genNewCorrelationId(),E;if(F.peerConnection){E=F.peerConnection.localDescription.sdp}else{g.warn("The peerConnection of the call is null");return}J.header.action=B.ACTION.START;J.control.correlation_id=H;J.payload={sdp:E};if(I){J.addExtHeaders(I)}else{if(F.extHeaders){J.addExtHeaders(F.extHeaders);F.extHeaders=null}}var D=false;if(F.authInfo){J.header.authorization=F.authInfo;D=true;F.authInfo=null}try{F.session.sendMessage(J);F.startReqCorrId=J.control.correlation_id;F.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_SENT,E);if(F.callState.state==B.CALLSTATE.NONE){F.setCallState(B.CALLSTATE.STARTED,null,"start call")}}catch(G){}}};j.sendPrack=function(e){var E=j.createRequest(e),D=e.lastServerCorrelationId;E.control.correlation_id=D;E.header.action="prack";e.session.sendMessage(E)};j.send180Ringing=function(e){var D=j.createResponse(e);D.control.message_state=B.MESSAGESTATE.SUBSEQUENT;D.header.action=B.ACTION.START;e.session.sendMessage(D);e.setCallState(B.CALLSTATE.RESPONDED,180,"Ringing")};j.sendRejectForNullSDP=function(D,E,G,e){var H=j.createError(D),F=E;H.header.action=B.ACTION.START;H.header.error_code=F;if(G){H.header.reason=G}if(e){H.addExtHeaders(e)}D.session.sendMessage(H)};j.sendReject=function(D,F,e){var G=j.createError(D),E=B.ERRORCODE.DECLINED;if(F){E=F}G.header.action=B.ACTION.START;G.header.error_code=E;if(e){G.addExtHeaders(e)}D.session.sendMessage(G);D.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECT)};j.sendAnswer=function(G,H){if(G.callState.state==B.CALLSTATE.ENDED||G.callState.state==B.CALLSTATE.FAILED){g.warn("Call has ended while sending answer, clear the call.");j.clearCall(G)}else{if(G&&G.peerConnection&&G.peerConnection.localDescription&&G.peerConnection.localDescription.sdp){var I=(G.checkSdpInterval)?(G.checkSdpInterval):200;var e=(G.checkSdpTimeout)?(G.checkSdpTimeout):3000;var F=new Date().getTime();var E=function(Q){if(!G||!G.peerConnection||!G.peerConnection.localDescription||!G.peerConnection.localDescription.sdp){return}var M=((new Date().getTime()-F)>e);var P=G.peerConnection.localDescription.sdp;var O=(P.indexOf("m=video ")>0);var U=(P.indexOf("m=video 1 ")>0);var R=(P.indexOf("m=audio ")>0);var K=(P.indexOf("m=audio 1 ")>0);var T=(P.indexOf("m=application ")>0);var N=(P.indexOf("m=application 1 ")>0);var J=(!K&&!U&&!N);if(!M&&Q&&!J){g.debug("Send answer: the sdp does not match condition. "+(R?(K?"has 'm=audio 1 '":"no 'm=audio 1 '"):"no audio")+"; "+(O?(U?"has 'm=video 1 '":"no 'm=video 1 '"):"no video")+"; "+(T?(N?"has 'm=application 1 '":"no 'm=application 1 '"):"no application")+", waiting "+I+"ms...");setTimeout(function(){E(true)},I)}else{if(Q){g.debug("Send answer: "+(M?e+" ms past. ":"the sdp does match condition. ")+(R?(K?"has 'm=audio 1 '":"no 'm=audio 1 '"):"no audio")+"; "+(O?(U?"has 'm=video 1 '":"no 'm=video 1 '"):"no video")+"; "+(T?(N?"has 'm=application 1 '":"no 'm=application 1 '"):"no application")+", going to send answer...")}var L=j.createResponse(G),S=G.lastServerCorrelationId;L.control.message_state=B.MESSAGESTATE.FINAL;L.header.action=B.ACTION.START;L.control.correlation_id=S;if(H){L.addExtHeaders(H)}L.payload={sdp:P};G.session.sendMessage(L);g.debug("Answer is sent...\r\n"+P);G.setCallState(B.CALLSTATE.RESPONDED,200,"sent success response");G.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ANSWER_SENT,P)}};var D=(G.sdpFilter=="none")?false:true;E(D)}}};j.sendAnswerInComplete=function(e,E){var D=e.peerConnection.localDescription.sdp,F=j.createMessage(e);F.header.action=B.ACTION.COMPLETE;F.control.correlation_id=e.startReqCorrId;F.payload={sdp:D};if(E){F.addExtHeaders(E)}e.session.sendMessage(F);e.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT);if(e.iceHandler){e.iceHandler.clearGotNewCandidateFlag()}e.setCallState(B.CALLSTATE.ESTABLISHED,null,"sent complete");j.updateCall(e,e.callConfig)};j.initOfferCtx=function(J,I,H){var E=J.peerConnection,e=function(){j.sendOffer(J,H)};if(J.peerConnection==null){u.createPeerConnection(J,I);E=J.peerConnection}var K=function(){var N=J.callConfig.dataChannelConfig;var L;if(N.length!=0){for(L in N){var O=N[L];var M=E.createDataChannel(O.label,{reliable:O.reliable});var P=J.dataTransfers.get(O.label);P.initDataChannel(M)}}g.debug("DataChannel is initiated")};if(J.callConfig.dataChannelConfig){K()}var D=function(L){g.error("Offer error:"+L);j.invokeCallError(J,wsc.ERRORCODE.PEERCONNECTION_ERROR,L)};var F=function(M){var N=u.changeSdpByCallConfig(M.sdp,J.callConfig);var L=function(){j.bindIceHandler(J,e)};u.setLocalDescription(J,new RTCSessionDescription({type:"offer",sdp:N}),L)};var G={mandatory:{OfferToReceiveAudio:J.callConfig.shouldReceiveAudio(),OfferToReceiveVideo:J.callConfig.shouldReceiveVideo()}};E.createOffer(F,D,G);J.peerConnection=E};j.initAnswerCtx=function(G,F,J){var E=G.peerConnection;if(G.peerConnection==null){u.createPeerConnection(G,F);E=G.peerConnection}var e=function(){G.peerConnection.ondatachannel=function(K){g.debug("Data channel is received");var M=K.channel.label;if(!G.dataTransfers.get(M)){G.callConfig.dataChannelConfig.push({label:M,reliable:K.channel.reliable})}var N=G.getDataTransfer(M);if(N){g.debug("Data channel is updating.")}else{N=new A();g.debug("The dataTransfer object with label "+M+" is created");G.dataTransfers.put(M,N)}var L=K.channel;N.initDataChannel(L);try{if(G.onDataTransfer){G.onDataTransfer(N)}else{g.warn("The onDataTransfer() callback function is not set.")}}catch(O){g.warn("The callback function 'Call.onDataTransfer()' exception: "+O)}}};if(G.callConfig.dataChannelConfig){e()}var I=function(){var L=function(){j.sendAnswer(G,J)};var K=function(R){var Q=u.changeSdpByCallConfig(R.sdp,G.callConfig);var O=function(){j.bindIceHandler(G,L)};var P=function(S){g.warn("Set localDescription failed!");j.invokeCallError(G,wsc.ERRORCODE.PEERCONNECTION_ERROR,S)};u.setLocalDescription(G,new RTCSessionDescription({type:"answer",sdp:Q}),O,P)};var N=function(O){g.error("Answer error:"+O);j.invokeCallError(G,wsc.ERRORCODE.PEERCONNECTION_ERROR,O)};var M={mandatory:{OfferToReceiveAudio:G.callConfig.shouldReceiveAudio(),OfferToReceiveVideo:G.callConfig.shouldReceiveVideo()}};E.createAnswer(K,N,M)};var H=G.newRemoteSDP;H.type="offer";var D=new RTCSessionDescription(H);u.setRemoteDescription(G,D,I,u.srdError(G))};j.clearCall=function(F){if(F&&F.dataTransfers&&F.dataTransfers.size!=0){var J=F.dataTransfers.values();var G=null;for(var E=0;E<J.length;E++){G=J[E];G.clear()}}try{u.clearPeerConnection(F);F.peerConnection=null}catch(H){g.error("clear call error: "+H)}var D=F.localMediaStreams;for(var E=0;E<D.length;E++){var I=D[E];g.debug("Media stream "+E+": used by "+I.peerConnectionNum+" peer connections.");if(!I.peerConnectionNum||I.peerConnectionNum==0){g.debug("Stop this media stream.");I.stop()}}F.session.removeSubSession(F.subSessionId)};j.invokeCallError=function(e,G,E){if(e.onCallError){var F=new wsc.ErrorInfo(G,E);try{e.onCallError(F)}catch(D){g.error("The callback function 'Call.onCallError()' exception:"+D)}}};j.rollbackUpdate=function(E){if(!E||!E.peerConnection){return}var e=E.peerConnection.remoteDescription;if(e){e.type="answer";if(!E.lastCallConfig.hasVideo()&&E.callConfig.hasVideo()){var D="m=video 1 RTP/SAVPF 100 116 117\r\nc=IN IP4 0.0.0.0\r\na=rtcp:1 IN IP4 0.0.0.0\r\na=ice-ufrag:usVUKntppdkIMTXG\r\na=ice-pwd:wkSn9KtxSGx/VOvLnYDDEIEg\r\na=mid:video\r\na=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=inactive\r\na=rtcp-mux\r\na=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:TFTeVP6nPAGI0b1jH+wdYF/rGCT4KWZibJzdymss\r\na=rtpmap:100 VP8/90000\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 goog-remb\r\na=rtpmap:116 red/90000\r\na=rtpmap:117 ulpfec/90000\r\na=ssrc:3652282028 cname:UNCKDl5De1KfjO9m\r\na=ssrc:3652282028 msid:jEQyadIHEx9HiiK79xxWwj3FnrtjCPhOPv7o jEQyadIHEx9HiiK79xxWwj3FnrtjCPhOPv7ov0\r\na=ssrc:3652282028 mslabel:jEQyadIHEx9HiiK79xxWwj3FnrtjCPhOPv7o\r\na=ssrc:3652282028 label:jEQyadIHEx9HiiK79xxWwj3FnrtjCPhOPv7ov0\r\n";e.sdp+=D;g.debug("Rollback adding video update, set remote sdp as : \r\n"+e.sdp)}u.setRemoteDescription(E,e)}if(E.lastCallConfig){E.callConfig=E.lastCallConfig}};j.updateCall=function(R,N,I,P){var K=R.callConfig;var e=N;var L=false,U=false;var J=false,G=false;var M=R.peerConnection;j.rollbackUpdate=function(X){var V=X.peerConnection;var Y=V.getLocalStreams();for(var W=0;W<Y.length;W++){u.removeLocalStream(X,Y[W])}X.peerConnection=M;j.closeExistingPc(V);if(X.lastCallConfig){X.callConfig=X.lastCallConfig}};var E=R.pcAddedStreams;R.pcAddedStreams=[];u.createPeerConnection(R);R.pcAddedStreams=E;j.bindIceHandler(R);if(e.audioConfig==B.MEDIADIRECTION.SENDONLY||e.audioConfig==B.MEDIADIRECTION.SENDRECV){L=true}if(e.videoConfig==B.MEDIADIRECTION.SENDONLY||e.videoConfig==B.MEDIADIRECTION.SENDRECV){U=true}if(e.audioConfig==B.MEDIADIRECTION.RECVONLY||e.audioConfig==B.MEDIADIRECTION.SENDRECV){J=true}if(e.videoConfig==B.MEDIADIRECTION.RECVONLY||e.videoConfig==B.MEDIADIRECTION.SENDRECV){G=true}var S=R.peerConnection;var T=S.onsignalingstatechange;S.onsignalingstatechange=function(V){g.debug("signalingState: ",S.signalingState);if(typeof T==="function"){T(V)}if(S.signalingState=="stable"){j.closeExistingPc(M);g.debug("Upgrade: the old peer connection is closed.",M);S.onsignalingstatechange=T}};var Q=j.handleMediaStream(R,I,L,U);var O=function(){if(!R.peerConnection){g.error("Peer connection of the call is null.");throw {name:"Error",message:"Peer connection of the call is null."}}var W={mandatory:{OfferToReceiveAudio:J,OfferToReceiveVideo:G}};var X=function(Y){g.debug("Updating call: offer created... "+Y.sdp);var Z=u.changeSdpByCallConfig(Y.sdp,N);Y=new RTCSessionDescription({type:"offer",sdp:Z});u.setLocalDescription(R,Y,function(){var aa=function(){R.lastCallConfig=R.callConfig;R.callConfig=N;j.sendOffer(R,P)};if(R.iceTimeout&&R.iceTimeout>0){setTimeout(function(){aa()},R.iceTimeout)}else{aa()}})};var V=function(Y){g.error("Browser failed to create offer! The error is: ",Y);j.invokeCallError(R,wsc.ERRORCODE.PEERCONNECTION_ERROR,Y)};R.peerConnection.createOffer(X,V,W)};var D=function(V){u.addLocalStream(R,V);O()};var H=function(V){g.error("[Update] Cannot get local stream... ",V);R.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ERROR,null);j.rollbackUpdate(R)};if(Q.needNewAudioStream||Q.needNewVideoStream){var F={audio:Q.needNewAudioStream,video:Q.needNewVideoStream};j.initUserMedia(R,D,H,F)}else{O()}};j.closeExistingPc=function(D){var e=u.getLocalStreams(D);for(var E=0;E<e.length;E++){var F=e[E];if(F.peerConnectionNum){F.peerConnectionNum--}}D.close()};j.handleMediaStream=function(K,I,e,E){var F=needGetNewVideoStream=false;var J=K.peerConnection;var D=K.localMediaStreams;var H=false;var G=function(T,L,S){var Q=false;for(var N=0;N<T.length;N++){var U=T[N],R=U.getAudioTracks(),O=U.getVideoTracks();var P=R&&R.length>0;var M=O&&O.length>0;if(L==P&&S==M){u.addLocalStream(K,U);Q=true}}return Q};if(I){H=G(I,e,E)}if(!H&&D){H=G(D,e,E)}if(e&&!E){F=!H}else{if(!e&&E){needGetNewVideoStream=!H}else{if(e&&E){if(!H){F=needGetNewVideoStream=true;if(I){F=!G(I,true,false);needGetNewVideoStream=!G(I,false,true)}if((F||needGetNewVideoStream)&&D){if(F){F=!G(D,true,false)}if(needGetNewVideoStream){needGetNewVideoStream=!G(D,false,true)}}}}else{if(!e&&!E){}}}}return{needNewAudioStream:F,needNewVideoStream:needGetNewVideoStream}};j.initUserMedia=function(H,J,F,D){var G=function(e){if(H.callState){var K=H.callState.state;if(K===B.CALLSTATE.END||K===B.CALLSTATE.FAILED){g.debug("Got media stream, but the call state is failed or end. So do nothing then.");return}}J(e)};var E=function(e){g.error("Failed to get access to local media. Error name was "+e.name);if(H.callState){var K=H.callState.state;if(K===B.CALLSTATE.END||K===B.CALLSTATE.FAILED){g.debug("Failed to get access to local media, but the call state is failed or end. So do nothing then.");return}}j.invokeCallError(H,wsc.ERRORCODE.MEDIA_ERROR,e.name);if(F){F(e)}};if(!D){D={audio:H.callConfig.shouldSendAudio(),video:H.callConfig.shouldSendVideo()}}try{m(D,G,E)}catch(I){g.error("The callConfig is invalid, cause initialize user media exception:"+I);throw I}};j.handleUpdateCallRequest=function(F,I){var D=F.offerAnswerManager.getLatestActiveRemoteSdp();g.debug("The latest active remote SDP is: "+D);g.debug("The latest active remote medias is: "+F.remoteMedias);var H=u.analyzeReinviteOffer(F.newRemoteMedias,F.remoteMedias),G=F.offerAnswerManager,e={};if(H.sessionIdChanged){g.debug("Got sdp with new sessionId");if(F.peerConnection==null||F.peerConnection.localDescription==null){g.info("Client is not ready. Reject incoming call.");j.sendReject(F)}else{u.createPcIfSessionIdChanged(F);G.reset();G.updateState(B.OFFER_ANSWER_STATE.OFFER_GOT,F.newRemoteSDP.sdp);j.initAnswerCtx(F)}}else{if(H.isCandidateUpdate){if(F.peerConnection==null||F.peerConnection.localDescription==null){g.info("Client is not ready. Reject incoming call.");j.sendReject(F)}else{var E=function(){F.peerConnection.createAnswer(function(K){var J=K;var L=function(){j.sendAnswer(F)};u.setLocalDescription(F,J,L)},function(J){g.warn("Get offer to update candidates. When create answer, get error: ",J)})};e=new RTCSessionDescription({sdp:F.newRemoteSDP.sdp,type:"offer"});u.setRemoteDescription(F,e,E,u.srdError(F))}}else{F.setCallState(B.CALLSTATE.UPDATING,null,"onUpdate");if(F.onUpdate){F.onUpdate(F.callConfig,I)}else{g.warn("No callback for update call request")}}}};j.checkSdp=function(F,I){var D="Null SDP is not supported now, call was canceled";var e=I.header.initiator;var E=I.header.target;var G=I.control.subsession_id;var H=I.control.correlation_id;F.caller=e;F.callee=E;F.subSessionId=G;F.startReqCorrId=H;if(I.payload.sdp){if(I.payload.sdp.indexOf("a=")<0&&I.payload.sdp.indexOf("m=")<0){j.sendRejectForNullSDP(F,B.ERRORCODE.FORBIDDEN,D);return false}else{return true}}else{j.sendRejectForNullSDP(F,B.ERRORCODE.FORBIDDEN,D);return false}};j.handleAnswer=function(e,E){E.type="answer";if(e.peerConnection){var D=function(){if(e&&e.peerConnection&&e.peerConnection.remoteDescription){}};u.setRemoteDescription(e,new RTCSessionDescription(E),D)}else{}};j.checkResumeState=function(e){if(e.resumeState){switch(e.resumeState){case B.RESUME_STATE.waittingFinalResp:e.resumeState=null;e.resume();break;case B.RESUME_STATE.reStartingCall:if(e.resumeSuccessCallback){e.resumeSuccessCallback();e.resumeState=null}break}}};j.onUpdateCall=function(Q,M,H,N){var e=M;if(e){Q.callConfig=e}else{e=Q.callConfig}var K=false,T=false;var J=false,G=false;var L=Q.peerConnection;j.rollbackUpdate=function(W){var U=W.peerConnection;var X=U.getLocalStreams();for(var V=0;V<X.length;V++){u.removeLocalStream(W,X[V])}W.peerConnection=L;U.close();if(W.lastCallConfig){W.callConfig=W.lastCallConfig}};var E=Q.pcAddedStreams;Q.pcAddedStreams=[];u.createPeerConnection(Q);Q.pcAddedStreams=E;j.bindIceHandler(Q);if(e.audioConfig==B.MEDIADIRECTION.SENDONLY||e.audioConfig==B.MEDIADIRECTION.SENDRECV){K=true}if(e.videoConfig==B.MEDIADIRECTION.SENDONLY||e.videoConfig==B.MEDIADIRECTION.SENDRECV){T=true}if(e.audioConfig==B.MEDIADIRECTION.RECVONLY||e.audioConfig==B.MEDIADIRECTION.SENDRECV){J=true}if(e.videoConfig==B.MEDIADIRECTION.RECVONLY||e.videoConfig==B.MEDIADIRECTION.SENDRECV){G=true}var R=Q.peerConnection;var S=R.onsignalingstatechange;R.onsignalingstatechange=function(U){g.debug("signalingState: ",R.signalingState);if(typeof S==="function"){S(U)}if(R.signalingState=="stable"){j.closeExistingPc(L);g.debug("Upgrade: the old peer connection is closed.",L);R.onsignalingstatechange=S}};var P=j.handleMediaStream(Q,H,K,T);var O=function(){if(!Q.peerConnection){g.error("Peer connection of the call is null.");throw {name:"Error",message:"Peer connection of the call is null."}}var Y={mandatory:{OfferToReceiveAudio:J,OfferToReceiveVideo:G}};var V=function(Z){g.debug("Updating call: answer created... "+Z.sdp);Q.lastCallConfig=Q.callConfig;Q.callConfig=M;var aa=u.changeSdpByCallConfig(Z.sdp,M);Z=new RTCSessionDescription({type:"answer",sdp:aa});u.setLocalDescription(Q,Z,function(){var ab=function(){j.sendAnswer(Q,N)};if(Q.iceTimeout&&Q.iceTimeout>0){setTimeout(function(){ab()},Q.iceTimeout)}else{ab()}})};var X=function(Z){g.error("Browser failed to create SDP answer!");j.invokeCallError(Q,wsc.ERRORCODE.PEERCONNECTION_ERROR,Z)};var U=new RTCSessionDescription({type:"offer",sdp:Q.newRemoteSDP.sdp});var W=function(){g.debug("[UPDATE] offer is set as remote description...\r\n"+Q.newRemoteSDP.sdp);Q.peerConnection.createAnswer(V,X,Y)};u.setRemoteDescription(Q,U,W,u.srdError(Q))};var D=function(U){if(c==B.LOGLEVEL.DEBUG){g.debug("[UPDATE] got local stream..."+U)}else{if(c<=B.LOGLEVEL.INFO){g.info("[UPDATE] got local stream...")}}u.addLocalStream(Q,U);O()};var I=function(U){g.debug("[Update] Cannot get local stream... ",U);Q.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ERROR,null);Q.decline();j.rollbackUpdate(Q)};if(P.needNewAudioStream||P.needNewVideoStream){var F={audio:P.needNewAudioStream,video:P.needNewVideoStream};j.initUserMedia(Q,D,I,F)}else{O()}};j.bindIceHandler=function(M,L){var D,K,I={},F=M.offerAnswerManager,E=false,H=0,J=function(){},e=function(){},G=M.peerConnection;K=function(P){var O=P.candidate,N=false;if(O){N=F.addCandidate(O);g.debug("candidate-",N?"new:":"exists already: ",JSON.stringify(P.candidate));E=E||N}else{g.debug("End of candidates.")}};D=function(O){var N=O.candidate;if(N){g.debug("candidate- ",JSON.stringify(O.candidate))}else{g.debug("End of candidates.")}};e=function(){if(M.callState.state!==B.CALLSTATE.ENDED&&(G===M.peerConnection)){if(E){g.debug("Got new candidates, trySendOffer...");E=false;F.trySendOffer()}setTimeout(function(){e()},M.getIceCheckInterval())}};J=function(){E=false;if(typeof L==="function"){L()}setTimeout(function(){e()},M.getIceCheckInterval())};if(M.peerConnection){if(M.iceTimeout&&M.iceTimeout>0){H=M.iceTimeout;M.peerConnection.onicecandidate=D;if(typeof L==="function"){I=setTimeout(function(){L();clearTimeout(I)},H)}}else{M.peerConnection.onicecandidate=K;J()}M.iceHandler={clearGotNewCandidateFlag:function(){E=false}}}else{throw {name:"IllegalStateError",message:"There is no peer connection in the call. Cannot bind."}}};j.isValidAnswerCallConfig=function(I,e){var J={SENDRECV:6,SENDONLY:4,RECVONLY:2,NONE:1},E=e.audioConfig,H=e.videoConfig,D=I.audioConfig,G=I.videoConfig,F=false;if(D==B.MEDIADIRECTION.SENDONLY||D==B.MEDIADIRECTION.RECVONLY||D==B.MEDIADIRECTION.NONE){if((D==E)||(E==B.MEDIADIRECTION.NONE)){F=true}}else{if(J[E]<=J[D]){F=true}}return F};j.getInitiator=function(e){return e.session.userName};j.getTarget=function(e){var D=e.session.userName;var E;if(D==e.getCaller()){E=e.getCallee()}else{E=e.getCaller()}return E};var f=function(D){if(!D){var e="The session parameter cannot be null!";g.error(e);throw e}this.packageType=B.PACKAGE.MESSAGE_NOTIFICATION;D.registerPackage(this);this.session=D;setExpiryValue=function(F,E){F.expiry=E};this.subscriptionMap=D.getSubSessionsByPackageType(B.PACKAGE.MESSAGE_NOTIFICATION);this.putSubscription=function(E,G){try{if(G!=null){this.subscriptionMap.put(E,G)}}catch(F){g.error("Put subscription into map: "+F)}};this.removeSubscriptionBysubsessionId=function(E){try{this.subscriptionMap.remove(E)}catch(F){g.error("Remove subscription from map:"+F)}};this.getSubscriptionByKey=function(E){var F=this.subscriptionMap.get(E);return F};this.getSubscriptions=function(){var G=new Array();var E=null;if(this.subscriptionMap){E=this.subscriptionMap.values();for(var F=0;F<E.length;F++){G[F]=E[F]}}return G};this.onRehydration=function(H){for(var K in H.entry){var M=H.entry[K];var J=M.target;var L=M.subscriber;var G=M.expiry;var E=M.valid;var F=M.subSessionId;var N=new Subscription(J,L);setExpiryValue(N,G);N.valid=E;N.subSessionId=F;N.session=this.session;var I=new MessageSummary(M.latestNotification);N.setLatestMsgNotify(I);if(N!=null){this.putSubscription(K,N)}this.onResurrect(N)}};this.onResurrect=null;this.toJSON=function(){var E={};var G={session:""};for(var F in this){if(F in G){continue}else{E[F]=this[F]}}return E};Subscription=function(I,G,J,H,F,E){this.session=null;this.target=I;this.subSessionId=null;this.latestNotification;this.subscriber=G;this.getNotifier=function(){return this.target};this.getSubscriber=function(){return this.subscriber};this.onSuccess=function(K){g.debug("Calling 'Subscription.onSuccess' of the subscription for:"+K);this.valid=true;J(K)};this.onError=H;this.onNotification=F;this.onEnd=E;this.valid=false;this.setLatestMsgNotify=function(K){this.latestNotification=K};this.subscribe=function(M){var L=D.genNewCorrelationId(),K=D.lastServerSequence;this.correlationId=L;if(this.subSessionId==null){this.subSessionId=B.CONSTCS.CLIENT+(D.getLastOutboundSeq()+1)}var N=new s.Message();N.control.type=B.TYPE.REQUEST;N.control.subsession_id=this.subSessionId;N.control.package_type=B.PACKAGE.CALL;N.control.correlation_id=L;N.control.ack_sequence=K;N.control.package_type=B.PACKAGE.MESSAGE_NOTIFICATION;N.header.initiator=D.userName;N.header.target=I;N.header.action=B.ACTION.START;if(M){N.addExtHeaders(M)}if(this.extHeaders){N.addExtHeaders(this.extHeaders)}if(this.authInfo){N.header.authorization=this.authInfo;this.authInfo=null}this.session.sendMessage(N)}};Subscription.prototype={toJSON:function(){var E={};var G={session:""};for(var F in this){if(F in G){continue}else{E[F]=this[F]}}return E},end:function(E){g.info("Subscription is ended by user");var F=new s.Message();F.control.type=B.TYPE.MESSAGE;F.control.subsession_id=this.subSessionId;F.control.correlation_id=this.correlationId;F.control.ack_sequence=this.session.lastServerSequence;F.control.package_type=B.PACKAGE.MESSAGE_NOTIFICATION;F.header.initiator=this.session.userName;F.header.target=this.target;F.header.action=B.ACTION.SHUTDOWN;if(E){F.addExtHeaders(E)}this.session.removeSubSession(this.subSessionId);this.session.sendMessage(F);this.valid=false},isValid:function(){return this.valid}};Notification=function(E,G,F){this.sender=E;this.receiver=G;this.msgContent=F;if(arguments.length==1){this.sender=arguments[0].sender;this.receiver=arguments[0].receiver;this.msgContent=arguments[0].msgContent}this.setSender=function(H){this.sender=H};this.setReceiver=function(H){this.receiver=H};this.setContent=function(H){this.msgContent=H};this.getSender=function(){return this.sender};this.getReceiver=function(){return this.receiver};this.getContent=function(){return this.msgContent}};Notification.prototype={getSender:function(){return this.getSender()},getReceiver:function(){return this.getReceiver()},getContent:function(){return this.getContent()}};MessageSummary=function(){MessageSummary.superclass.constructor.apply(this,arguments)};s.extend(MessageSummary,Notification);MessageSummary.prototype={getMessageCounts:function(G){var F=this.msgContent[G];if(F==null){g.error("Failed to obtain message summary content. The parameter: "+G+" may be incorrect.");return null}else{var E=new MessageCounts(F);return E}},getMessageAccount:function(){return this.getContent().message_account},isMessageWaiting:function(){if(this.getContent().messages_waiting=="yes"){return true}else{return false}}};MessageCounts=function(I){var E;var F;var G;var K;if(I!=null){var H=I;var J=H.split("(");E=parseInt(J[0].split("/")[0]);F=parseInt(J[0].split("/")[1]);G=parseInt(J[1].split("/")[0]);K=parseInt(J[1].split("/")[1])}this.getNew=function(){return E};this.getOld=function(){return F};this.getUrgentNew=function(){return G};this.getUrgentOld=function(){return K}}};f.prototype={createNewSubscription:function(H,K,I,E,J,D,F){var L=new Subscription(H,K,I,E,J,D);L.session=this.session;g.debug("Start subscription executed!");L.subscribe(F);try{if(L!=null){this.putSubscription(L.subSessionId,L)}}catch(G){g.error(G)}return L},onMessage:function(W){var E=this.session,O=W.getExtHeaders(),Q=W.header.action,N=W.control.type,G=W.control.subsession_id;if(N=="response"&&Q==B.ACTION.START){var S=this.getSubscriptionByKey(G);if(S.extHeaders){delete S.extHeaders}setExpiryValue(S,W.header.expiry);S.onSuccess(S.target)}else{if(N=="error"&&Q==B.ACTION.START){g.debug("Subscription error. The error code is: "+W.header.error_code);var H=true,V=null,R=W.header.reason,J=W.header.error_code,S=this.getSubscriptionByKey(G),K=new s.ErrorInfo(J,R),U=0;if(W.header.error_code==B.ERRORCODE.PROXYAUTH_REQUIRED||W.header.error_code==B.ERRORCODE.UNAUTHORIZED){var M=this.session.authHandler;if(M&&M.refresh){while(H&&U<3){try{U++;var I=W.header.authenticate;var L=M.refresh(s.AUTHTYPE.SERVICE,I);if(s.checkAuthInfo(s.AUTHTYPE.SERVICE,L)){S.authInfo=L;S.subscribe();H=false;break}else{if(L==false||L==null){V="No correct information was returned from the callback function 'AuthHandler.refresh()', or the user canceled the operation.";break}else{V="No correct information was returned from the callback function 'AuthHandler.refresh()'. Please try again.";g.warn(V)}}}catch(T){V="Handle unauthenticated message error:"+T;g.error(V);H=true}}}else{V="No AuthHandler object was created for this Session or this AuthHandler did not implement the callback function 'AuthHandler.refresh()'!"}}if(H==true){if(V){R=R+"--"+V}g.warn("Start subscription failed: "+R);K=new s.ErrorInfo(J,R);if(S.onError){try{S.onError(K)}catch(T){g.error("subscription.onError exception: "+T)}}this.removeSubscriptionBysubsessionId(S.subSessionId)}}else{if(N=="message"&&Q==B.ACTION.SHUTDOWN){var S=this.getSubscriptionByKey(G);if(S!=null){S.valid=false;this.removeSubscriptionBysubsessionId(S.subSessionId);S.subSessionId=null;g.debug("Subscription end received from server.");S.onShutdown()}}else{if(N=="message"&&Q==B.ACTION.NOTIFY){g.debug("Message notification received.");var P=W.payload;g.debug("The payload is: "+JSON.stringify(P));var F=W.header.initiator;var S=this.getSubscriptionByKey(G);if(S.valid!=true){S.valid=true}var D;if(P.messages_waiting){g.debug("Payload has messages_waiting, a notification of message-summary event type");D=new MessageSummary(F,W.header.target,P)}else{g.debug("Payload has NO messages_waiting, a notification WITHOUT message-summary event type");D=new Notification(F,W.header.target,P)}S.setLatestMsgNotify(D);S.onNotification(D)}}}}this.session.saveToStorage()}};var A=function(){this.dataChannel=null;this.state="none";this.label=null;this.onOpen=null;this.onClose=null;this.onError=null;this.dataSender=null;this.dataReceiver=null;var G=this;var E=function(){G.dataSender=new q(G.dataChannel);g.info("Sender of DataTransfer created.")};var I=function(){G.dataReceiver=new i();g.info("Receiver of DataTransfer created.")};var F=function(J){g.debug("****TO REMOVE: Received data:"+J.data);if(G.dataReceiver){G.dataReceiver.onMessage(J)}else{g.warn("The default data receiver is still initialized to receive data.")}};var D=function(J){G.state="open";E();I();var K=G.dataChannel.readyState;if(G.label==null){G.label=G.dataChannel.label}g.debug('Data Channel "'+G.dataChannel.label+'" is open; current readyState: '+K);G.dataChannel.disabled=false;G.dataChannel.onmessage=F;if(G.onOpen){G.onOpen(J)}};var e=function(J){G.state="closed";var K=G.dataChannel.readyState;if(G.label==null){G.label=G.dataChannel.label}g.debug('Data Channel "'+G.dataChannel.label+'" is closing; current readyState is: '+K);G.dataChannel.disabled=true;if(G.onClose){G.onClose(J)}};var H=function(J){g.debug("Received dataChannel error event for DataTransfer: "+G.dataChannel.label);if(G.onError){G.onError(J)}};this.initDataChannel=function(J){g.debug("DataTransfer object initialized by the dataChannel.");G.dataChannel=J;G.state="starting";G.label=J.label;if(G.dataChannel){try{G.dataChannel.onopen=D;G.dataChannel.onerror=H;G.dataChannel.onclose=e}catch(K){g.error("Exception occured when initializing the callback functions of the data channel: "+K)}}else{g.error("Could not initialize the data channel with null.")}};this.clear=function(){try{if(G.dataChannel!=null){G.dataChannel.close();G.dataChannel.disabled=true;g.info("DataTransfer closed its data channel; current readyState is: "+G.dataChannel.readyState)}g.info("DataTransfer object cleared")}catch(J){g.error("Recieved an exception when cleaning the DataTransfer object: "+J)}};this.toJSON=function(){var J={};var L={session:"",packageHandler:""};for(var K in this){if(K in L){continue}else{J[K]=this[K]}}return J}};A.prototype={getState:function(){return this.state},getSender:function(){return this.dataSender},getReceiver:function(){return this.dataReceiver}};var q=function(e){this.dataChannel=e};q.prototype={send:function(D){if(this.dataChannel!=null&&this.dataChannel.readyState=="open"){try{this.dataChannel.send(D)}catch(E){g.debug("Exception when sending data by dataChannel: "+E);throw E}}else{g.error("Error when sending data. The dataChannel is not in a valid state.")}}};var i=function(){this.onMessage=function(e){g.info("onMessage function is not overridden by the application. New received data is handle by the default DataReceiver object.")}};i.prototype={};var o=function(M,N,J,F,D,G){if(G){this.lastClientExtHeader=G}if(D){var K=r.rehydrateSession(M,N,J,F,D);if(K==null){var E="Failed to reload session data.";var L=new s.ErrorInfo(B.ERRORCODE.RESTORE_FAILED,E);g.warn(E);try{if(F){F(L)}}catch(H){g.error("onError callback exception: "+H)}}return K}this.webSocketUri=N;this.sessionId=null;this.userName=M;this.sessionState=B.SESSIONSTATE.NONE;try{r.initWebSocket(this)}catch(H){g.error("Websocket initialization exception: "+H);if(F){var L=new s.ErrorInfo(B.ERRORCODE.WEBSOCKET_ERROR,H);try{F(L)}catch(I){g.error("The callback function 'Session.failureCallback()' returned the exception: "+I)}}}this.subSessionsMap=new s.Map();this.unACKedMsgQueue=new n();this.successCallback=J;this.failureCallback=F;this.lastOutboundSeq=0;this.lastInboundSeq=0;this.lastInboundRequest=null;this.hostIPs=[];this.onSessionStateChange=null;this.packagesMap=new s.Map();this.busyPingInterval=3*1000;this.idlePingInterval=10*1000;this.pingInterval=this.idlePingInterval;this.reConnectInterval=2*1000;this.reConnectTime=60*1000;this.retryCount=2;this.retryTimes=0;this.wscWebsocket;this.sessionTimeOut=null,this.reConnectTimeOut=null,this.pingTimeOut=null,this.lastActiveTime=null,new l(this);this.toJSON=function(){var e={sessionId:this.sessionId,userName:this.userName,unACKedMsgQueue:this.unACKedMsgQueue,lastOutboundSeq:this.lastOutboundSeq,lastInboundSeq:this.lastInboundSeq,lastInboundRequest:this.lastInboundRequest,subSessionsMap:this.subSessionsMap,packagesMap:this.packagesMap};return e}};o.prototype={getAllSubSessions:function(){var G=new Array(),I=this.subSessionsMap.values(),e=0;for(var F=0;F<I.length;F++){var H=I[F];var E=H.values();for(var D=0;D<E.length;D++){G[e]=E[D];e++}}return G},getSubSessionsByPackageType:function(e){return this.subSessionsMap.get(e)},putSubSession:function(e,F,D){var E=this.subSessionsMap.get(e);if(!E){E=new s.Map();this.subSessionsMap.put(e,E)}E.put(F,D);r.updateActivityMarker(this);this.pingInterval=this.busyPingInterval;r.schedulePing(this,false);g.debug("use busyPingInterval "+this.pingInterval)},getSubSession:function(F){var E=null,e=this.subSessionsMap.values();for(var D=0;D<e.length;D++){E=e[D].get(F);if(E!=null){break}}return E},removeSubSession:function(F){var e=this.subSessionsMap.values();for(var D=0;D<e.length;D++){e[D].remove(F)}var E=this.getAllSubSessions();if(E&&E.length==0){r.updateActivityMarker(this);this.pingInterval=this.idlePingInterval;g.debug("use idlePingInterval "+this.pingInterval)}},saveToStorage:function(){if(this.sessionState!=B.SESSIONSTATE.CLOSED&&this.sessionState!=B.SESSIONSTATE.FAILED&&this.sessionState!=B.SESSIONSTATE.RELOADING){if(y.supportSessionStorage){if(this.sessionId){try{sessionStorage.setItem(this.sessionId,JSON.stringify(this))}catch(D){r.invokeSessionError(this,wsc.ERRORCODE.SAVE_FAILED,D)}}}else{g.warn("Sorry, web storage is not supported...")}}else{g.debug("Do not save session data with session state: "+this.sessionState)}},setSessionState:function(e){this.sessionState=e;if(this.sessionId!=null){this.saveToStorage()}if(this.onSessionStateChange){this.onSessionStateChange(e)}},close:function(){r.clearSession(this);if(this.wscWebsocket){this.wscWebsocket.close(1000,"Normal close");this.wscWebsocket=null;g.info("Websocket normally closed")}this.setSessionState(B.SESSIONSTATE.CLOSED)},getPackage:function(D){var e=this.packagesMap.get(D);return e},registerPackage:function(F){var D=F.packageType;if(!D){g.error("There is no packageType defined in the package handler.");return}try{handlerObj=this.packagesMap.get(D);if(!handlerObj){this.packagesMap.put(D,F);var E=new s.Map();this.subSessionsMap.put(D,E)}}catch(G){g.error("Package registration failed:"+G)}},getUserName:function(){return this.userName},getSessionId:function(){return this.sessionId},getLastOutboundSeq:function(){return this.lastOutboundSeq},setIdlePingInterval:function(e){if(e<1000){this.idlePingInterval=1000}else{this.idlePingInterval=e}},setBusyPingInterval:function(e){if(e<1000){this.busyPingInterval=1000}else{this.busyPingInterval=e}},setReconnectInterval:function(e){this.reConnectInterval=e},setReconnectTime:function(e){this.reConnectTime=e},sendMessage:function(G){var E=G.control.package_type,I=this.sessionId,F=G.control.type,D;if(I){G.control.session_id=I}G.control.version="1.0";if(!G.isReconnect()){if(F!=B.TYPE.ACK){G.control.sequence=this.lastOutboundSeq+1}}D=JSON.stringify(G);if(this.sessionState==B.SESSIONSTATE.CLOSED||this.sessionState==B.SESSIONSTATE.FAILED){g.debug("Cannot send message; session state: "+this.sessionState);throw"Cannot send message; session state: "+this.sessionState}else{if(this.sessionState==B.SESSIONSTATE.CONNECTED||E==B.PACKAGE.REGISTER){try{this.wscWebsocket.send(D);g.debug("Send message: "+JSON.stringify(G,null,4))}catch(H){g.error("Received an exception when sending message: "+H)}}if(!G.isACK()&&!G.isReconnect()){this.lastOutboundSeq++}this.unACKedMsgQueue.addMessage(G);if(G.isResponse()&&G.control.message_state===B.MESSAGESTATE.FINAL||G.isError()){if(this.lastInboundRequest){if(this.lastInboundRequest.control.sequence==G.control.ack_sequence){this.lastInboundRequest=null}}}}this.saveToStorage()},reSendMessage:function(E){var D=JSON.stringify(E);try{this.wscWebsocket.send(D);g.debug("Re-send message: "+JSON.stringify(E,null,4))}catch(F){g.error("Received an exception when re-sending message: "+F)}this.unACKedMsgQueue.addMessage(E);this.saveToStorage()},genNewCorrelationId:function(){var e=B.CONSTCS.CLIENT+(this.getLastOutboundSeq()+1);return e}};r.handleWsOpen=function(G){u.collectHostIPsByPc(F,D);function F(H){g.debug("New IPs: "+H.toString()+", Old IPs: "+G.hostIPs.toString());if(G.hostIPs.length!=0){if(e(G.hostIPs,H)){E()}else{G.clientIpNotChangedAfterReconnect=true;r.sendRegister(G,null)}}else{r.sendRegister(G,null)}G.hostIPs=H}function D(){g.error("Failed to get host IPs.");E()}function e(I,J){var H=false;if(J.length!=I.length){H=true}else{for(var K=0;K<J.length;K++){var L=J[K];if(I.indexOf(L)==-1){H=true;break}}}return H}function E(){var M=G.subSessionsMap.get(B.PACKAGE.CALL);if(M&&M.size>0){var K=M.values();for(var J=0;J<K.length;J++){var L=K[J];var I=L.peerConnection;if(I){var H=u.getLocalStreams(I),N=u.getRemoteStreams(I);L.pcAddedStreams=H;if(H){for(var J=0;J<H.length;J++){u.removeLocalStream(L,H[J])}}if(N){for(var J=0;J<N.length;J++){if(!y.isFirefox){I.removeStream(N[J])}}}if(I.iceConnectionState!="closed"){I.close();L.peerConnection=null}}}}r.sendRegister(G,null)}};r.handleWsClose=function(e){r.clearWebSocket(e.wscWebsocket);e.wscWebsocket=null;if(e.sessionState==B.SESSIONSTATE.CONNECTED){e.setSessionState(B.SESSIONSTATE.RECONNECTING);window.clearTimeout(e.pingTimeOut);e.sessionTimeOut=window.setTimeout(function(){g.warn("reconnect timeout.");r.clearSession(e);e.setSessionState(B.SESSIONSTATE.FAILED);window.clearTimeout(e.reConnectTimeOut)},e.reConnectTime);r.reInitWebSocket(e)}};r.reInitWebSocket=function(D){var e=D.sessionState;if(e!=B.SESSIONSTATE.CONNECTED&&e!=B.SESSIONSTATE.CLOSED){if(D.reConnectTimeOut){window.clearTimeout(D.reConnectTimeOut)}r.initWebSocket(D);D.reConnectTimeOut=window.setTimeout(function(){r.reInitWebSocket(D)},D.reConnectInterval)}};r.schedulePing=function(D,e){if(D.sessionState==B.SESSIONSTATE.CONNECTED){if(D.pingTimeOut){window.clearTimeout(D.pingTimeOut)}if(e){r.sendPing(D)}D.pingTimeOut=window.setTimeout(function(){r.schedulePing(D,true)},D.pingInterval)}};r.sendPing=function(E){try{if(E.wscWebsocket!=null){E.wscWebsocket.send("ping");r.isAlive(E)}}catch(D){g.debug("can not send ping now: "+D)}};r.isAlive=function(D){var e=Date.now();if(e>(D.lastActiveTime+D.pingInterval*1.2)){D.retryTimes++;g.debug("The ping-pong retryTimes/retryCount: "+D.retryTimes+"/"+D.retryCount);if(D.retryTimes==D.retryCount){D.retryTimes=0;g.warn("Client reconnecting...");r.handleWsClose(D)}}else{D.retryTimes=0}};r.updateActivityMarker=function(e){e.lastActiveTime=Date.now()};r.clearSession=function(E){var D=E.packagesMap.values();for(var e=0;e<D.length;e++){if(D[e].clear){D[e].clear()}}if(y.supportSessionStorage){if(sessionStorage){sessionStorage.removeItem(E.sessionId);sessionStorage.removeItem("sessionId")}}};var n=function(){var e=null;var E=null;var D=new s.Queue();this.toJSON=function(){var F={lowerSeq:e,upperSeq:E,msgQueue:D};return F};this.getLowerSeq=function(){return e};this.setLowerSeq=function(F){e=F};this.getUpperSeq=function(){return E};this.setUpperSeq=function(F){E=F};this.getMsgQueue=function(){return D};this.addMessage=function(G){if(this.isNotReConnectMsg(G)){var F=G.control.sequence;if(e==null){e=F}E=F;D.enqueue(G);g.debug("addMessage - cslw: "+this.getLowerSeq()+",csuw: "+this.getUpperSeq())}};this.isNotReConnectMsg=function(H){var F=H.header.action;var G=H.control.session_id;if(F==B.ACTION.CONNECT&&G!=null){return false}else{return true}};this.ackMessages=function(F){if(D.length()!=0&&F>=e&&F<=E){var H=D.dequeue();var G=H.control.sequence;while(G<F){H=D.dequeue();G=H.control.sequence}if(D.peek()==null){e=E+1}else{H=D.peek();e=H.control.sequence}g.debug("ackMessages - cslw: "+this.getLowerSeq()+",csuw: "+this.getUpperSeq());return true}else{return false}};this.reSendMessage=function(J,F){var I=D.length();var H=0;while(H++<I){var K=D.dequeue();var G=K.control.sequence;if(G>=F+1){g.debug("reSend message: "+JSON.stringify(K));J.reSendMessage(K)}else{g.debug("skip message: "+JSON.stringify(K))}}if(D.peek()==null){e=E+1}else{var K=D.peek();e=K.control.sequence}g.debug("reSendMessage - cslw: "+this.getLowerSeq()+",csuw: "+this.getUpperSeq())}};r.handleWsData=function(I,M){r.updateActivityMarker(M);if(I=="pong"){}else{r.schedulePing(M,false);var e=null;if(typeof I==="string"){e=JSON.parse(I)}else{e=I}g.debug("Received data from server: "+JSON.stringify(e,null,4));var P=new s.Message(e);var G=null;var E=null;var N=null;var H=null;var F=null;if(P){G=P.control.sequence;E=P.control.ack_sequence;N=P.control.type;H=P.header.action;F=P.control.package_type}if(G){M.lastInboundSeq=G}if(E){M.unACKedMsgQueue.ackMessages(E)}else{if(N===B.TYPE.RESPONSE&&G!=null){M.unACKedMsgQueue.ackMessages(G)}}if((N===B.TYPE.RESPONSE&&H===B.ACTION.CONNECT)||F==B.PACKAGE.REGISTER){F=B.PACKAGE.REGISTER}else{if(!F){F=B.PACKAGE.CALL}}if(N===B.TYPE.REQUEST){M.lastInboundRequest=P}if(H===B.ACTION.SHUTDOWN){if(M.lastInboundRequest!=null){var L=M.lastInboundRequest.control.subsession_id;var D=P.control.subsession_id;if(L==D){M.lastInboundRequest=null}}}var K=M.getPackage(F);if(K){K.onMessage(P)}else{g.warn("package_type '"+F+"' is not defined!")}if(P.isError()){var O=P.header.error_code;var J=P.header.reason;if(O===500&&M.sessionState!=B.SESSIONSTATE.CLOSED){r.invokeSessionError(M,O,J);M.close()}}M.saveToStorage()}};r.invokeSessionError=function(G,F,D){if(G.failureCallback){var E=new wsc.ErrorInfo(F,D);try{G.failureCallback(E)}catch(e){g.error("The callback function 'Session.failureCallback()' returned an exception: "+e)}}};r.initWebSocket=function(e){if(e.wscWebsocket==null){g.debug("creating the websocket...");e.wscWebsocket=new WebSocket(e.webSocketUri,"webrtc.oracle.com");if(e.wscWebsocket==null){throw new Error("sessionHelper.initWebSocket(): new WebSocket() returns null.")}e.wscWebsocket.onopen=function(D){g.debug("websocket event handler onopen is invoked.");r.handleWsOpen(e)};e.wscWebsocket.onclose=function(D){g.debug("websocket event handler onclose is invoked.");r.handleWsClose(e)};e.wscWebsocket.onmessage=function(D){if(D.data){r.handleWsData(D.data,e)}};e.wscWebsocket.onerror=function(D){g.info("websocket onerror")}}};r.clearWebSocket=function(e){if(e!=null){e.onopen=null;e.onclose=null;e.onmessage=null;e.onerror=null}};r.sendRegister=function(D,e){var E=new s.Message();E.control.type=B.TYPE.REQUEST;E.control.package_type=B.PACKAGE.REGISTER;if(D.userName){E.header.initiator=D.userName;E.header.target=D.userName}E.header.action=B.ACTION.CONNECT;if(e){E.header.authorization=e}if(D.sessionId){if(e){D.sendMessage(E)}else{E.header.cslr=D.lastInboundSeq;E.header.cslw=D.unACKedMsgQueue.getLowerSeq();E.header.csuw=D.unACKedMsgQueue.getUpperSeq();D.sendMessage(E)}}else{D.sendMessage(E)}};r.rehydrateSession=function(J,K,D,e,F){var G=r.getStoredSession(F);g.debug("Get stored session: "+JSON.stringify(G));if(G){var I=new o(J,K,D,e);I.userName=G.userName;I.sessionId=G.sessionId;I.lastOutboundSeq=G.lastOutboundSeq;I.lastInboundSeq=G.lastInboundSeq;I.lastInboundRequest=G.lastInboundRequest;I.unACKedMsgQueue.setUpperSeq(G.unACKedMsgQueue.upperSeq);I.unACKedMsgQueue.setLowerSeq(G.unACKedMsgQueue.lowerSeq);var H=G.unACKedMsgQueue.msgQueue.array;for(var E=0;E<H.length;E++){I.unACKedMsgQueue.getMsgQueue().enqueue(H[E])}I.rehydrationData={subSessionsMap:G.subSessionsMap,packagesMap:G.packagesMap};I.setSessionState(B.SESSIONSTATE.RELOADING);return I}else{return null}};r.getStoredSession=function(D){if(y.supportSessionStorage){var e=sessionStorage.getItem(D);if(e){return JSON.parse(e)}}return null};r.removeStoredSession=function(e){if(y.supportSessionStorage){sessionStorage.removeItem(e)}};var h=function(E,D,e){this.audioConfig=E;this.videoConfig=D;this.dataChannelConfig=e;this.hasAudio=function(){return(this.audioConfig!=null&&(this.audioConfig==B.MEDIADIRECTION.SENDRECV||this.audioConfig==B.MEDIADIRECTION.SENDONLY))};this.hasVideo=function(){return(this.videoConfig!=null&&(this.videoConfig==B.MEDIADIRECTION.SENDRECV||this.videoConfig==B.MEDIADIRECTION.SENDONLY))};this.shouldSendAudio=function(){return(this.audioConfig!=null&&(this.audioConfig==B.MEDIADIRECTION.SENDRECV||this.audioConfig==B.MEDIADIRECTION.SENDONLY))};this.shouldSendVideo=function(){return(this.videoConfig!=null&&(this.videoConfig==B.MEDIADIRECTION.SENDRECV||this.videoConfig==B.MEDIADIRECTION.SENDONLY))};this.shouldReceiveAudio=function(){return(this.audioConfig!=null&&(this.audioConfig==B.MEDIADIRECTION.SENDRECV||this.audioConfig==B.MEDIADIRECTION.RECVONLY))};this.shouldReceiveVideo=function(){return(this.videoConfig!=null&&(this.videoConfig==B.MEDIADIRECTION.SENDRECV||this.videoConfig==B.MEDIADIRECTION.RECVONLY))}};var b=function(G,E,e,D){this.session=G;this.packageHandler=this.session.getPackage(B.PACKAGE.CALL);this.caller=e;this.callee=D;this.callConfig=E;this.dataTransfers=new s.Map();this.lastCallConfig=null;this.callState=new w(B.CALLSTATE.NONE,null,"");this.earlyMediaState=null;this.resumeState=null;this.peerConnection=null;this.onMediaStreamEvent=null;this.onCallStateChange=null;this.onDataTransfer=null;this.onUpdate=null;this.onCallError=null;this.streamAddTimes=0;this.hungupCallback=null;this.subSessionId=null;this.startReqCorrId=null;this.newRemoteSDP=null;this.newRemoteMedias=null;this.remoteMedias=null;this.localMediaStreams=[];this.pcAddedStreams=[];this.offerAnswerManager=new p(this);var F=2000;this.setIceCheckInterval=function(H){if(H<=0){throw {name:"IllegalArgumentError",message:"The ICE check Interval must be greater than zero."}}F=H};this.getIceCheckInterval=function(){return F}};b.prototype={start:function(D,F){var K=this;if(K.callState.state!==B.CALLSTATE.NONE&&K.resumeState!=B.RESUME_STATE.reStartingCall){throw"The call has already been started"}if(F){K.extHeaders=F}var G=K.callConfig.shouldSendAudio();var E=K.callConfig.shouldSendVideo();if(G||E){if(D&&D.length>0){H(D)}else{j.initUserMedia(K,I,e)}}else{H(D)}function J(){var M=K.callConfig.dataChannelConfig;var L;if(M.length!=0){for(L in M){var N=M[L];var O=K.dataTransfers.get(N.label);console.log("REMOVE: the dataTransfer object receieved when the call is started: ",O);if(!O){O=new A();K.dataTransfers.put(N.label,O)}try{if(K.onDataTransfer){K.onDataTransfer(O)}else{g.warn("The onDataTransfer() callback function is not set when starting.")}}catch(P){g.warn("The callback function 'Call.onDataTransfer()' encountered an exception: "+P)}}}}function I(L){H([L])}function H(L){try{if(K.callConfig.dataChannelConfig){J()}j.initOfferCtx(K,L,F)}catch(M){if(K.onCallError){j.invokeCallError(K,wsc.ERRORCODE.PEERCONNECTION_ERROR,M)}else{g.error("Start exception: "+M)}}}function e(L){g.error("Cannot get local stream... ",L);K.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ERROR,null)}},getDataTransfer:function(e){return this.dataTransfers.get(e)},getCaller:function(){return this.caller},getCallee:function(){return this.callee},getCallState:function(){return this.callState},getCallConfig:function(){return this.callConfig},getPeerConnection:function(){return this.peerConnection},toJSON:function(){var e={caller:this.caller,callee:this.callee,callConfig:this.callConfig,callState:this.callState,earlyMediaState:this.earlyMediaState,subSessionId:this.subSessionId,remoteMedias:this.remoteMedias,offerAnswerManager:this.offerAnswerManager,iceTimeout:this.iceTimeout,onDataTransfer:this.onDataTransfer};return e},setCallState:function(J,E,K){var F=this.callState;var D=F.state;if(F.isFinalState()){return}if(F.hasEstablished()){if(J==B.CALLSTATE.NONE||J==B.CALLSTATE.STARTED||J==B.CALLSTATE.RESPONDED){return}}var I=F.status.code;if(D!=J||(D==J&&I!=E)){this.callState.state=J;this.callState.status.code=E;this.callState.status.reason=K;try{if(this.onCallStateChange!=null){if(this.lastServerExtHeader){var H=this.lastServerExtHeader;this.onCallStateChange(this.callState,H);delete this.lastServerExtHeader}else{this.onCallStateChange(this.callState)}}}catch(G){g.warn("The callback function 'Call.onCallStateChange()' exception: "+G)}this.session.saveToStorage()}},fireMediaStreamEvent:function(D,E){if(this.onMediaStreamEvent){try{if(this.lastServerExtHeader){var G=this.lastServerExtHeader;this.onMediaStreamEvent(D,E,G);delete this.lastServerExtHeader}else{this.onMediaStreamEvent(D,E)}}catch(F){g.warn("The callback function 'Call.onMediaStreamEvent()' exception:"+F)}}},decline:function(D,F){try{if(D==null){D=B.ERRORCODE.DECLINED}if(this.callState.state==B.CALLSTATE.UPDATING){this.callConfig=this.lastCallConfig;this.setCallState(B.CALLSTATE.UPDATE_FAILED,D,"Decline")}else{u.clearPeerConnection(this);this.peerConnection=null;this.session.removeSubSession(this.subSessionId);this.setCallState(B.CALLSTATE.FAILED,D,"Decline")}j.sendReject(this,D,F);g.info("decline call.")}catch(E){g.error("answer error: "+E)}},accept:function(M,E,H){var N=this,I=N.callConfig.shouldSendAudio(),F=N.callConfig.shouldSendVideo();try{this.setCallState(B.CALLSTATE.STARTED,null,"receive call");var G=j.isValidAnswerCallConfig(this.callConfig,M);if(!G){throw {name:"InvalidCallConfig",message:"The parameter 'callConfig' is invalid."}}if(this.callState.state==B.CALLSTATE.UPDATING&&this.peerConnection!=null){j.onUpdateCall(this,M,E,H)}else{if(M){this.callConfig=M}if(I||F){if(E){L(E)}else{j.initUserMedia(N,K,D)}}else{L()}}g.debug("accept call")}catch(J){g.error("answer error: "+J);throw J}function K(e){L([e])}function D(e){g.error("Cannot get local stream... ",e);N.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ERROR,null);N.decline()}function L(O){try{j.initAnswerCtx(N,O,H)}catch(P){if(N.onCallError){j.invokeCallError(N,wsc.ERRORCODE.PEERCONNECTION_ERROR,P)}g.error("Got exception when accept the call: "+P)}}},end:function(D){var E=j.createMessage(this);var e="cancelled";E.header.action=B.ACTION.SHUTDOWN;E.addExtHeaders(D);if(this.callState.state!=B.CALLSTATE.NONE&&!this.callState.isFinalState()){if(this.callState.hasEstablished()){E.control.correlation_id=this.session.genNewCorrelationId();e="shutdown"}else{E.control.correlation_id=this.startReqCorrId;e="cancelled"}this.session.sendMessage(E)}j.clearCall(this);this.setCallState(B.CALLSTATE.ENDED,"",e)},update:function(D,e,E){this.setCallState(B.CALLSTATE.UPDATING,"","update");j.updateCall(this,D,e,E)},resume:function(e,G){g.info("Begin to resume call");var F=this;var I=F.pcAddedStreams;F.resumeSuccessCallback=e;F.resumeFailureCallback=G;if(F.session.clientIpNotChangedAfterReconnect){F.session.clientIpNotChangedAfterReconnect=false;g.debug("Client network was not changed, no further action needed.");if(F.resumeSuccessCallback){F.resumeSuccessCallback()}return}var E=F.offerAnswerManager.getMasterState();var H=F.offerAnswerManager.getSlaveState();var D=B.OFFER_ANSWER_STATE;g.debug("The m/s offer-answer states are: "+E+"/"+H);switch(E){case D.INITIAL:switch(H){case D.OFFER_REJECT:case D.INITIAL:if(F.resumeSuccessCallback){F.resumeSuccessCallback()}break;case D.OFFER_GOT:if(F.resumeSuccessCallback){F.resumeSuccessCallback()}break;case D.ANSWER_SENT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break;case D.ACK_GOT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break}break;case D.OFFER_SENT:switch(H){case D.OFFER_REJECT:case D.INITIAL:case D.OFFER_GOT:case D.ACK_GOT:F.resumeState=B.RESUME_STATE.waittingFinalResp;if(F.resumeSuccessCallback){F.resumeSuccessCallback()}break}break;case D.ANSWER_GOT:switch(H){case D.OFFER_REJECT:case D.INITIAL:case D.OFFER_GOT:case D.GLARE:case D.ACK_GOT:case D.ANSWER_SENT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break}break;case D.ACK_SENT:switch(H){case D.OFFER_GOT:if(F.resumeSuccessCallback){F.resumeSuccessCallback()}break;case D.ANSWER_SENT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break;case D.INITIAL:case D.OFFER_REJECT:case D.ACK_GOT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break}break;case D.OFFER_REJECTED:switch(H){case D.OFFER_REJECT:case D.INITIAL:case D.ACK_GOT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break;case D.OFFER_GOT:if(F.resumeSuccessCallback){F.resumeSuccessCallback()}break;case D.ANSWER_SENT:F.resumeState=B.RESUME_STATE.reStartingCall;F.start(I);break}break}},onMessage:function(e){if(e.isRequest()){d.doRequest(this,e)}else{if(e.isResponse()){d.doResponse(this,e)}else{if(e.isMessage()){d.doMessage(this,e)}else{if(e.isACK()){d.doACK(this,e)}else{if(e.isError()){d.doError(this,e)}}}}}}};var w=function(D,e,E){this.state=D;this.status={code:e,reason:E}};w.prototype={isFinalState:function(){var e=false;if(this.state===B.CALLSTATE.ENDED||this.state===B.CALLSTATE.ERROR||this.state===B.CALLSTATE.FAILED){e=true}return e},is180Ringing:function(){if(this.status&&this.state===B.CALLSTATE.RESPONDED&&this.status.code==180){return true}else{return false}},hasEstablished:function(){if(this.state===B.CALLSTATE.ESTABLISHED||this.state===B.CALLSTATE.UPDATE_FAILED||this.state===B.CALLSTATE.UPDATED||this.state===B.CALLSTATE.UPDATING){return true}else{return false}}};d.doRequest=function(O,F){var N=O.callState;var D=N.state;var H=N.status.code;var G=F.header.action;var L=O.session;var J=F.getExtHeaders();var K=F.control.correlation_id;if(K){O.lastServerCorrelationId=K}if(!j.checkSdp(O,F)){return}if(F.payload&&F.payload.sdp){g.debug("The SDP in the request is :\r\n"+F.payload.sdp)}switch(D){case B.CALLSTATE.NONE:switch(G){case B.ACTION.START:e();break;default:}break;case B.CALLSTATE.STARTED:switch(G){case B.ACTION.START:e();break;default:}break;case B.CALLSTATE.RESPONDED:switch(G){case B.ACTION.START:switch(H){case 180:e();break;case 183:M();break;case 200:break}break;default:}break;case B.CALLSTATE.ESTABLISHED:case B.CALLSTATE.UPDATED:case B.CALLSTATE.UPDATE_FAILED:switch(G){case B.ACTION.START:E();break;default:}break;case B.CALLSTATE.UPDATING:I();break;default:}function e(){g.debug("=== doStartCallRequest ===");var Q=F.header.initiator;var V=F.header.target;var X=F.control.subsession_id;var U=F.control.correlation_id;var S=F.payload.sdp;var P=u.getCallConfigFromRemoteSDP(S,false);var W=u.getCallConfigFromRemoteSDP(S,true);var R=O.getCallState();g.debug("=== doStartCallRequest 1 ===");O=O.packageHandler.prepareCall(L,P,Q,V);O.setCallState(B.CALLSTATE.STARTED,null,"receive call");O.subSessionId=X;O.startReqCorrId=U;O.newRemoteSDP=F.payload;O.newRemoteMedias=u.getMediaFromSDP(S);O.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_GOT,S);var U=F.control.correlation_id;if(U){O.lastServerCorrelationId=U}O.packageHandler.putCall(X,O);if(!R.is180Ringing()){j.send180Ringing(O)}var Y=O.packageHandler.onIncomingCall;if(Y){try{Y(O,W,J)}catch(T){g.error("The callback function 'call.onIncomingCall()' encountered the following exception: "+T)}}}function E(){g.debug("=== doUpdateCallRequest ===");var P=F.payload.sdp;var Q=u.getCallConfigFromRemoteSDP(P);O.lastCallConfig=O.callConfig;O.callConfig=Q;O.callConfig.dataChannelConfig=O.lastCallConfig.dataChannelConfig;O.newRemoteMedias=u.getMediaFromSDP(P);O.newRemoteSDP=F.payload;O.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_GOT,P);j.handleUpdateCallRequest(O,J)}function I(){g.debug("=== doUpdateCallGlared ===");var Q=j.createError(O),P=491;Q.header.action=B.ACTION.START;Q.header.error_code=P;Q.header.reason="Glare";O.session.sendMessage(Q)}function M(){g.debug("=== doUpdateCallReqInEarlyPhase ===");E();O.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_GOT)}};d.doResponse=function(P,G){var O=P.callState;var E=O.state;var I=G.header.action;var H=G.header.response_code;var L=P.session;if(H=="200"){if(!j.checkSdp(P,G)){return}}if(G.payload&&G.payload.sdp){g.debug("The SDP in the response is :\r\n"+G.payload.sdp)}switch(E){case B.CALLSTATE.NONE:break;case B.CALLSTATE.STARTED:case B.CALLSTATE.RESPONDED:switch(I){case B.ACTION.START:switch(H){case 180:M();break;case 183:N();break;case 200:if(P.earlyMediaState){switch(P.earlyMediaState){case B.OFFER_ANSWER_STATE.ACK_SENT:case B.OFFER_ANSWER_STATE.ACK_GOT:J();break;case B.OFFER_ANSWER_STATE.OFFER_SENT:D();break;default:}}else{F()}break;default:}break;case B.ACTION.PRACK:K();break}break;case B.CALLSTATE.ESTABLISHED:case B.CALLSTATE.UPDATING:case B.CALLSTATE.UPDATED:case B.CALLSTATE.UPDATE_FAILED:switch(I){case B.ACTION.START:if(H==200){e()}break;default:}break;default:}function M(){g.debug("=== doStart180Response ===");P.setCallState(B.CALLSTATE.RESPONDED,180,"Ringing")}function N(){g.debug("=== doStart183Response ===");P.setCallState(B.CALLSTATE.RESPONDED,183,"Session Progress");var R=G.payload;if(R&&R.sdp){P.earlyMediaState=B.OFFER_ANSWER_STATE.INITIAL;R.type="answer";var Q=P.offerAnswerManager.getMasterState();if(Q===B.OFFER_ANSWER_STATE.OFFER_SENT){var S=function(){P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ANSWER_GOT,R.sdp);P.lastServerCorrelationId=G.control.correlation_id;j.sendPrack(P);P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT)};u.setRemoteDescription(P,new RTCSessionDescription(R),S,u.srdError(P))}else{}}else{P.lastServerCorrelationId=G.control.correlation_id;j.sendPrack(P)}}function J(){g.debug("=== doStart200RespInEarlyPahse ===");if(P.earlyMediaState===B.OFFER_ANSWER_STATE.ACK_SENT||P.earlyMediaState===B.OFFER_ANSWER_STATE.ACK_GOT){P.earlyMediaState=null;P.setCallState(B.CALLSTATE.RESPONDED,200,"got success response");var R=G.payload.sdp;var S=u.getCallConfigFromRemoteSDP(R);P.lastCallConfig=P.callConfig;P.callConfig=S;P.newRemoteMedias=u.getMediaFromSDP(R);P.newRemoteSDP=G.payload;u.createPcIfSessionIdChanged(P);var Q=G.payload;Q.type="offer";var U=new RTCSessionDescription(Q);u.setRemoteDescription(P,U,T,u.srdError(P));function T(){var W={mandatory:{OfferToReceiveAudio:P.callConfig.shouldReceiveAudio(),OfferToReceiveVideo:P.callConfig.shouldReceiveVideo()}};P.peerConnection.createAnswer(V,X,W);function V(ab){var aa=u.changeSdpByCallConfig(ab.sdp,P.callConfig);u.setLocalDescription(P,new RTCSessionDescription({type:"answer",sdp:aa}),Y,Z);function Y(){j.sendAnswerInComplete(P)}function Z(ac){g.warn("Set localDescription failed!");j.invokeCallError(P,wsc.ERRORCODE.PEERCONNECTION_ERROR,ac)}}function X(Y){g.error("Answer error:"+Y);j.invokeCallError(P,wsc.ERRORCODE.PEERCONNECTION_ERROR,Y)}}}else{}}function D(){g.debug("=== doUpdate200RespInEarlyPhase ===");j.handleAnswer(P,G.payload);P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ANSWER_GOT,G.payload.sdp);G.complete(L);P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT);j.checkResumeState(P)}function F(){g.debug("=== doStart200Response ===");if(P.extHeaders){delete P.extHeaders}j.handleAnswer(P,G.payload);P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ANSWER_GOT,G.payload.sdp);P.setCallState(B.CALLSTATE.RESPONDED,200,"got success response");G.complete(L);if(P.callState.state==B.CALLSTATE.UPDATING){P.setCallState(B.CALLSTATE.UPDATED,null,"sent complete")}else{P.setCallState(B.CALLSTATE.ESTABLISHED,null,"sent complete")}P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT);j.checkResumeState(P)}function e(){g.debug("=== doUpdate200Response ===");if(P.extHeaders){delete P.extHeaders}j.handleAnswer(P,G.payload);P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ANSWER_GOT,G.payload.sdp);G.complete(L);if(P.callState.state==B.CALLSTATE.UPDATING){P.setCallState(B.CALLSTATE.UPDATED,null,"sent complete")}else{P.setCallState(B.CALLSTATE.ESTABLISHED,null,"sent complete")}P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT);j.checkResumeState(P)}function K(){g.debug("=== doPrack200Response ===");P.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_SENT)}};d.doMessage=function(M,F){var L=M.callState;var e=L.state;var G=F.header.action;var J=M.session;switch(e){case B.CALLSTATE.NONE:break;case B.CALLSTATE.STARTED:switch(G){case B.ACTION.SHUTDOWN:D();break;default:}break;case B.CALLSTATE.RESPONDED:switch(G){case B.ACTION.SHUTDOWN:D();break;case B.ACTION.COMPLETE:K();break;default:}break;case B.CALLSTATE.ESTABLISHED:case B.CALLSTATE.UPDATED:case B.CALLSTATE.UPDATE_FAILED:switch(G){case B.ACTION.SHUTDOWN:H();break;case B.ACTION.COMPLETE:K();break;default:}break;case B.CALLSTATE.UPDATING:switch(G){case B.ACTION.SHUTDOWN:E();break;case B.ACTION.COMPLETE:I();break;default:}break;default:}function D(){g.debug("=== doCancelCallMessage ===");if(M.callee===J.userName){M.setCallState(B.CALLSTATE.ENDED,"","cancelled");M.end()}}function H(){g.debug("=== doShutdownMessage ===");M.setCallState(B.CALLSTATE.ENDED,"","shutdown");j.clearCall(M)}function E(){g.debug("=== doUpdateShutdownMessage ===");var N=F.header.initiator;if(N===j.REINVITE_CANCEL_BY_SERVER){M.setCallState(B.CALLSTATE.UPDATE_FAILED,null,"re-invite canceled by server");M.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECT)}else{H()}}function K(){g.debug("=== doCompleteMessage ===");M.setCallState(B.CALLSTATE.ESTABLISHED,null,"got complete");M.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_GOT)}function I(){g.debug("=== doUpdateComplete ===");M.setCallState(B.CALLSTATE.UPDATED,null,"got complete");M.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.ACK_GOT)}};d.doError=function(R,H){var Q=R.callState;var G=Q.state;var O=H.header.action;var I=H.header.error_code;var P=H.header.reason;var E=R.session;switch(O){case B.ACTION.START:switch(I){case B.ERRORCODE.DECLINED:case B.ERRORCODE.BUSY_HERE:case B.ERRORCODE.BUSY_EVERYWHERE:if(Q.hasEstablished()){if(G==B.CALLSTATE.ESTABLISHED){L()}else{U()}}else{K()}break;case 487:if(Q.hasEstablished()){if(G==B.CALLSTATE.ESTABLISHED){S()}else{e()}}else{N()}break;case 401:case 407:F();break;case 491:if(Q.hasEstablished()){if(G==B.CALLSTATE.ESTABLISHED){T()}else{J()}}else{M()}break;default:D()}break;default:D()}function U(){g.debug("=== doUpdateCallRejected ===");R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED);R.setCallState(B.CALLSTATE.UPDATE_FAILED,I,P);j.rollbackUpdate(R);j.checkResumeState(R)}function L(){g.debug("=== doCandidateUpdateRejected ===");R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED);j.rollbackUpdate(R);j.checkResumeState(R)}function K(){g.debug("=== doStartCallRejected ===");j.clearCall(R);R.setCallState(B.CALLSTATE.FAILED,I,P);R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED)}function J(){g.debug("=== doUpdateCallGlared ===");U()}function T(){g.debug("=== doCandidateUpdateGlared ===");L()}function M(){g.debug("=== doStartCallGlared ===");j.clearCall(R);R.setCallState(B.CALLSTATE.FAILED,I,P);R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED)}function e(){g.debug("=== doUpdateCallTerminated ===");R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED);R.setCallState(B.CALLSTATE.UPDATE_FAILED,I,P);j.rollbackUpdate(R)}function S(){g.debug("=== doCandidateUpdateTerminated ===");R.offerAnswerManager.updateState(B.OFFER_ANSWER_STATE.OFFER_REJECTED);j.rollbackUpdate(R)}function N(){g.debug("=== doStartCallTerminated ===");j.clearCall(R);R.setCallState(B.CALLSTATE.ENDED,I,P)}function F(){g.debug("=== unauthorized ===");var X=new s.ErrorInfo(I,P);var aa=null;var Z=true;var V=0;var W=R.session.authHandler;if(W&&W.refresh){while(Z&&V<3){V++;try{var ac=H.header.authenticate;var Y=W.refresh(s.AUTHTYPE.SERVICE,ac);if(s.checkAuthInfo(s.AUTHTYPE.SERVICE,Y)){R.authInfo=Y;j.sendOfferImpl(R);Z=false}else{if(Y==false||Y==null){aa="No correct information was returned from the callback function 'AuthHandler.refresh()', or the user canceled the operation.";break}else{aa="No correct information was returned from the callback function 'AuthHandler.refresh()'. Please try again.";g.warn(aa)}}}catch(ab){g.error("Handle unauthenticated message error: "+ab);Z=true}}}else{aa="No AuthHuandler object created for this Session, or this AuthHandler has no callback function 'AuthHandler.refresh()'."}if(Z==true){if(aa){P=P+";"+aa}g.warn("Start call failed with the following error: "+P);j.invokeCallError(R,I,P);R.end()}}function D(){g.debug("=== unknownError ===");H.ack(E);errorObj=new s.ErrorInfo(I,P);if(E.sessionState===B.SESSIONSTATE.CONNECTED){if(R.callState.state!==B.CALLSTATE.NONE){if(!R.callState.hasEstablished()){j.clearCall(R);R.setCallState(B.CALLSTATE.FAILED,I,P)}else{if(R.onCallError){try{R.onCallError(errorObj)}catch(V){g.error("The callback function 'Call.onCallError()' encountered the following exception: "+V)}}}}}else{try{E.failureCallback(errorObj)}catch(V){g.error("Session.failureCallback callback function encountered the following exception: "+V)}}}};B.SESSIONSTATE={NONE:"NONE",CONNECTED:"CONNECTED",RECONNECTING:"RECONNECTING",RELOADING:"RELOADING",FAILED:"FAILED",CLOSED:"CLOSED"};B.CALLSTATE={NONE:"NONE",STARTED:"STARTED",RESPONDED:"RESPONDED",ESTABLISHED:"ESTABLISHED",UPDATING:"UPDATING",UPDATE_FAILED:"UPDATE_FAILED",UPDATED:"UPDATED",FAILED:"FAILED",ERROR:"ERROR",ENDED:"ENDED"};B.MEDIASTREAMEVENT={LOCAL_STREAM_ADDED:"LOCAL_STREAM_ADDED",LOCAL_STREAM_REMOVED:"LOCAL_STREAM_REMOVED",LOCAL_STREAM_ERROR:"LOCAL_STREAM_ERROR",REMOTE_STREAM_ADDED:"REMOTE_STREAM_ADDED",REMOTE_STREAM_REMOVED:"REMOTE_STREAM_REMOVED",REMOTE_STREAM_ERROR:"REMOTE_STREAM_ERROR"};B.MEDIADIRECTION={SENDONLY:"SENDONLY",RECVONLY:"RECVONLY",SENDRECV:"SENDRECV",NONE:"NONE"};B.ERRORCODE={UNAUTHORIZED:401,FORBIDDEN:403,RESOURCE_UNAVAILABLE:404,PROXYAUTH_REQUIRED:407,TEMPORARILY_UNAVAILABLE:480,BUSY_HERE:486,REQUEST_TERMINATED:487,SYSTEM_ERROR:500,BUSY_EVERYWHERE:600,DECLINED:603,WEBSOCKET_ERROR:1001,PEERCONNECTION_ERROR:1101,MEDIA_ERROR:1201,RESTORE_FAILED:1301,SAVE_FAILED:1302};B.PROTOCOLWORDS={EXTENDHEADER:"extendheader",PACKAGETYPE:"package_type"};B.PACKAGE={ALL:"all",REGISTER:"register",CONNECT:"connect",CALL:"call",PRESENCE:"presence",MESSAGE_NOTIFICATION:"message_notification",DATA_TRANSFER:"data_transfer",AUTHENTICATE:"authenticate"};B.CONSTCS={SERVER:"s",CLIENT:"c"};B.RESUME_STATE={waittingFinalResp:"waittingFinalResp",reStartingCall:"reStartingCall"};B.OFFER_ANSWER_STATE={INITIAL:"Initial state",OFFER_SENT:"Offer sent",OFFER_GOT:"Offer received",OFFER_REJECTED:"My offer was rejected by the other peer",OFFER_REJECT:"I Rejected the other peer's offer",ANSWER_SENT:"Answer sent",ANSWER_GOT:"Answer received",ACK_SENT:"Ack sent",ACK_GOT:"Ack received",GLARE:"Glare state"};B.TYPE={REQUEST:"request",ACK:"acknowledgement",RESPONSE:"response",MESSAGE:"message",ERROR:"error"};B.ACTION={CONNECT:"connect",START:"start",SHUTDOWN:"shutdown",COMPLETE:"complete",NOTIFY:"notify"};B.MESSAGESTATE={INITIAL:"initial",SUBSEQUENT:"subsequent",FINAL:"final"};B.ICE_CHECK_PERIOD=2000;s.Message=function(e){this.control=new function(){this.type=undefined;this.package_type=undefined;this.session_id=undefined;this.subsession_id=undefined;this.sequence=undefined;this.message_state=undefined;this.correlation_id=undefined;this.ack_sequence=undefined;this.version=undefined};this.header=new function(){this.action=undefined;this.initiator=undefined;this.target=undefined;this.error_code=undefined};this.payload=new function(){};if(e){for(var D in e){this[D]=e[D]}}};s.Message.systemHeaders={action:"action",initiator:"initiator",target:"target",cslr:"cslr",cslw:"cslw",csuw:"csuw",sslr:"sslr",error_code:"error_code",response_code:"response_code",reason:"reason"};s.Message.prototype={isRequest:function(){var e=this.control.type;if(e===B.TYPE.REQUEST){return true}else{return false}},isResponse:function(){var e=this.control.type;if(e===B.TYPE.RESPONSE){return true}else{return false}},isError:function(){var e=this.control.type;if(e===B.TYPE.ERROR){return true}else{return false}},isMessage:function(){var e=this.control.type;if(e===B.TYPE.MESSAGE){return true}else{return false}},isACK:function(){var e=this.control.type;if(e===B.TYPE.ACK){return true}else{return false}},isReconnect:function(){var e=this.control.package_type,D=this.control.session_id;if(e==B.PACKAGE.REGISTER&&D){return true}return false},ack:function(e){var D=new s.Message();D.control.session_id=this.control.session_id;D.control.subsession_id=this.control.subsession_id;D.control.type=B.TYPE.ACK;D.control.package_type=this.control.package_type;D.control.sequence=this.control.sequence;e.sendMessage(D)},complete:function(e){var D=new s.Message();D.control.session_id=this.control.session_id;D.control.subsession_id=this.control.subsession_id;D.control.correlation_id=this.control.correlation_id;D.control.type=B.TYPE.MESSAGE;D.control.package_type=this.control.package_type;D.header.action=B.ACTION.COMPLETE;e.sendMessage(D)},addExtHeaders:function(F){for(var E in F){var D;var e=F[E];if(this.header[E]){continue}else{this.header[E]=e}}},getExtHeaders:function(){var e;if(this.header){for(var D in this.header){if(s.Message.systemHeaders[D]){continue}if(!e){e={}}e[D]=this.header[D]}}return e}};s.ErrorInfo=function(e,D){this.code=e;this.reason=D};u.collectHostIPsByPc=function(O,H){var M=null;try{var F={iceServers:[]};M=new z(F);M.onicecandidate=D;var K={mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:false}};M.createOffer(N,I,K)}catch(L){g.error("Got exception when trying to get host IPs: "+L);var G=[];E(G)}function D(Q){if(Q.candidate){}else{if(M&&M.localDescription){var e=M.localDescription.sdp;var P=J(e);E(P)}else{H()}}}function N(Q){if(y.isFirefox){var e=Q.sdp;var P=J(e);E(P)}else{M.setLocalDescription(Q)}}function I(e){g.error("Create offer error while collect Host IP, "+e);var P=[];E(P)}function E(e){if(e.length>0){if(O){O(e)}}else{H()}M.close();M=null}function J(e){var R=[],T=e.split("\r\n");for(var Q=0;Q<T.length;Q++){var S=T[Q],V=null;if(S.match(/^c=/i)){var U=S.split(/\s+/);V=U[2]}else{if(S.match(/^a=candidate:.*typ host/i)){var P=S.split(/\s+/);V=P[4]}}if(V&&(R.indexOf(V)==-1)){R.push(V)}}return R}};u.addCandidatesFromSdp=function(D,E){var I=u.getMediaFromSDP(E),e=[],K={},J=I.length,H,G=0,F=0;for(G=0;G<J;G++){e=I[G].candidates;H=e.length;for(F=0;F<H;F++){K=new RTCIceCandidate({sdpMLineIndex:G,candidate:e[F]});D.addIceCandidate(K)}}};u.createPeerConnection=function(P,O){var H,G=null,N=true;try{var L=P.session.authHandler,J=0;if(L&&L.refresh){while(N&&J<3){J++;try{G=L.refresh(s.AUTHTYPE.TURN);if(s.checkAuthInfo(s.AUTHTYPE.TURN,G)){break}else{if(G==false){warnMsg="No correct information was returned from the callback function 'AuthHandler.refresh()', or the user canceled the operation.";N=false;break}else{warnMsg="No correct information was return from the callback function 'AuthHandler.refresh()'. Please try again.";g.warn(warnMsg)}}}catch(K){g.error("Handle unauthenticated message error: "+K);N=false}}}else{g.warn("No AuthHandler object created for this Session, or this AuthHandler does not have the callback function 'AuthHandler.refresh()'.");N=false}if(N==false){G=null}if(!G){G={iceServers:[]}}var M={optional:[]};H=new z(G,M);var I=function(e){g.info("Session connecting.")};var D=function(e){g.info("Session opened.")};var F=function(e){g.info("Remote stream removed.");P.fireMediaStreamEvent(B.MEDIASTREAMEVENT.REMOTE_STREAM_REMOVED,e.stream)};var E=function(e){g.info("Remote stream added.");P.fireMediaStreamEvent(B.MEDIASTREAMEVENT.REMOTE_STREAM_ADDED,e.stream);H.___wsc_onaddstream_called=true};H.onremovestream=F;H.onaddstream=E;H.onconnecting=I;H.onopen=D;P.peerConnection=H;if(O){u.addLocalStreams(P,O)}else{u.addLocalStream(P)}H.onstatechange=function(e){g.debug("iceConnectionState : "+e.currentTarget.iceConnectionState+"\niceGatheringState : "+e.currentTarget.iceGatheringState+"\n")}}catch(K){j.invokeCallError(P,wsc.ERRORCODE.PEERCONNECTION_ERROR,K);g.error("Create peer connection: "+K)}};u.createPcIfSessionIdChanged=function(E){if(E.peerConnection){var e=u.getLocalStreams(E.peerConnection);E.pcAddedStreams=e;if(e){for(var D=0;D<e.length;D++){var F=e[D];u.removeLocalStream(E,F)}}E.peerConnection.close();E.peerConnection=null}u.createPeerConnection(E)};u.clearPeerConnection=function(F){var e=F.peerConnection;if(e){var D=u.getLocalStreams(e),G=u.getRemoteStreams(e);if(D){for(var E=0;E<D.length;E++){var H=D[E];u.removeLocalStream(F,H)}}if(G){for(var E=0;E<G.length;E++){if(!y.isFirefox){e.removeStream(G[E])}if(G[E]){}}}e.close();F.peerConnection=null}};u.setLocalDescription=function(F,G,H,E){var e=null;if((!F)||(!F.peerConnection)||(!G)){return}if(!H){H=function(){g.debug("Set localDescription succeed!")}}if(!E){e=function(I){g.warn("Set local description failed: ",I);j.invokeCallError(F,wsc.ERRORCODE.PEERCONNECTION_ERROR,I)}}else{e=function(I){E(I);j.invokeCallError(F,wsc.ERRORCODE.PEERCONNECTION_ERROR,I)}}var D=function(){g.debug("Set local description now.");var I=F.peerConnection.localDescription;g.debug("iceConnectionState/iceGatheringState is: "+F.peerConnection.iceConnectionState+"/"+F.peerConnection.iceGatheringState);F.peerConnection.setLocalDescription(G,H,e);F.peerConnection.__wscLastLocalSdp=I};D()};u.setRemoteDescription=function(E,e,F,D){if(!E||!E.peerConnection||!e){return}if(!F){F=function(){g.debug("Set remote description succeed!")}}if(!D){D=function(G){g.warn("Set remote description failed!",G);j.invokeCallError(E,wsc.ERRORCODE.PEERCONNECTION_ERROR,G)}}E.peerConnection.setRemoteDescription(e,F,D);if(y.isFirefox&&!E.peerConnection.___wsc_onaddstream_called){setTimeout(function(){if(E&&E.peerConnection&&!E.peerConnection.___wsc_onaddstream_called){var I=false;var H=u.getMediaFromSDP(e.sdp);for(var K=0;K<H.length;K++){var G=H[K];if(G.mode=="recvonly"){I=true;break}}if(I){if(E&&E.peerConnection){var M=E.peerConnection.getRemoteStreams();if(M){for(var K=0;K<M.length;K++){var L=M[K];var J=function(){if(E&&E.peerConnection){if(L.getAudioTracks().length>0||L.getVideoTracks().length>0){g.debug("Workaround for Firefox: stream ready, fire media stream manually now.");E.fireMediaStreamEvent(B.MEDIASTREAMEVENT.REMOTE_STREAM_ADDED,L)}else{g.debug("Workaround for Firefox: stream is not ready, wait 200ms...");setTimeout(function(){J()},200)}}};J()}E.peerConnection.___wsc_onaddstream_called=true}}}}},1000)}};u.removeLocalStream=function(e,D){if(!D){return}if(D.peerConnectionNum){D.peerConnectionNum--}g.debug("removeLocalStream, peerConnectionNum: "+D.peerConnectionNum);if(!y.isFirefox){e.peerConnection.removeStream(D)}e.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_REMOVED,D)};u.addLocalStream=function(I,J){var D=I.peerConnection;if(J){if(J.peerConnectionNum){J.peerConnectionNum++}else{J.peerConnectionNum=1}D.addStream(J);g.debug("addLocalStream, peerConnectionNum: "+J.peerConnectionNum);var e=true;var E=I.localMediaStreams;for(var F=0;F<E.length;F++){var H=E[F];if(H.id==J.id){e=false;break}}if(e){I.localMediaStreams.push(J)}if(!D.__wscIsAudioStreamAdded){D.__wscIsAudioStreamAdded=u.streamHasMediaTracks([J],"audio")}if(!D.__wscIsVideoStreamAdded){D.__wscIsVideoStreamAdded=u.streamHasMediaTracks([J],"video")}I.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ADDED,J)}else{for(var F=0;F<I.pcAddedStreams.length;F++){var G=I.pcAddedStreams[F];if(G.peerConnectionNum){G.peerConnectionNum++}else{G.peerConnectionNum=1}D.addStream(G);I.fireMediaStreamEvent(B.MEDIASTREAMEVENT.LOCAL_STREAM_ADDED,G);g.debug("addLocalStream, peerConnectionNum: "+G.peerConnectionNum)}if(!D.__wscIsAudioStreamAdded){D.__wscIsAudioStreamAdded=u.streamHasMediaTracks(I.localMediaStreams,"audio")}if(!D.__wscIsVideoStreamAdded){D.__wscIsVideoStreamAdded=u.streamHasMediaTracks(I.localMediaStreams,"video")}}g.debug("call local media streams length : "+I.localMediaStreams.length)};u.addLocalStreams=function(E,D){if(D){for(var e=0;e<D.length;e++){var F=D[e];u.addLocalStream(E,F)}}};u.UpdateRequest=function(e){this.isMediaChanged=false;this.sessionIdChanged=false;this.isCandidateUpdate=false};u.calculateMediaChange=function(D,H){var G=false;if(D.length<H.length){G=true}else{if(D.length>H.length){G=true}else{for(var F=0;F<H.length;F++){var e=H[F].type;for(var E=0;E<D.length;E++){if(D[E].type==e){if(!H[F].equals(D[E])){G=true;break}}}}}}return G};u.analyzeReinviteOffer=function(E,D){var e=new u.UpdateRequest();e.isMediaChanged=u.calculateMediaChange(E,D);if(!e.isMediaChanged){if(E.sessionId!==D.sessionId){e.sessionIdChanged=true}else{e.isCandidateUpdate=true}}return e};u.getMediaFromSDP=function(H){var Q=H.split("\r\n"),K=0,G="sendrecv",N=new Array(),M=Q.length,J,L,P,e,F,O,E,D,I;for(J=0;J<M;J++){L=Q[J].split("=");switch(L[0]){case"a":P=L[1];if(P=="sendonly"||P=="sendrecv"||P=="recvonly"||P=="inactive"){if(K==0){G=L[1]}else{N[K-1].mode=L[1]}}else{if(P.indexOf("candidate:")===0){N[K-1].candidates.push(Q[J])}}break;case"m":e=L[1];F=e.split(" ");O=F[0];E=F[1];D=new Media(O,G,E);N[K++]=D;break;case"o":P=L[1];I=P.split(" ")[1];N.sessionId=I;break}}return N};Media=function(D,E,e){this.type=D;this.mode=E;this.port=e;this.candidates=[];this.toJSON=function(){var F={type:this.type,mode:this.mode,port:this.port};return F};this.equals=function(F){if(this.port==0){this.mode="inactive"}if(F.port==0){F.mode="inactive"}if((this.type==F.type)&&(this.mode==F.mode)){return true}return false}};u.getCallConfigFromRemoteSDP=function(G,F){var e=B.MEDIADIRECTION.NONE;var D=B.MEDIADIRECTION.NONE;var E=null;var I=function(M,L){switch(M.toUpperCase()){case"SENDONLY":if(L){return B.MEDIADIRECTION.SENDONLY}else{return B.MEDIADIRECTION.RECVONLY}case"RECVONLY":if(L){return B.MEDIADIRECTION.RECVONLY}else{return B.MEDIADIRECTION.SENDONLY}case"SENDRECV":return B.MEDIADIRECTION.SENDRECV;case"INACTIVE":return B.MEDIADIRECTION.NONE}};if(G){var J=u.getMediaFromSDP(G);var K=null;for(var H=0;H<J.length;H++){if(J[H].type.toLowerCase()=="audio"){D=I(J[H].mode,F)}else{if(J[H].type.toLowerCase()=="video"){e=I(J[H].mode,F)}else{if(J[H].type.toLowerCase()=="application"){K=new Array()}}}}E=new h(D,e,K)}return E};u.streamHasMediaTracks=function(G,e){var E=false;if((G==null)||!((e=="audio")||(e=="video"))){return E}for(var D=0;D<G.length;D++){if(e=="audio"){var H=G[D].getAudioTracks();if((H!=null)&&(H.length>0)){E=true;break}}else{var F=G[D].getVideoTracks();if((F!=null)&&(F.length>0)){E=true;break}}}return E};u.changeSdpByCallConfig=function(I,F){var R="a=inactive",Q="m=video",M="m=audio",E="m=",H="",D="",e=-1,L=-1,K=-1,O=F.audioConfig,J=F.videoConfig;var G=new Array();G[0]="a=sendrecv";G[1]="a=recvonly";G[2]="a=sendonly";G[3]=R;var N=function(S){var T=R;switch(S){case B.MEDIADIRECTION.RECVONLY:T=G[1];break;case B.MEDIADIRECTION.SENDONLY:T=G[2];break;case B.MEDIADIRECTION.SENDRECV:T=G[0];break;case B.MEDIADIRECTION.NONE:T=G[3];break}return T};var P=function(X,S,V){if(X<=-1){return}var W="";K=I.indexOf(E,X+S.length);if(K>-1){mPart=I.substring(X,K);W=I.substring(K)}else{mPart=I.substring(X)}for(var T=0;T<G.length;T++){var U=mPart.indexOf(G[T]);if(U>=0){mPart=mPart.replace(G[T],V)}}I=I.substring(0,X)+mPart+W};L=I.indexOf(M);if(L>-1){P(L,M,N(O))}e=I.indexOf(Q);if(e>-1){P(e,Q,N(J))}return I};u.getLocalStreams=function(e){if(y.isFirefox){if(e.getLocalStreams){return e.getLocalStreams()}else{return e.localStreams}}else{if(y.isChrome){return e.getLocalStreams()}}};u.getRemoteStreams=function(e){if(y.isFirefox){if(e.getLocalStreams){return e.getRemoteStreams()}else{return e.RemoteStreams}}else{if(y.isChrome){return e.getRemoteStreams()}}};u.srdError=function(e){return function(D){g.warn("Error when set remote description: "+D);j.invokeCallError(e,wsc.ERRORCODE.PEERCONNECTION_ERROR,D)}};s.Map=function(){this.size=0;this.entry=new Object()};s.Map.prototype={put:function(e,D){if(!this.containsKey(e)){this.size=this.size+1}this.entry[e]=D},get:function(D){var e=null;if(this.containsKey(D)){e=this.entry[D]}return e},remove:function(e){if(this.containsKey(e)){if(delete this.entry[e]){this.size=this.size-1}}},containsKey:function(D){var e=false;if(D in this.entry){e=true}return e},containsValue:function(e){for(var D in this.entry){if(this.entry[D]==e){return true}}return false},values:function(){var e=new Array();for(var D in this.entry){e.push(this.entry[D])}return e},keys:function(){var e=new Array();for(var D in this.entry){e.push(D)}return e},size:function(){return this.size}};s.Queue=function(){var D=[];var e=0;this.toJSON=function(){var E={array:D,offset:e};return E};this.length=function(){return(D.length-e)};this.enqueue=function(E){D.push(E)};this.dequeue=function(){if(D.length==0){return null}var E=D[e];if(++e*2>=D.length){D=D.slice(e);e=0}return E};this.peek=function(){if(D.length>0){return D[e]}else{return null}}};s.extend=function(G,D){var E=function(){};E.prototype=D.prototype;var e=G.prototype;G.prototype=new E();if(e){s.deepCopy(e,G.prototype)}G.prototype.constructor=G;G.superclass=D.prototype;if(G.superclass){G.superclass.constructor=D}};s.deepCopy=function(D,E){E=E||{};for(var e in D){if(typeof D[e]==="object"){E[e]=(D[e].constructor===Array)?[]:{};s.deepCopy(D[e],E[e])}else{E[e]=D[e]}}return E};s.setLogger=function(e){t=e;s.initAspectConfig()};s.getLogger=function(){return g};s.setLogLevel=function(e){c=e};s.AuthHandler=function(e){this.session=e;e.authHandler=this;this.refresh;this.toJSON=function(){var D={};var F={session:""};for(var E in this){if(E in F){continue}else{D[E]=this[E]}}return D}};s.AUTHTYPE={SERVICE:"SERVICE",TURN:"TURN"};s.checkAuthInfo=function(D,e){var E=false;if(D==s.AUTHTYPE.SERVICE){if(!e){return false}E=true}else{if(D==s.AUTHTYPE.TURN){if(!e){return true}if(e.iceServers!=undefined){E=true}}}return E};s.calcHa1=function(E,G){var D="";var F=function(H){g.warn("MD5 algorithm is not implemented now.");return"MD5NotSupported"};if(!G.algorithm||G.algorithm.toLowerCase()=="md5"){var e=E.username+":"+G.realm+":"+E.password;D=F(e);e=""}else{}return D};var k=function(){};k.prototype={};s.printTimeStr=function(E){var e=new Date(),D;if(E){D=e.getDateStr(E)}else{D=e.getDateStr()}return D+" "};Date.prototype.getDateStr=function(E){var D={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};if(!E){E="yyyy-MM-dd hh:mm:ss"}if(/(y+)/.test(E)){E=E.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var e in D){if(new RegExp("("+e+")").test(E)){E=E.replace(RegExp.$1,RegExp.$1.length==1?D[e]:("00"+D[e]).substr((""+D[e]).length))}}return E};s.waveFunc=function(e,E){if(E){if(E.prototype){var H=function(){};H.prototype=E.prototype;var D=e.prototype;e.prototype=new H();if(D){s.deepCopy(D,e.prototype)}e.prototype.constructor=e}if(E.prototype){e.superclass=E.prototype;e.superclass.constructor=E}else{for(var G in E){if((typeof E==="object")&&(G!="error")&&(G!="warn")&&(G!="log")&&(G!="info")&&(G!="debug")){e[G]=function(F){return function(){E[F](arguments[0])}}(G)}else{e[G]=E[G]}}e.superclass=E;e.prototype=undefined}}};s.AspectConfig={};s.getCaller_line=function(){var D=null;try{D=(new Error()).stack.split("\n")[4];if(D.indexOf("Error")>=0){D=null}}catch(E){}return D};s.isDebugEnabled=function(){var D=false;if(c===B.LOGLEVEL.DEBUG){D=true}if(D&&t){var e=s.getCaller_line();if(e){e="Debug line:"+e}else{e="Debug:"}if(e.indexOf("tmpProxyClass")>0){return true}t.debug(s.printTimeStr()+"[wsc "+e+"]")}return D};s.isInfoEnabled=function(){var e=false;if(c<=B.LOGLEVEL.INFO){e=true}if(e&&t){t.info(s.printTimeStr()+"[wsc Info]:")}return e};s.isWarnEnabled=function(){var D=false;if(c<=B.LOGLEVEL.WARN){D=true}if(D&&t){var e=s.getCaller_line();if(e){e="Warn line:"+e}else{e="Warn:"}if(e.indexOf("tmpProxyClass")>0){return true}t.warn(s.printTimeStr()+"[wsc "+e+"]")}return D};s.isErrorEnabled=function(){var D=false;if(c<=B.LOGLEVEL.ERROR){D=true}if(D&&t){var e=null;e=s.getCaller_line();if(e){e="Error line:"+e}else{e="Error:"}if(e.indexOf("tmpProxyClass")>0){return true}t.error(s.printTimeStr()+"[wsc "+e+"]")}return D};s.AspectConfig.aspectClassMap=new s.Map();B.WAVETYPE={BEFORE:"before",AFTER:"after",AFTERRETURN:"afterReturn",AFTERTHROW:"afterThrow"};s.AspectConfig.wavePointcut=function(J,I,e,L){var D=s.AspectConfig.aspectClassMap.get(J),F,E;if(D==null){D=function(){if(D.superclass&&D.superclass.prototype){D.superclass.constructor.apply(this,arguments)}};s.waveFunc(D,J);E=D}else{F=function(){if(F.superclass&&F.superclass.prototype){F.superclass.constructor.apply(this,arguments)}};s.waveFunc(F,D);E=F}var G=I.indexOf("*"),M,H=false;if(G>=0){if(G>0){M=new RegExp("^"+I.substr(0,G))}else{M=new RegExp(I.substr(1)+"$")}}if(J.prototype){if(J.prototype[I]){switch(L){case B.WAVETYPE.BEFORE:E.prototype[I]=function(){var N=false,O=null;try{N=e(arguments)}catch(P){throw P}if(N){O=E.superclass[I].apply(this,arguments);if((O!=null)&&(O!=undefined)){return O}}};break;case B.WAVETYPE.AFTER:E.prototype[I]=function(){var N=null;try{N=E.superclass[I].apply(this,arguments)}catch(O){t.error(I+" exception:"+O);throw O}e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERRETURN:E.prototype[I]=function(){var N=null;N=E.superclass[I].apply(this,arguments);e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERTHROW:E.prototype[I]=function(){var N=null;try{N=E.superclass[I].apply(this,arguments);if((N!=null)&&(N!=undefined)){return N}}catch(O){e(I,O)}};break}H=true}else{if(G>=0){for(var K in J.prototype){if(M.test(K)){switch(L){case B.WAVETYPE.BEFORE:E.prototype[K]=function(){var N=false,O=null;try{N=e(arguments)}catch(P){throw P}if(N){O=E.superclass[K].apply(this,arguments);if((O!=null)&&(O!=undefined)){return O}}};break;case B.WAVETYPE.AFTER:E.prototype[K]=function(){var N=null;try{N=E.superclass[K].apply(this,arguments)}catch(O){t.error(K+" exception:"+O);throw O}e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERRETURN:E.prototype[K]=function(){var N=null;N=E.superclass[K].apply(this,arguments);e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERTHROW:E.prototype[K]=function(){var N=null;try{N=E.superclass[K].apply(this,arguments);if((N!=null)&&(N!=undefined)){return N}}catch(O){e(K,O)}};break}H=true}}}}}else{if(J[I]){switch(L){case B.WAVETYPE.BEFORE:E[I]=function(){var O=null;var N=e(arguments);if(N){var P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){O=E.superclass[I].apply(P,arguments)}else{O=J[I].apply(J,arguments)}if((O!=null)&&(O!=undefined)){return O}}};break;case B.WAVETYPE.AFTER:E[I]=function(){var N=null;try{var P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){N=E.superclass[I].apply(P,arguments)}else{N=J[I].apply(J,arguments)}}catch(O){t.error(I+" exception:"+O)}e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERRETURN:E[I]=function(){var N=null,O=E.superclass;while(O.superclass){O=O.superclass}if(E.superclass[I]){N=E.superclass[I].apply(O,arguments)}else{N=J[I].apply(J,arguments)}e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERTHROW:E[I]=function(){var N=null;try{var P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){N=E.superclass[I].apply(P,arguments)}else{N=J[I].apply(J,arguments)}if((N!=null)&&(N!=undefined)){return N}}catch(O){e(I,O)}};break}H=true}else{if(G>=0){for(var K in J){if(M.test(K)){switch(L){case B.WAVETYPE.BEFORE:E[K]=function(){var O=null;var N=e(arguments);if(N){var P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){O=E.superclass[I].apply(P,arguments)}else{O=J[I].apply(J,arguments)}if((O!=null)&&(O!=undefined)){return O}}};break;case B.WAVETYPE.AFTER:E[K]=function(){try{var N=null,P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){N=E.superclass[I].apply(P,arguments)}else{N=J[I].apply(J,arguments)}if((N!=null)&&(N!=undefined)){return N}}catch(O){t.error(K+" exception:"+O)}e(arguments);return N};break;case B.WAVETYPE.AFTERRETURN:E[K]=function(){var N=null,O=E.superclass;while(O.superclass){O=O.superclass}if(E.superclass[I]){N=E.superclass[I].apply(O,arguments)}else{N=J[I].apply(J,arguments)}e(arguments);if((N!=null)&&(N!=undefined)){return N}};break;case B.WAVETYPE.AFTERTHROW:E[K]=function(){var N=null;try{var P=E.superclass;while(P.superclass){P=P.superclass}if(E.superclass[I]){N=E.superclass[I].apply(P,arguments)}else{N=J[I].apply(J,arguments)}if((N!=null)&&(N!=undefined)){return N}}catch(O){e(K,O)}};break}H=true}}}}}if(H){s.AspectConfig.aspectClassMap.put(J,E)}};s.AspectConfig.before=function(e,E,D){s.AspectConfig.wavePointcut(e,E,D,B.WAVETYPE.BEFORE)};s.AspectConfig.after=function(e,E,D){s.AspectConfig.wavePointcut(e,E,D,B.WAVETYPE.AFTER)};s.AspectConfig.afterReturn=function(e,E,D){s.AspectConfig.wavePointcut(e,E,D,B.WAVETYPE.AFTERRETURN)};s.AspectConfig.afterThrow=function(e,E,D){s.AspectConfig.wavePointcut(e,E,D,B.WAVETYPE.AFTERTHROW)};s.AspectConfig.getWavedObject=function(D){var e=s.AspectConfig.aspectClassMap.get(D),E=null;if(!e){e=D}E=new e();return E};s.AspectConfig.getWavedClass=function(D){var e=s.AspectConfig.aspectClassMap.get(D);if(!e){e=D}return e};s.initAspectConfig=function(){if(!t){t=new function(){};g=t}else{s.AspectConfig.before(t,"info",s.isInfoEnabled);s.AspectConfig.before(t,"debug",s.isDebugEnabled);s.AspectConfig.before(t,"warn",s.isWarnEnabled);s.AspectConfig.before(t,"error",s.isErrorEnabled);s.AspectConfig.before(t,"log",s.isInfoEnabled);g=s.AspectConfig.getWavedClass(t)}if(!g.info){g.info=function(){};t.info=function(){}}if(!g.debug){g.debug=function(){};t.debug=function(){}}if(!g.warn){g.warn=function(){};t.warn=function(){}}if(!g.error){g.error=function(){};t.error=function(){}}if(!g.log){g.log=function(){};t.log=function(){}}};s.initAspectConfig();return{Session:o,ExtensibleSession:o,CallConfig:h,Call:b,MEDIADIRECTION:B.MEDIADIRECTION,SESSIONSTATE:B.SESSIONSTATE,CALLSTATE:B.CALLSTATE,MEDIASTREAMEVENT:B.MEDIASTREAMEVENT,ERRORCODE:B.ERRORCODE,MessageAlertPackage:f,CallPackage:a,setLogLevel:s.setLogLevel,setLogger:s.setLogger,getLogger:s.getLogger,LOGLEVEL:B.LOGLEVEL,extend:s.extend,Message:s.Message,MSSAGETYPE:B.TYPE,ACTION:B.ACTION,Map:s.Map,ErrorInfo:s.ErrorInfo,AuthHandler:s.AuthHandler,AUTHTYPE:s.AUTHTYPE}})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);


wsc.setLogger(console);
wsc.setLogLevel(wsc.LOGLEVEL.DEBUG);

/**==========================================
 *  chameleon Object literal initialization
   ========================================== */

var chameleon = {
    configuration : null,
    signallingStateId : 0,
    signallingState: "None",
    signallingError : null,
    wscSessionObj : {},
    handlers : {},
    calls : {
        active : [],
        incoming : [],
        outgoing: [],
        all : []
    }
};

// set up a basic logger
chameleon.log = function(logMessage) {
    var now = new Date(),
        timestamp = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    if (typeof(logMessage) == 'string') console.log("%c" + timestamp + " [chameleon log] " + logMessage, 'background: #222; color: #82FA58' );
    else if (typeof(logMessage) == 'object') console.log("%c" + timestamp + " [chameleon log] ", 'background: #222; color: #82FA58', logMessage);
};



/**==========================================
 *  
 * 
 * 
 * 
 * 
 * chameleon Object Properties
 *  and Property Getters
 * 
 * 
 * 
 * 
 * 
   ========================================== */

// set up an accessor to play ringtones
Object.defineProperty(chameleon, 'isIncomingCall', {
    get : function() {
        return this._currentIncoming;
    },
    set : function(state) {
        if(this.configuration.ringtoneId && state === true) {
            chameleon.log("starting ringtone plaback of " + this.configuration.ringtoneId + " because state is " + state);
            chameleon.log("setting isIncomingCall to true");
            document.getElementById(this.configuration.ringtoneId).play();
        }
        if(this.configuration.ringtoneId && state === false) {
            chameleon.log("stopping ringtone plaback of " + this.configuration.ringtoneId);
            chameleon.log("setting isIncomingCall to false");
            document.getElementById(this.configuration.ringtoneId).pause();
            document.getElementById(this.configuration.ringtoneId).currentTime = 0;
        }
        this._currentIncoming = state;
    },
    _currentIncoming : false
});

// set up an accessor to play ringtones
Object.defineProperty(chameleon, 'isOutgoingCall', {
    get : function() {
        return this._currentOutgoing;
    },
    set : function(state) {
        if(this.configuration.ringbackId !== null && state === true) {
            chameleon.log("starting ringback plaback of " + this.configuration.ringbackId);
            chameleon.log("setting isOutgoingCall to true");
            document.getElementById(this.configuration.ringbackId).play();
        }
        if(this.configuration.ringbackId !== null && state === false) {
            chameleon.log("setting isOutgoingCall to false");
            chameleon.log("stopping ringback playback of " + this.configuration.ringbackId);
            document.getElementById(this.configuration.ringbackId).pause();
            document.getElementById(this.configuration.ringbackId).currentTime = 0;
        }
        this._currentOutgoing = state;
    },
    _currentOutgoing : false
});

// set up an accessor for signalling state
Object.defineProperty(chameleon, 'signallingState', {
    get : function () {
        if (!chameleon.wscSessionObj.sessionState || chameleon.wscSessionObj.sessionState === null) {
            if (chameleon.signallingStateId === 0) return "Not Activated";
            else return "Deactivated";
        }
        if (chameleon.wscSessionObj.sessionState == "NONE" && chameleon.signallingStateId === 3) return "Connecting...";
        return chameleon.wscSessionObj.sessionState;
    }
});

// shortcut to see if there is an active call
Object.defineProperty(chameleon, 'isActiveCall', {
    get: function() {
        if (chameleon.calls.active.length > 0 ) return true;
        else return false;
    }
});

// shortcut the newest, most recent active call state
Object.defineProperty(chameleon, 'activeCallState', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].callState.state;
        else return "none";
    }
});

// shortcut the newest, most recent active call direction
Object.defineProperty(chameleon, 'activeCallDirection', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].direction;
        else return "none";
    }
});

// shortcut the newest, most recent active callee
Object.defineProperty(chameleon, 'activeCallee', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].callee;
        else return "none";
    }
});

// shortcut the newest, most recent active callee
Object.defineProperty(chameleon, 'activeCaller', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].caller;
        else return "none";
    }
});

// shortcut the newest, most recent incoming caller
Object.defineProperty(chameleon, 'incomingCaller', {
    get: function() {
        if (chameleon.calls.incoming.length > 0) return chameleon.calls.incoming[chameleon.calls.incoming.length - 1].caller;
        else return "none";
    }
});


// shortcut the newest, most recent incoming callee
Object.defineProperty(chameleon, 'incomingCallee', {
    get: function() {
        if (chameleon.calls.incoming.length > 0) return chameleon.calls.incoming[chameleon.calls.incoming.length - 1].callee;
        else return "none";
    }
});

// shortcut the newest, most recent outgoing caller
Object.defineProperty(chameleon, 'outgoingCaller', {
    get: function() {
        if (chameleon.calls.outgoing.length > 0) return chameleon.calls.outgoing[chameleon.calls.outgoing.length - 1].caller;
        else return "none";
    }
});


// shortcut the newest, most recent outgoing callee
Object.defineProperty(chameleon, 'outgoingCallee', {
    get: function() {
        if (chameleon.calls.outgoing.length > 0) return chameleon.calls.outgoing[chameleon.calls.outgoing.length - 1].callee;
        else return "none";
    }
});

// shortcut for the Active call video state
Object.defineProperty(chameleon, 'activeCallVideo', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].getCallConfig().videoConfig;
        else return "none";
    }
});

// shortcut for the Active call video state
Object.defineProperty(chameleon, 'activeCallAudio', {
    get: function() {
        if (chameleon.calls.active.length > 0) return chameleon.calls.active[chameleon.calls.active.length - 1].getCallConfig().audioConfig;
        else return "none";
    }
});



/**==========================================
 *  
 * 
 * 
 * 
 * 
 *        chameleon Object Methods
 * 
 * 
 * 
 * 
 * 
   ========================================== */
   
/**==================Initialize================ 


This takes in a configuration object, and starts 
a session with a WSC. It will attempt to register
a SIP user, and set up event handlers for calls,
session state changes, etc. 

   ========================================== */

chameleon.bootstrap = function(configuration, $scope) {
    
    var self = this;
    chameleon.log(self);
    if (!configuration) {
        chameleon.log("Error...need to pass a configuration object.");
        return;
    }
    
// do some checking to see that we have good configuration
    if (typeof(configuration.sipUser) == 'undefined' || typeof(configuration.wscUri) == 'undefined' ) {
        chameleon.log("Init Error: Improper configuration obj provided. " + configuration);
        return;
    }
    
    chameleon.configuration = configuration;
    chameleon.$scope = $scope;
// Add a method to the scope to safely apply model updates
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
            fn();
        }
        } else {
            this.$apply(fn);
        }
    };
    
    chameleon.updateAngular = function() { $scope.safeApply() };
    
    self.signallingStateId = 3;
    chameleon.log("Configuration loaded");

// config is good...lets start the WSC session
    startWscSession(configuration);
    
// initialize the state variables
    self.isIncomingCall = false;
    self.isOutgoingCall = false;
    self.isActiveCall = false;

// function to start the WSC session
    function startWscSession(configuration){
        chameleon.log("starting session with WSC");
// create the session object
        chameleon.wscSessionObj = new wsc.Session(configuration.sipUser, configuration.wscUri, onSuccess, onFailure);

        chameleon.log(chameleon.wscSessionObj.sessionState);
// make the WSC session state available in our chameleon variable
       // chameleon.signallingState = chameleon.wscSessionObj.sessionState;
        
        var authHandler = new wsc.AuthHandler(chameleon.wscSessionObj);
        
//set up the auth handler
        authHandler.refresh =  function(authType, authHeaders) {
            authHeaders = chameleon.handlers.challengeHandler(authType, authHeaders);
            return authHeaders;
        };
        
        function onSuccess() {
            
            chameleon.log("WSC web session successfully started.");
            chameleon.log(chameleon.wscSessionObj);
            chameleon.log(chameleon);
// Set handler for state changes
            chameleon.wscSessionObj.onSessionStateChange = function(newState){
                chameleon.handlers.sessionStateChange(newState);
            };

// Create a CallPackage and an AuthHandler
            chameleon.log("creating call package");
            chameleon.wscCallPackage = new wsc.CallPackage(chameleon.wscSessionObj);
            
// Set up the Incoming call handler
            chameleon.wscCallPackage.onIncomingCall = function(callObj, callConfig){
                
                chameleon.handlers.setupCallEvents(callObj);
                
                chameleon.log("Incoming call...calling handler");
                
                chameleon.handlers.incomingCall(callObj, callConfig);
            };
            
            chameleon.signallingStateId = 4;
            chameleon.updateAngular();
            
        }
        
        function onFailure(err) {
            chameleon.log("WSC web session failed to start.");
            chameleon.log(err.reason);
            chameleon.signallingError = err;
            self.signallingStateId = 1;
            chameleon.updateAngular();
        }
    }
};

/**==========================================
 *  Shuts down the connection to a WSC
   ========================================== */

chameleon.closeSession = function(){
    if (!this.wscSessionObj || this.wscSessionObj == {}) {
        chameleon.log("session object not set");
        chameleon.log(this.wscSessionObj);
        return;
    }
    if (this.signallingStateId < 3) return chameleon.log("session already closed");
    
    else {
        this.wscSessionObj.close();
    
    // clear the call arrays
        chameleon.calls.active = [];
        chameleon.calls.incoming = [];
        chameleon.calls.outgoing = [];
        
    // initialize the state variables
        chameleon.isIncomingCall = false;
        chameleon.isOutgoingCall = false;
        chameleon.isActiveCall = false;
        
    }
    this.signallingStateId = 2;
};

/**==========================================
 *  Shuts down connection to WSC and resets
 *  object state.
   ========================================== */

chameleon.initialize = function(){
    this.wscSessionObj.close();
    chameleon.log("Initializing...");
    
    this.signallingStateId = 0;
    this.configuration = null;
    this.signallingState = "None";
    this.signallingError = null;
    this.wscSessionObj = {};
    
};

/**==========================================
 *  When chameleon has an incoming call, this
 *  answers the call.
   ========================================== */

chameleon.acceptIncomingCall = function(callObj){

    chameleon.log("accepting a call.");
    
    if (callObj) {
        chameleon.log("acceptAttemptedCall called with a callObject: " + callObj);
    } else {
        chameleon.log("acceptAttemptedCall called without a callObject...using most recent");
        callObj = chameleon.calls.incoming[0];
        
    }
    chameleon.calls.active.push(callObj);
    
    if (callObj.direction == "Incoming") chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
    if (callObj.direction == "Outgoing") chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
    
    callObj.accept(callObj.callConfig);
    
    return;
};

/**==========================================
 *  When chameleon has an incoming call, this
 *  rejects the call.
   ========================================== */

chameleon.rejectIncomingCall = function(callObj){
    
    chameleon.log("rejecting an incoming call.");
    
    if (callObj) {
        chameleon.log("rejectIncomingCall called with a callObject: " + callObj);
    } else {
        chameleon.log("rejectIncomingCall called without a callObject...using most recent");
        callObj = chameleon.calls.incoming[0];
    }
    
    chameleon.log("Declining the call.");
    callObj.terminator = "I declined the call";
    chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
    callObj.decline(603);

};

/**==========================================
 *  When chameleon has an outgoing call, this
 *  cancels the call.
   ========================================== */
 
chameleon.cancelOutgoingCall = function(callObj){
    
    chameleon.log("cancelling an outgoing call.");
    
    if (callObj) {
        chameleon.log("rejectIncomingCall called with a callObject: " + callObj);
    } else {
        chameleon.log("rejectIncomingCall called without a callObject...using most recent");
        callObj = chameleon.calls.outgoing[0];
    }
    
    chameleon.log("Cancelling the call.");
    callObj.terminator = "I cancelled the call";
    chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
    callObj.end();

};


/**==========================================
 *  When chameleon has an active call, this
 *  hangs up the call.
   ========================================== */

chameleon.endActiveCall = function(callObj){
    
    chameleon.log("hanging up the call");
    
    if (callObj) {
        chameleon.log("endActiveCall called with a callObject: " + callObj);

    } else {
        chameleon.log("endActiveCall called without a callObject...using most recent");
        callObj = chameleon.calls.active[0];
    }
    
    chameleon.log("Hanging up the call.");
    callObj.terminator = "I hung up";
    callObj.end();

};

/**==========================================
 *  This sets up a new call.
   ========================================== */
   
chameleon.makeCall = function(callee, options, localMediaStream){
    if(!callee) return chameleon.log("Need to specify a callee to make a call");
    if(chameleon.signallingStateId != 4) return chameleon.log("Not connected to WSC...can't make a call");
    var callConfig;
    var audioMediaDirection;
    var videoMediaDirection;
    var dtConfig;
    
    if(!options){
        audioMediaDirection = wsc.MEDIADIRECTION.SENDRECV;
        videoMediaDirection = wsc.MEDIADIRECTION.NONE;
    }
    else if ((options.audio === false ||  options.audio == "NONE" || !options.audio) && (options.video === false || options.video === "NONE" || !options.video) && !options.data) {
        chameleon.log("ERROR: at least one media type must be used");
        return
        
    } else if (options) {
        
// test and set up audio config       
        if (options.audio === true) {
            audioMediaDirection = wsc.MEDIADIRECTION.SENDRECV
        } else if (options.audio === false) {
            audioMediaDirection = wsc.MEDIADIRECTION.NONE;
        } else if (options.audio == "NONE" || options.audio == "SENDONLY" || options.audio == "RECVONLY" || options.audio == "SENDRECV") { 
            audioMediaDirection = options.audio;
        } else {
            chameleon.log("ERROR: Invalid Audio Config");
            return
        }
// test and set up video config        
        if (options.video === true) {
            videoMediaDirection = wsc.MEDIADIRECTION.SENDRECV;
        } else if (options.video === false) {
            videoMediaDirection = wsc.MEDIADIRECTION.NONE;
        } else if (options.video == "NONE" || options.video == "SENDONLY" || options.video == "RECVONLY" || options.video == "SENDRECV") {
            videoMediaDirection = options.video;
        } else {
            chameleon.log("ERROR: Invalid Video Config");
            return
        }


        if (options.dtConfig) {
        //todo - set up data channel config
        }
    }
    
    callConfig = new wsc.CallConfig(audioMediaDirection, videoMediaDirection);
    
    chameleon.log("Making a call to " + callee);
    var newCallObj = chameleon.wscCallPackage.createCall(callee, callConfig, doCallError);
    
    newCallObj.direction = "Outgoing";
    
    chameleon.handlers.setupCallEvents(newCallObj);
    
    
    chameleon.calls.outgoing.push(newCallObj);
    chameleon.calls.all.push(newCallObj);
    
    if (localMediaStream) {
        chameleon.log("Making call with provided localMediaStream");
        newCallObj.start([localMediaStream]);
    } else {
        newCallObj.start();
    }
    
    chameleon.isOutgoingCall = true;
    
    function doCallError(error, newCallObj){
        chameleon.log("WSC Error...sending to outbound Call Error handler.");
        chameleon.handlers.outboundCallError(error);
    }
    
};


/**==========================================
 *  
 *  
 * 
 * 
 * 
 *  Event handlers
 * 
 * 
 * 
 * 
 * 
   ========================================== */
   
/**===============auth Handler============== */
 chameleon.handlers.challengeHandler = function(authType, authHeaders){
    chameleon.log("Auth challenge: " + authType);
    chameleon.log("Challenge headers: ");
    chameleon.log(authHeaders);
    chameleon.log(chameleon.wscSessionObj.sessionState);
        
//Set up the response object by calling a function.
    var authInfo = null;
    chameleon.updateAngular();
    
    if(authType==wsc.AUTHTYPE.SERVICE){
        authInfo = getSipAuth(authHeaders);
    } else if(authType==wsc.AUTHTYPE.TURN){
        return authInfo;
    }
    
    chameleon.log("Returning authInfo: " + JSON.stringify(authInfo));
    return authInfo;
    
    function getSipAuth(authHeaders) {
        chameleon.log("getting SIP auth headers");
        var authInfo;
        if (chameleon.configuration.sipPassword != null) {
            chameleon.log("generating local auth response");
            authInfo = localAuthGenerator(authHeaders);
        }
        return authInfo;
        
        // function to create auth response
        function localAuthGenerator(authHeaders){
            chameleon.log("local auth generation start");
            var ha1String = chameleon.configuration.sipUsername + ":" + authHeaders.realm + ":" + chameleon.configuration.sipPassword,
                ha1 = CryptoJS.MD5(ha1String).toString(CryptoJS.enc.Hex);
            //authHeaders.username = chameleon.sipUsername;
            authHeaders.ha1 = ha1;
            //authHeaders.opaque = '"auth"';
            return authHeaders;
        }
    }
 };
 
/**===============set up call event handlers============== */
chameleon.handlers.setupCallEvents = function(callObj){
    chameleon.log("setting call event Handlers");
    callObj.onCallStateChange = function(newState){
        chameleon.handlers.callStateChange(callObj, newState);
    };
    callObj.onMediaStreamEvent = chameleon.handlers.mediaStreamEventHandler;
};


/**===============Incoming call Handler============== */
chameleon.handlers.incomingCall = function(callObj, callConfig){
    chameleon.log("Incoming call handler invoked");
    callObj.direction = "Incoming";
    chameleon.calls.all.push(callObj);
    chameleon.calls.incoming.push(callObj);
    chameleon.isIncomingCall = true;
    chameleon.updateAngular();
};

chameleon.handlers.outboundCallError = function(err){
    chameleon.log("Error...something went wrong with the outbound call");
};


/**===============callStateChangeHandler============== */
chameleon.handlers.callStateChange = function(callObj, newCallState){
    chameleon.log("CALL STATE CHANGE. " + JSON.stringify(newCallState));
    if (newCallState.state == wsc.CALLSTATE.ESTABLISHED) {
        chameleon.log("Call is established.");
        callObj.startTime = new Date();
        // Remove call from attempted array, and push to active array
        
        if (callObj.direction == 'Outgoing') {
            chameleon.calls.active.push(callObj);
            chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
        }
        
        
    } else if (newCallState.state == wsc.CALLSTATE.ENDED) {

        callObj.endTime = new Date();
        if (!callObj.startTime) callObj.startTime = callObj.endTime;
        chameleon.log("Setting call duration");
        var millisecondDuration = callObj.endTime.getTime() - callObj.startTime.getTime();
        callObj.duration = millisecondDuration;
        
        if (!callObj.terminator) {
            chameleon.log("Fer end hung up");
            callObj.terminator = "Far end hung up";
        };
        
        chameleon.log("Removing object from active calls: ");
        chameleon.log(callObj);
        chameleon.calls.active.splice(chameleon.calls.active.indexOf(callObj), 1);
        chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
        chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);

    } else if (newCallState.state == wsc.CALLSTATE.FAILED) {
        
        chameleon.log("Call Failure.");
        var err = callObj.getCallState();
        callObj.endTime = new Date();
        if (!callObj.startTime) callObj.startTime = callObj.endTime;
        var millisecondDuration = callObj.endTime.getTime() - callObj.startTime.getTime();
        callObj.duration = millisecondDuration;
        callObj.terminator = err.status.code + " " + err.status.reason;
        chameleon.calls.active.splice(chameleon.calls.active.indexOf(callObj), 1);
        chameleon.calls.incoming.splice(chameleon.calls.incoming.indexOf(callObj), 1);
        chameleon.calls.outgoing.splice(chameleon.calls.outgoing.indexOf(callObj), 1);
    }
    
// Reset state boolean values, if needed
    chameleon.log("testing call states for cleanup");
    if (chameleon.calls.incoming.length === 0 && chameleon.isIncomingCall === true) {
        chameleon.log("Incoming call array is: " + chameleon.calls.incoming.length + " and isIncomingCall is " + chameleon.isIncomingCall + ". Setting isIncomingCall to false");
        chameleon.isIncomingCall = false;
    }
    if (chameleon.calls.outgoing.length === 0 && chameleon.isOutgoingCall === true) {
        chameleon.log("Outgoing call array is: " + chameleon.calls.outgoing.length + ". Setting isOutgoingCall to false");
        chameleon.isOutgoingCall = false;
    }
    if (chameleon.calls.active.length === 0 && chameleon.isActiveCall === true) {
        chameleon.log("Active call array is: " + chameleon.calls.active.length + ". Setting isActiveCall to false");
        chameleon.isActiveCall = false;
    }
    
    chameleon.updateAngular();
    
};

/**===============sessionStateChangeHandler============ */
chameleon.handlers.sessionStateChange = function(newSessionState){
    chameleon.log("SESSION STATE CHANGE.");
    switch (newSessionState) {
        case "CLOSED" :
            chameleon.signallingStateId = 2;
            break;
        default:
            chameleon.log("no change needed");
    }
    chameleon.updateAngular();
};


/**===============mediaEventHandler============== */
chameleon.handlers.mediaStreamEventHandler = function(mediaState, stream){
    chameleon.log("GOT MEDIA EVENT.");
    chameleon.log(mediaState);
    if (mediaState == wsc.MEDIASTREAMEVENT.LOCAL_STREAM_ADDED) {
        chameleon.log("Local Stream Added. Attaching to " + chameleon.configuration.localAudioId);
        //attachMediaStream(document.getElementById(chameleon.configuration.localAudioId), stream);
        attachMediaStream(document.getElementById(chameleon.configuration.localVideoId), stream);
   } else if (mediaState == wsc.MEDIASTREAMEVENT.REMOTE_STREAM_ADDED) {
        chameleon.log("Remote Stream Added. Attaching to " + chameleon.configuration.remoteAudioId);
        //attachMediaStream(document.getElementById(chameleon.configuration.remoteAudioId), stream);
        attachMediaStream(document.getElementById(chameleon.configuration.remoteVideoId), stream);
   }
};


/**==========================================
 *  Function for attaching 
 *  media streams, based on browser type
   ========================================== */
   
var attachMediaStream = {};

if (navigator.mozGetUserMedia) {
    chameleon.log("Attaching media stream");
    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        chameleon.log("Application using Mozilla browser");
        chameleon.log(stream);
        chameleon.log(stream.getVideoTracks());
        chameleon.log(stream.getAudioTracks());
        element.mozSrcObject = stream;
        element.play();
    };
} else if (navigator.webkitGetUserMedia) {
    chameleon.log("Application using Chrome browser");
    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        chameleon.log(stream);
        chameleon.log(stream.getVideoTracks());
        chameleon.log(stream.getAudioTracks());
        element.src = webkitURL.createObjectURL(stream);
    };
} else {
    // The browser does not support media streams
    chameleon.log("Browser does not support media streams");
}



// A little clean-up
window.onunload = function(){
    chameleon.closeSession();
};





   

