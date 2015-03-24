function isEmpty(s) {
	return ((s == null) || (s.length == 0));
}

function isWhitespace (s) {
	var i;
	var whitespace = " \t\n\r";
	if (isEmpty(s)) {
		return true;
	}
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1) {
			return false;
		}
	}
	return true;
}

function isEmail (s) {
	if (isEmpty(s)) {
		return false;
	}
	// is s whitespace?
	if (isWhitespace(s)) {
		return false;
	}
	// there must be >= 1 character before @, so we
	// start looking at character position 1 
	// (i.e. second character)
	var i = 1;
	var sLength = s.length;
	// look for @
	while ((i < sLength) && (s.charAt(i) != "@")) {
		i++;
	}
	if ((i >= sLength) || (s.charAt(i) != "@")) {
		return false;
	} else {
		i += 2;
	}
	// look for .
	while ((i < sLength) && (s.charAt(i) != ".")) {
		i++;
	}
	// there must be at least one character after the .
	if ((i >= sLength - 1) || (s.charAt(i) != ".")) {
		return false;
	} else {
		return true;
	}
}


function validateLogin(){
	var errorCount = 0;
	var requiredCount = 0;
	
	if((isWhitespace(document.getElementById('userName').value)) || (document.getElementById('userName').value == "Username")){
		document.getElementById('userName').className="errorUserNameText";
		errorCount = errorCount + 1;
		requiredCount = requiredCount + 1;
	}else{
		document.getElementById('userName').className="userNameText";
	}
	
	if((isWhitespace(document.getElementById('password').value)) || (document.getElementById('password').value == "Password")){
		document.getElementById('password').className="errorPasswordText";
		errorCount = errorCount + 1;
		requiredCount = requiredCount + 1;
	}else{
		document.getElementById('password').className="passwordText";	
	}
		
	if(requiredCount == 0){
		document.getElementById('errorRequired').style.display="none";
	}else{
		document.getElementById('errorRequired').style.display="inline";
	}
	
	if(errorCount == 0){
		changeTarget();
	}

		 
}

function changeTarget() {
	
	var targetvalue = document.form.target.value;
    var htmPosition = targetvalue.lastIndexOf('.htm');
	var user = document.form.USER.value;
	
	// remove BondHub user checking
	//if (isBondHubUser(user)) {
	//	document.form.userId.value=document.form.USER.value;
	//	document.form.userPassword.value=document.form.PASSWORD.value;
	//	document.form.action="/CitiMarketsLogin/login";
	//} else {
		/*
       	if((htmPosition != -1) || (targetvalue == "/"))  {
       		  targetvalue = "/citimarkets/index.tiles";

       	} else {
        	var qmarkPosn = targetvalue.lastIndexOf('?');
			if (qmarkPosn != -1) {
						targetvalue = targetvalue + "&f=t";
			}
			else {
				targetvalue = targetvalue + "?f=t";
			}
			
       	}
		*/
		// targetvalue = "/citimarkets/index.tiles";
		targetvalue = "/index.html";
       	document.form.target.value = targetvalue;

	//}
		document.form.submit();
	
	}

function isBondHubUser(userId) {
	if (userId.length < 3) return false;
	var upperUserId = userId.toUpperCase();
	if ((upperUserId.charAt(0) == 'B' || upperUserId.charAt(0) == 'S') && (upperUserId.charAt(1) == 'H') && (upperUserId.charAt(2) == '-')) {
			return true;
	}
	return false;
}

function validateForgotPassword(){
	var errorCount = 0;
	
	if(isWhitespace(document.getElementById('forgotPasswordUserName').value)){
		document.getElementById('forgotPasswordUserName').className="errorInput";
		document.getElementById('errorFpUser').style.display="inline";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('forgotPasswordUserName').className="normalInput";
		document.getElementById('errorFpUser').style.display="none";
	}
	
	if(!isEmail(document.getElementById('forgotPasswordEmail').value)){
		document.getElementById('forgotPasswordEmail').className="errorInput";
		document.getElementById('errorFpEmail').style.display="inline";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('forgotPasswordEmail').className="normalInput";	
		document.getElementById('errorFpEmail').style.display="none";
	}
			
	if(errorCount == 0){
		launchWindow('#passwordReset');
		cancelErrorsForgotPassword();
	}

		 
}

