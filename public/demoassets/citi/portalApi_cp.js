var PORTAL=window.PORTAL||{};PORTAL.UI=PORTAL.UI||{};PORTAL.UI.CP={parentRef:null,currentHeight:null,status:null,resizeToMax:false,ruler:null,execQueue:[],useMaxHeightSizeAsFallback:true,timer:{interval:1000,execCounter:0,timerRef:null,doCheck:function(){try{var parent=PORTAL.UI.CP;var that=PORTAL.UI.CP.timer;that.execCounter++;if(Math.abs(parent.currentHeight-parent.getContentHeight())>1){parent.autoAdjust();that.reset();}else{if(that.execCounter>120){that.reset(10000);}else{if(that.execCounter==20){that.reset(2000);}else{if(that.execCounter==40){that.reset(3000);}else{if(that.execCounter==80){that.reset(5000);}}}}}}catch(e){}},reset:function(x){try{var that=PORTAL.UI.CP.timer;window.clearInterval(PORTAL.UI.CP.timer.timerRef);if(!x||typeof x!="number"){that.interval=1000;that.execCounter=0;}else{that.interval=x;}that.timerRef=window.setInterval(PORTAL.UI.CP.timer.doCheck,PORTAL.UI.CP.timer.interval);}catch(e){}},start:function(){var that=PORTAL.UI.CP.timer;if(that.timerRef===null){that.timerRef=window.setInterval(PORTAL.UI.CP.timer.doCheck,PORTAL.UI.CP.timer.interval);}else{that.reset();}},stop:function(){var that=PORTAL.UI.CP.timer;if(that.timerRef!==null){window.clearInterval(PORTAL.UI.CP.timer.timerRef);that.timerRef=null;}}},startTimedResize:function(){if(!PORTAL.UI.CP.resizeToMax){this.timer.start();}},stopTimedResize:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.timer.stop)){return false;}this.timer.stop();},_initialize:function(){try{var that=PORTAL.UI.CP;if(that.status!=1){try{that.parentRef=parent.PORTAL.UI.Controller;}catch(e){}if(that.parentRef!==null){try{if(typeof that.parentRef.needScrollToTop=="undefined"||that.parentRef.needScrollToTop){that.parentRef.scrollTo(0,0);}}catch(e){}that.ruler=document.createElement("div");that.ruler.id="PORTAL_ruler";that.ruler.style.clear="both";that.ruler.style.height="1px";document.body.appendChild(that.ruler);if(!that.resizeToMax){that.autoAdjust();that.startTimedResize();try{that.parentRef.addWindowResizeListener({window:window,funcRef:PORTAL.UI.CP.timer.reset,namespace:"cpAutoAdjust"});}catch(e){}}else{that.resizeToMaxAvailableHeight();}that._addUnload();that.status=1;while(that.execQueue.length>0){var t=that.execQueue.shift();if(!(t.arg instanceof Array)){t.arg=[t.arg];}t.f.apply(this,t.arg);t=null;}}}}catch(e){}},_addUnload:function(){try{try{window.onbeforeunload=function(){try{PORTAL.UI.CP.parentRef.triggerUnload();}catch(e){}};}catch(e){}this.parentRef.addEvent(this.parentRef.iframeContainerRef,"customUnload",function(){try{var that=PORTAL.UI.CP;that.parentRef.removeEvent(that.parentRef.iframeContainerRef,"customUnload");if(that.resizeToMax){that.resizeToMax=false;PORTAL.UI.CP.parentRef.removeWindowResizeListener({namespace:"cpResizeToMaxHeight"});}else{PORTAL.UI.CP.parentRef.removeWindowResizeListener({window:window,namespace:"cpAutoAdjust"});}}catch(e){PORTAL.UI.ErrorLog.error(e,"Error executing customUnload");}try{PORTAL.UI.CP.parentRef.injectScript();}catch(e){PORTAL.UI.ErrorLog.error(e,"Error executing injectScript");}});}catch(e){}},getContentHeight:function(){var that=PORTAL.UI.CP;var fallbackHeight=that.parentRef.getAvailableHeight();var scrH;try{var d=document;scrH=Math.max(Math.max(d.body.scrollHeight,d.documentElement.scrollHeight),Math.max(d.body.offsetHeight,d.documentElement.offsetHeight),Math.max(d.body.clientHeight,d.documentElement.clientHeight));}catch(e){scrH=0;}if(typeof that.useMaxHeightSizeAsFallback=="undefined"||!that.useMaxHeightSizeAsFallback){fallbackHeight=800;}try{document.body.appendChild(PORTAL.UI.CP.ruler);}catch(e){return fallbackHeight;}if(that.ruler.offsetTop!==null&&that.ruler.offsetTop>0){if(typeof that.useMaxHeightSizeAsFallback=="undefined"||!that.useMaxHeightSizeAsFallback){if(that.ruler.offsetTop<600){try{return Math.max(document.body.clientHeight,fallbackHeight,scrH);}catch(e){return fallbackHeight;}}else{return Math.max(that.ruler.offsetTop+1,scrH);}}return Math.max(that.ruler.offsetTop+1,fallbackHeight,scrH);}else{return Math.max(scrH,fallbackHeight);}},resizeFrame:function(w,h){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.resizeFrame,[w,h])){return false;}return PORTAL.UI.CP.parentRef.resizeFrame(w,h);},resizeFrameHeight:function(h){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.resizeFrameHeight,h)){return false;}return PORTAL.UI.CP.parentRef.resizeFrame(null,h);},autoAdjust:function(){try{var that=PORTAL.UI.CP;if(!PORTAL.UI.CP.resizeToMax){that.currentHeight=that.getContentHeight();that.resizeFrame(null,that.currentHeight);}}catch(e){}},stopAutoAdjust:function(){var that=PORTAL.UI.CP;if(!that._queueIfNotReady(that.stopAutoAdjust)){return false;}that.parentRef.removeWindowResizeListener({window:window,namespace:"cpAutoAdjust"});that.stopTimedResize();return true;},resizeToMaxAvailableHeight:function(){var that=PORTAL.UI.CP;if(!that._queueIfNotReady(that.resizeToMaxAvailableHeight)){return false;}if(!that.resizeToMax){that.stopAutoAdjust();that.resizeToMax=true;that.parentRef.addWindowResizeListener({funcRef:that.parentRef.setAvailableHeight,namespace:"cpResizeToMaxHeight"});}if(document.attachEvent){setTimeout(that.parentRef.setAvailableHeight,100);}else{that.parentRef.setAvailableHeight();}return true;},readjust:function(){if(PORTAL.UI.CP.resizeToMax){PORTAL.UI.CP.resizeToMaxAvailableHeight();}},toggleOuterHeader:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.toggleOuterHeader)){return false;}return PORTAL.UI.CP.parentRef.toggleOuterHeader();},collapseOuterHeader:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.collapseOuterHeader)){return false;}return PORTAL.UI.CP.parentRef.collapseOuterHeader();},expandOuterHeader:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.expandOuterHeader)){return false;}return PORTAL.UI.CP.parentRef.expandOuterHeader();},isOuterHeaderCollapsed:function(){try{return PORTAL.UI.CP.parentRef.isOuterHeaderCollapsed();}catch(e){return false;}},changeFrameContent:function(url){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.changeFrameContent,url)){return false;}return PORTAL.UI.CP.parentRef.changeIframeUrl(url);},alert:function(t,m,c){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.alert,[t,m,c])){return false;}PORTAL.UI.CP.parentRef.modalAlert(t,m,c);},confirm:function(t,m,c){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.confirm,[t,m,c])){return false;}PORTAL.UI.CP.parentRef.modalConfirm(t,m,c);},prompt:function(t,m,c){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.prompt,[t,m,c])){return false;}PORTAL.UI.CP.parentRef.modalPrompt(t,m,c);},info:function(settings){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.info,settings)){return false;}PORTAL.UI.CP.parentRef.modalInfo(settings);},linkTo:function(s,c,pn){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.linkTo,[s,c,pn])){return false;}return PORTAL.UI.CP.parentRef.linkTo(s,c,false,pn);},_queueIfNotReady:function(func,arg){if(PORTAL.UI.CP.status!==1){PORTAL.UI.CP.execQueue.push({f:func,arg:arg});return false;}return true;},hideLeftNav:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.hideLeftNav)){return false;}return PORTAL.UI.CP.parentRef.hideLeftNav();},showLeftNav:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.showLeftNav)){return false;}return PORTAL.UI.CP.parentRef.showLeftNav();},collapseLeftNav:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.collapseLeftNav)){return false;}return PORTAL.UI.CP.parentRef.collapseLeftNav();},expandLeftNav:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.expandLeftNav)){return false;}return PORTAL.UI.CP.parentRef.expandLeftNav();},hideBreadcrumbs:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.hideBreadcrumbs)){return false;}return PORTAL.UI.CP.parentRef.hideBreadcrumbs();},showBreadcrumbs:function(){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.showBreadcrumbs)){return false;}return PORTAL.UI.CP.parentRef.showBreadcrumbs();},turnOffEtradingBtn:function(){return false;},turnOnEtradingBtn:function(url){return false;},reloadTopFrame:function(fromStepup){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.reloadTopFrame,fromStepup)){return false;}PORTAL.UI.CP.parentRef.reloadTopFrame(fromStepup);return true;},getParentFrameHeight:function(){try{return PORTAL.UI.CP.parentRef.getPageHeight();}catch(e){return 500;}},getParentFrameScrollTop:function(){try{return PORTAL.UI.CP.parentRef.getPageScrollTop();}catch(e){return 0;}},getCVItemTrail:function(){try{return PORTAL.UI.CP.parentRef.menu.activeNav.getCVItemTrail().trail;}catch(e){return"";}},scrollTo:function(x,y){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.scrollTo,[x,y])){return false;}return PORTAL.UI.CP.parentRef.scrollTo(x,y);},getObjectFromParentByName:function(name){return PORTAL.UI.CP.parentRef.getWindowObjectByName(name);},trackLink:function(link,type,idSite,gateWayType,trackingSource,menuCode,hitType,referrerUrl,visitorId){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackLink,{l:link,t:type,i:idSite,g:gateWayType,ts:trackingSource,m:menuCode,h:hitType,r:referrerUrl,v:visitorId})){return false;}PORTAL.UI.CP.parentRef.trackLink({l:link,t:type,i:idSite,g:gateWayType,ts:trackingSource,m:menuCode,h:hitType,r:referrerUrl,v:visitorId});return true;},trackPageView:function(url,title,idSite,gateWayType,trackingSource,menuCode,hitType,referrerUrl,visitorId){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackPageView,{l:url,t:title,i:idSite,g:gateWayType,ts:trackingSource,m:menuCode,h:hitType,r:referrerUrl,v:visitorId})){return false;}PORTAL.UI.CP.parentRef.trackPageView({l:url,t:title,i:idSite,g:gateWayType,ts:trackingSource,m:menuCode,h:hitType,r:referrerUrl,v:visitorId});return true;},trackPvByMenuCode:function(menuCode){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackPvByMenuCode,menuCode)){return false;}PORTAL.UI.CP.parentRef.trackPvByMenuCode(menuCode);return true;},trackContent:function(portletName,contentId,contentSourceId,asDeepLink,trackingSource,menuCode){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackContent,{p:portletName,ci:contentId,csi:contentSourceId,adl:asDeepLink,ts:trackingSource,mc:menuCode})){return false;}PORTAL.UI.CP.parentRef.trackContent({p:portletName,ci:contentId,csi:contentSourceId,adl:asDeepLink,ts:trackingSource,mc:menuCode});return true;},trackSuggest:function(portletName,contentId,contentSourceId){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackSuggest,{p:portletName,ci:contentId,csi:contentSourceId})){return false;}PORTAL.UI.CP.parentRef.trackSuggest({p:portletName,ci:contentId,csi:contentSourceId});return true;},trackSearchContent:function(contentId,contentSourceId,portletName){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackSearchContent,{p:portletName,ci:contentId,csi:contentSourceId})){return false;}PORTAL.UI.CP.parentRef.trackSearchContent({p:portletName,ci:contentId,csi:contentSourceId});return true;},trackSearchSubmission:function(url,trackingParams,menuitemshortcut){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.trackSearchSubmission,[url,trackingParams,menuitemshortcut])){return false;}PORTAL.UI.CP.parentRef.trackSearchSubmission(url,trackingParams,menuitemshortcut);return true;},updateShoppingCart:function(){parent.PORTAL.UI.Controller.updateShoppingCart();},getPreference:function(component,opt_key,opt_callback){try{return PORTAL.UI.CP.parentRef.getPreference(component,opt_key,opt_callback);}catch(e){return null;}},savePreference:function(component,preferenceList,opt_callback){if(!PORTAL.UI.CP._queueIfNotReady(PORTAL.UI.CP.savePreference,[component,preferenceList,opt_callback])){return false;}PORTAL.UI.CP.parentRef.savePreference(component,preferenceList,opt_callback);},getMenuInternalStructure:function(menuCode){try{return PORTAL.UI.CP.parentRef.menu.getMenuInternalStructure(menuCode);}catch(e){return null;}},isCPBAEnabled:function(){try{return PORTAL.UI.CP.parentRef.isCPBAEnabled();}catch(e){return false;}}};if(window.top!=window.self){try{parent.PORTAL.UI.Controller;}catch(e){if(document.domain.indexOf("citivelocity")>-1){document.domain=document.domain;PORTAL.UI.CP.useMaxHeightSizeAsFallback=false;}if(document.domain.split(/\.+/).length>3){document.domain=document.domain.match(/[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/);}}try{parent.PORTAL.UI.Controller;}catch(e){if(document.domain.indexOf("citivelocity")>-1){document.domain=document.domain.match(/[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/);}}try{if(document.isInjected){PORTAL.UI.CP._initialize();}else{parent.PORTAL.UI.Controller.addEvent(window,"load",PORTAL.UI.CP._initialize);}}catch(e){PORTAL.UI.CP.status=0;}}