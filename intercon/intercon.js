

module.exports = function(app, client){
    var admin = require("firebase-admin");
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIRESTORE_PROJECT_ID,
            clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
            privateKey: process.env.FIRESTORE_PRIVATE_KEY,
        }),
        databaseURL: process.env.FIRESTORE_DATABASE_URL,
        projectId: process.env.FIRESTORE_PROJECT_ID
    });
    // first, define the webpage send
    app.get("/intercon", function(req,res){
        res.sendFile("./intercon.html", {root: __dirname});
    });
    app.get("/INTERCON/LOGIN", function(req, res){
        
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){

    });
}