function validateRequestAccess(){
	var errorCount = 0;
	
	if(isWhitespace(document.getElementById('firstName').value)){
		document.getElementById('errorFName').style.display="inline";
		document.getElementById('firstName').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorFName').style.display="none";	
		document.getElementById('firstName').className="normalInput";
	}
	
	if(isWhitespace(document.getElementById('lastName').value)){
		document.getElementById('errorLName').style.display="inline";
		document.getElementById('lastName').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorLName').style.display="none";
		document.getElementById('lastName').className="normalInput";	
	}
	
	if(!isEmail(document.getElementById('email').value)){
		document.getElementById('errorEmail').style.display="inline";
		document.getElementById('email').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorEmail').style.display="none";
		document.getElementById('email').className="normalInput";	
	}
	
	if(isWhitespace(document.getElementById('phone').value)|| isNaN(document.getElementById('phone').value)){
		document.getElementById('errorPhone').style.display="inline";
		document.getElementById('phone').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorPhone').style.display="none";	
		document.getElementById('phone').className="normalInput";
	}
	
	if(isWhitespace(document.getElementById('city').value)){
		document.getElementById('errorCity').style.display="inline";
		document.getElementById('city').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorCity').style.display="none";
		document.getElementById('city').className="normalInput";	
	}
	
	if(isWhitespace(document.getElementById('state').value)){
		document.getElementById('errorState').style.display="inline";
		document.getElementById('state').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorState').style.display="none";
		document.getElementById('state').className="normalInput";	
	}
	
	if(isWhitespace(document.getElementById('country').value)){
		document.getElementById('errorCountry').style.display="inline";
		document.getElementById('country').className="errorInput";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorCountry').style.display="none";
		document.getElementById('country').className="normalInput";	
	}
	
	if(document.getElementById('rdbPhone').checked != true && document.getElementById('rdbEmail').checked != true){
		document.getElementById('errorRdb').style.display="inline";
		errorCount = errorCount + 1;
	}else{
		document.getElementById('errorRdb').style.display="none";
	}
		
	if(errorCount == 0){		 		 
		launchWindow('#thankYou');
		cancelErrors(); 
		
	}
		 
}

function cancelErrors(){
	document.getElementById('errorFName').style.display="none";	
	document.getElementById('errorLName').style.display="none";
	document.getElementById('errorEmail').style.display="none";
	document.getElementById('errorPhone').style.display="none";
	document.getElementById('errorCity').style.display="none";
	document.getElementById('errorState').style.display="none";
	document.getElementById('errorCountry').style.display="none";
	document.getElementById('errorRdb').style.display="none";
	
	document.getElementById('firstName').className="normalInput";
	document.getElementById('lastName').className="normalInput";
	document.getElementById('email').className="normalInput";
	document.getElementById('phone').className="normalInput";
	document.getElementById('city').className="normalInput";
	document.getElementById('state').className="normalInput";
	document.getElementById('country').className="normalInput";
	
	document.getElementById('firstName').value="";
	document.getElementById('lastName').value="";
	document.getElementById('email').value="";
	document.getElementById('phone').value="";
	document.getElementById('city').value="";
	document.getElementById('state').value="";
	document.getElementById('country').value="";
}

function cancelErrorsForgotPassword(){
	document.getElementById('forgotPasswordUserName').className="normalInput";
	document.getElementById('errorFpUser').style.display="none";
	document.getElementById('forgotPasswordUserName').value="";
	
	document.getElementById('forgotPasswordEmail').className="normalInput";	
	document.getElementById('errorFpEmail').style.display="none";
	document.getElementById('forgotPasswordEmail').value="";

}

function launchWindow(id) {

	$('#requestAccess').hide();
	$('#forgotPass').hide();
	
	//Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	
	//Set height and width to mask to fill up the whole screen
	$('#mask').css({'width':maskWidth,'height':maskHeight});
	//transition effect
	$('#mask').fadeIn(1000);
	$('#mask').fadeTo("slow",0.8);
	
	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
	
	//Set the popup window to psd position 
	$(id).css('top',  115);
	$(id).css('left', (winW/2-$(id).width()/2)-8);
	
	
	//transition effect
	$(id).fadeIn(2000);
}

