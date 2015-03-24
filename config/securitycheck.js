/**==========================================
 *  Authentication and Authorization Middleware
   ========================================== */

// route middleware to make sure a user is logged in
var securityCheck = function(req, res, next) {
    //console.log("User of the request is" + console.dir(req));
	// if user is authenticated in the session, carry on 
	
    var patt = new RegExp("^\/chameleon\/api\/.*");
    if (req.isAuthenticated() && patt.test(req.route.path) )
        {
            console.log("SecCheck: API Request is authenticated, and authorized");
            return next();
        }
        
    if (!req.isAuthenticated() && patt.test(req.route.path) )
        {
            console.log("SecCheck: API Request is NOT authenticated, or authorized");
            res.send(403);
            return next(["Chameleon API Request Not Authorized"]);
        }
        
	if (req.isAuthenticated() && req.user.username == req.params.username)
        {
            console.log("SecCheck: user is authenticated, and authorized");
            return next();
        }
	
	if (req.isAuthenticated() && req.user.username != req.params.username)
        {
            console.log("SecCheck: user is authenticated, but not authorized...redirecting to dashboard");
            res.redirect('/chameleon/user/' + req.user.username);
            return next();
        }
        
    if (req.isAuthenticated() && req.route.path == '/chameleon/login')
    {
        console.log("SecCheck: user is already authenticated...send them in");
        res.redirect('/chameleon/user/' + req.user.username);
        return next();
    }
    
    if (!req.isAuthenticated() && req.route.path == '/chameleon/login')
    {
        console.log("SecCheck: user is not authenticated, and requsting login");
        return next();
    }
        
	// if they aren't redirect them to the home page
	console.log("SecCheck: user not logged in!");
	res.redirect('/chameleon/');
};

module.exports = securityCheck;