

module.exports = function(app, client){
    var admin = require("firebase-admin");
    admin.initializeApp(); // FIREBASE_CONFIG variable
    // first, define the webpage send
    app.get("/intercon", function(req,res){
        res.sendFile("./intercon.html", {root: __dirname});
    });
    app.get("/INTERCON/LOGIN", function(req, res){
        
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){

    });
}