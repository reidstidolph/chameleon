/**==========================================
 *  complete data model for chameleon
   ========================================== */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema ;
var bcrypt   = require('bcrypt-nodejs');

/**==========================================
 *  User
   ========================================== */
var userSchema = Schema({
    fname       : {type: String, required: true},
    lname       : {type: String, required: true},
    email       : {type: String, required: true},
    role        : {type: String, enum: ["user", "admin"], default: "user"},
    demos       : [],
    modified    : {type: String, default: Date.now},
    created     : String,
    username    : {type: String, required: true},
    password    : {type: String, required: true}
},
{ collection: 'users' });

/**==========================================
 *  DemoInstance

var demoInstanceSchema = Schema({
    name        : String,
    description : String,
    ux          : [{type: Number, ref: 'DemoUX'}],
    wsc         : {type: Number, ref: 'Wsc'},
    created     : String
},
{ collection: 'demoInstances' });

   ========================================== */

/**==========================================
 *  Wsc
   ========================================== */
var wscSchema = Schema({
    wsUri       : String,
    name        : String,
    description : String,
    publicFlag  : Boolean,
    authorizedUXs : [{type: Number, ref: 'DemoUX'}],
    sipUserPool : [{type: Number, ref: 'SipUser'}]
},
{ collection: 'wscs' });


/**==========================================
 *  sipUser
   ========================================== */
var sipUserSchema = Schema({
    aor         : String,
    username    : String,
    password    : String
},
{ collection: 'sipUsers' });


/**==========================================
 *  DemoUX
   ========================================== */
var demoUXSchema = Schema({
    description : String,
    url         : String,
    gui         : {type: Number, ref: 'Gui'},
    sipUser     : {type: Number, ref: 'SipUser'},
    authorizedUsers : [{type: Number, ref: 'User'}]
},
{ collection: 'demoUXs' });

/**==========================================
 *  Gui
   ========================================== */
var guiSchema = Schema({
    name        : String,
    description : String,
    assets      : [{type: Number, ref: 'GuiAsset'}]
},
{ collection: 'guis' });


/**==========================================
 *  GuiAsset
   ========================================== */
var guiAssetSchema = Schema({
    url         : String,
    type        : {type: String, enum: ["js", "css", "html", "image"], default: "html"}
},
{ collection: 'guiAssets' });

/**==========================================
 *  GlobalDemoInstances
   ========================================== */
var globalDemoInstanceSchema = Schema({
    name        : String,
    description : String,
    ux          : [{
        sipUsersRequired    : Number,
        url                 : String,
        description         : String
    }]
},
{ collection: 'globalDemoInstances' });

/**==========================================
 *  Data Model Methods
   ========================================== */
// generate a password hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// define the models using the schemas
var chameleonDataModel = Object;
//chameleonDataModel.DemoInstance = mongoose.model('DemoInstance', demoInstanceSchema);
chameleonDataModel.Wsc = mongoose.model('Wsc', wscSchema);
chameleonDataModel.SipUser = mongoose.model('SipUser', sipUserSchema);
chameleonDataModel.User = mongoose.model('User', userSchema);
chameleonDataModel.DemoUX = mongoose.model('DemoUX', demoUXSchema);
chameleonDataModel.Gui = mongoose.model('Gui', guiSchema);
chameleonDataModel.GuiAsset = mongoose.model('GuiAsset', guiAssetSchema);
chameleonDataModel.GlobalDemoInstance = mongoose.model('GlobalDemoInstance', globalDemoInstanceSchema);



module.exports = chameleonDataModel;
    
