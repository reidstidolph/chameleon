if(!window.CitiVelocity)CitiVelocity = {}
CitiVelocity.BrowserCompatibility = {
	generalComp: null,
	init: function(){
		var browserInfo = CitiVelocity.BrowserCompatibility.detectBrowser();
		var browserPluginComp = CitiVelocity.BrowserCompatibility.compareStandard(browserInfo);
	
		if(browserInfo.name != 'IE'){
			jQuery('#AlertContent ul li .outerPopupActionItem').css('float', 'none');
		}
		var AlertUL = jQuery('#AlertContent ul')
	
		if(browserPluginComp.browserComp){
			AlertUL.find('#BrowserVer').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#BrowserVer div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>For optimum website performance and browser experience, please view this site on Internet Explorer 6 (or higher) or Firefox 3 (or higher).</li><li>Please download the latest version of <a target="_blank" style="text-decoration:underline" href="http://www.microsoft.com/windows/internet-explorer">Internet Explorer</a> or <a target="_blank" style="text-decoration:underline" href="http://www.mozilla.com/firefox">Firefox</a>.</li></ul></p>')
		}
		if(browserPluginComp.resolutionComp){
			AlertUL.find('#ScreenReso').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#ScreenReso div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>For optimum website experience please view this site on a display screen that supports resolution 1024 x 768 or higher.</li><li>Your current screen size is '+browserInfo.resolutionW+' x '+browserInfo.resolutionH+'.</li></ul></p>')
		}
		if(browserPluginComp.flashComp){
			AlertUL.find('#flash').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#flash div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>This website requires Adobe Flash Player 9 or higher.</li><li>Please download the latest version of <a target="_blank" style="text-decoration:underline" href="http://www.adobe.com">Adobe Flash Player</a>.</li></ul></p>')
		}
		if(browserPluginComp.wmpComp){
			AlertUL.find('#wmp').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#wmp div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>This website requires Windows Media Player.</li><li>Please download the latest version of <a target="_blank" style="text-decoration:underline" href="http://www.microsoft.com/windows/windowsmedia">Windows Media Player</a>.</li></ul></p>')
		}
		if(browserPluginComp.javaComp){
			AlertUL.find('#javaPlugin').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#javaPlugin div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>Your browser does not support Java.</li><li>Please enable Java in your browser settings or download and install the latest version of <a target="_blank" style="text-decoration:underline" href="http://java.sun.com">Java</a>.</li></ul></p>')
		}
		if(browserPluginComp.cookieComp){
			AlertUL.find('#CookiesPlugin').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#CookiesPlugin div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>This site requires Cookies to be enabled.</li><li>Please check your browser preferences and enable Cookies.</li></ul></p>')
		}
		if(browserPluginComp.popupComp){
			AlertUL.find('#BrowserPop').css('display', 'none');
		}else{
			var popupContent = AlertUL.find('#BrowserPop div.outerPopupActionItem div');
			popupContent.find('p:not(.title), ul').remove();
			popupContent.append('<p style="font-size:12px;margin-top:5px;"><ul class="pluginMess"><li>This site requires Popup to be allowed.</li><li>Please check your browser preferences and allow Popups.</li></ul></p>')
		}
	
		CitiVelocity.BrowserCompatibility.generalComp = browserPluginComp.generalComp;
		var alertTrigger = jQuery('#PluginAlert');
		
		//prepare checkbox value
		var hiddenAlerts = CitiMarkets.Cookies.read('hiddenAlerts');
		var checkboxStatus = hiddenAlerts != null;
		if(checkboxStatus || browserPluginComp.generalComp == true){
			jQuery('#isDispalyIndic').attr('checked', 'true');
			alertTrigger.css('display', 'none');
		}else{
			jQuery('#isDispalyIndic').removeAttr('checked');
			alertTrigger.css('display', 'block');
		}

		if(browserPluginComp.generalComp == true){
			jQuery('#AlertContent *').css('display', 'none');
			jQuery('#AlertContent').append('<div style="float:left;padding:10px 0px 0px 10px">Browser configuration optimized.</div>');
		}
		//if(generalComp == false){
		alertTrigger.unbind('click').click(function(){
			var CVM = CitiVelocity.Modal;
			CVM.open({
				title: 'Browser Compatibility Results',
				height: 'auto',
				width: 350,
				draggable: true,
				//resizable: true,
				//noCloseBtn: true,
				open: function(){
					CitiMarkets.PopupActions.setup();
					jQuery('div.mask').height(jQuery(window).height());
				},
				close: function(){
					var hiddenAlerts = CitiMarkets.Cookies.read('hiddenAlerts');
					var displayedAlerts = CitiMarkets.Cookies.read('displayedAlerts');
					if((hiddenAlerts != null) || CitiVelocity.BrowserCompatibility.generalComp == true){
						jQuery('#PluginAlert').css('display', 'none');
					}else if ((displayedAlerts != null) || ((hiddenAlerts == null) && (displayedAlerts == null))){
						jQuery('#PluginAlert').css('display', 'block');
					}
					
					//prepare checkbox value
					var hiddenAlerts = CitiMarkets.Cookies.read('hiddenAlerts');
					var checkboxStatus = hiddenAlerts != null;
					if(checkboxStatus || CitiVelocity.BrowserCompatibility.generalComp == true){
						jQuery('#isDispalyIndic').attr('checked', 'true');
						jQuery('#PluginAlert').css('display', 'none');
					}else{
						jQuery('#isDispalyIndic').removeAttr('checked');
						jQuery('#PluginAlert').css('display', 'block');
					}
					
					jQuery( '#ContextTooltip' ).remove();
				},
				html: $('#AlertContent').clone()
			});
			jQuery('div.modal .bottomBtns .closeBtn').css('display', 'none');
		});
		//}
		
	},
	
	flashPlugin: function(){
		var flash = PluginDetect.getVersion('Flash');
		if(flash){
			flash = flash.replace(/,/g,'.');
		}else{
			return false;
		}
		
		return flash;
	},
	
	wmpPlugin: function(){
		var wmp = PluginDetect.getVersion('WindowsMediaPlayer');
		if(wmp){
			wmp = wmp.replace(/,/g,'.');
		}else{
			return false;
		}
		
		return wmp;
	},
	
	browserNameVer: function(){
		var browserName = '';
		var browserVer = null;
		var navig_agt = navigator.userAgent.toLowerCase();
		if(navig_agt.match(/msie/)!=null){
			var tmp=navig_agt.indexOf("msie");
			browserName = 'IE';
			browserVer = CitiVelocity.BrowserCompatibility.navig_extVer(navig_agt.substring(tmp+5));
		}
		if(navig_agt.match(/chrome/)!=null){
			browserName = 'chrome';
		}
		if(navig_agt.match(/chrome/)==null && navigator.userAgent.toLowerCase().match(/safari/)!=null){
			browserName = 'safari';
		}
		if(navig_agt.match(/firefox/)!=null){
			var tmp=navig_agt.indexOf("firefox/");
			browserName = 'firefox';
			browserVer = CitiVelocity.BrowserCompatibility.navig_extVer(navig_agt.substring(tmp+8));
		}
		
		return {'browserName': browserName, 'browserVersion': browserVer};
	},
	
	navig_extVer: function(txt) {
		  if (!txt) return "";
		  var ver="";
		  for(var i=0; i<txt.length; i++) {
		    if ((isNaN(txt.charAt(i))) && (txt.charAt(i)!='.')) {
		      if (ver.length>0) return(ver);
		    } else {
		      ver+=txt.charAt(i);
		    }
		  }
		  return ver;
	},
	
	isCookieEnabled: function(){
		return navigator.cookieEnabled;
	},
	
	isPopupBlocked: function(){
		var myWindow = window.open('','','width=1,height=1,left=10000,top=10000,scrollbars=no');
		var isPopupBlocked = myWindow ? false : true;
		myWindow && myWindow.close();
		
		return isPopupBlocked;
	},
	
	detectBrowser: function(){
		var flash = CitiVelocity.BrowserCompatibility.flashPlugin();
		var wmp = CitiVelocity.BrowserCompatibility.wmpPlugin();
		var browserInfo = CitiVelocity.BrowserCompatibility.browserNameVer();
		var browserName = browserInfo.browserName;
		var browserVersion = browserInfo.browserVersion;
		var isCookieEnabled = CitiVelocity.BrowserCompatibility.isCookieEnabled();
		var isPopupBlocked = CitiVelocity.BrowserCompatibility.isPopupBlocked();
		var resolutionW = screen.width;
		var resolutionH = screen.height;
		
		return {
			'name': browserName,
			'version': browserVersion,
			'resolutionW': resolutionW,
			'resolutionH': resolutionH,
			'flash': flash,
			'wmp': wmp,
			'isJavaEnabled': navigator.javaEnabled(),
			'isCookieEnabled': isCookieEnabled,
			'isPopupBlocked': isPopupBlocked
		};
	},
	
	compareStandard: function(browserInfo){
		var	browserComp = (browserInfo.name == 'IE' && browserInfo.version >= 6) || (browserInfo.name == 'firefox' && browserInfo.version.substring(0, 1) >= 3);
		var resolutionComp = browserInfo.resolutionW >=1024 && browserInfo.resolutionH >= 768;
		var flashComp = browserInfo.flash ? true:false;
		var wmpComp = browserInfo.wmp ? true:false;
		var javaComp = browserInfo.isJavaEnabled;
		var cookieComp = browserInfo.isCookieEnabled;
		var popupComp = !browserInfo.isPopupBlocked;
		var generalComp = browserComp && resolutionComp && flashComp && wmpComp && javaComp && cookieComp && popupComp;
		
		return {
			'browserComp': browserComp,
			'resolutionComp': resolutionComp,
			'flashComp': flashComp,
			'wmpComp': wmpComp,
			'javaComp': javaComp,
			'cookieComp': cookieComp,
			'popupComp': popupComp,
			'generalComp': generalComp
		};
	},
	
	setupAlertPop: function(e, obj){
		var target = null;
		if(e.target){
			target = e.target;
		} else if (e.srcElement){
			target = e.srcElement;
		}
		var alertTrigger = jQuery('#PluginAlert');
		if(target && target.type == 'checkbox' && target.checked){
			var alertLI = jQuery('#AlertContent ul li:visible');
			var hiddenAlerts = '';
			for(var i = 0; i < alertLI.length; i ++){
				var currentLi = jQuery(alertLI[i]).attr('id');
				hiddenAlerts += currentLi + ',';
			}
			hiddenAlerts = hiddenAlerts.substring(0, hiddenAlerts.length - 1);
			CitiMarkets.Cookies.write('hiddenAlerts', hiddenAlerts);
			CitiMarkets.Cookies.remove('displayedAlerts');
		} else if(target && target.type == 'checkbox' && !target.checked){
			CitiMarkets.Cookies.remove('hiddenAlerts');
		} else if(target && !target.type ){
			var displayedAlerts = CitiMarkets.Cookies.read('hiddenAlerts');
			CitiVelocity.BrowserCompatibility.init();
			alertTrigger.trigger('click');
		}
	}
};
