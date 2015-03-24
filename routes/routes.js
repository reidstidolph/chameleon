
// load up the user model
var chameleonDataModel = require('../models/chameleonDataModel');

module.exports = function(app, passport) {
    
/**==========================================
 *  Home
   ========================================== */    

    app.get('/chameleon/', function(req, res) {
        res.render('index');
    });
    
/**==========================================
 *  Login
   ========================================== */
   
   app.get('/chameleon/login', securityCheck, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});
	
	// process the login form
	app.post('/chameleon/login', passport.authenticate('local-login',
        {
            failureRedirect: '/chameleon/login',
            failureFlash: true
        }
    ), 
	function(req, res) {
        res.redirect('/chameleon/user/' + req.user.username);
	});
   
/**==========================================
 *  Logout
   ========================================== */
    
    app.get('/chameleon/logout', function(req, res) {
		req.logout();
		res.redirect('/chameleon/');
	});
	
/**==========================================
 *  Signup
   ========================================== */
   
   app.get('/chameleon/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	
	// process the signup form
	app.post('/chameleon/signup',
    passport.authenticate('local-signup', 
        {
            failureRedirect : '/chameleon/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }
    ),
    function(req, res) {
        res.redirect('/chameleon/user/' + req.user.username);
	});

/**==========================================
 *  User landing
   ========================================== */
    
    app.get('/chameleon/user/:username', securityCheck, function(req, res) {
        console.log("req matched: user landing route");
        //console.dir(req);
        
        
        res.render('landing.ejs', {
            user : req.user
        });
    });
    
    
/**==========================================
 *  Admin landing
   ========================================== */
    
    app.get('/chameleon/superuser/:username', securityCheck, function(req, res) {
        console.log("req matched: user landing route");
        //console.dir(req);
        
        
        res.render('landing.ejs', {
            user : req.user
        });
    });
    
 /**==========================================
 *  Route to Demo
   ========================================== */
    
    app.get('/chameleon/demo', function(req, res) {
        console.log("req matched: demo route");
        res.render('demo.ejs', {
            user : req.user
        });
    });

 /**==========================================
 *  Route to Demos
   ========================================== */
    
    app.get('/chameleon/demo/:demo', function(req, res) {
        console.log("req matched: demo route");
        res.render('demos/' + req.params.demo + '.ejs', {
            page : req.param('page')
        }, function (err, html) {
            if(err) {
                console.log("demo route matched, but no template exists");
                res.send(404, 'Sorry cant find that!');
            } else {
                res.end(html);
            }
        });
    });
    
/**==========================================
 *  API
   ==========================================*/
    
    app.get('/chameleon/api', function (req, res) {  
        res.send('Chameleon API is running');  
    });
    
    app.get('/chameleon/api/users', securityCheck, function(req, res) {
        if (req.user.role == "admin") {
            return chameleonDataModel.User.find('lname fname email demos role username', function(err, users){
                if (!err) {
                    return res.send(users);
                } else {
                    res.send(err);
                return console.log(err);
                }
            });
        }
        else {
            return chameleonDataModel.User.findById(req.user.id, 'lname fname email demos role username' , function(err, user){
                if (!err) {
                    return res.send(user);
                } else {
                res.send(err);
                return console.log(err);
                }
            });
        }
    });
    
    app.get('/chameleon/api/globaldemos', securityCheck , function(req, res) {
        return chameleonDataModel.GlobalDemoInstance.find(function(err, demos){
            if (!err) return res.send(demos);
            else res.send(500, "Error");
        });
    });
     
     
/**==========================================
 *  Fall Through 404
   ========================================== */

    app.use(function(req, res, next){
        console.log("req matched: not found route");
        res.send(404, 'Sorry cant find that!');
    });

};


// route middleware to perform authentication and authorization checks
function securityCheck(req, res, next) {
    require('../config/securitycheck.js')(req, res, next);
}





