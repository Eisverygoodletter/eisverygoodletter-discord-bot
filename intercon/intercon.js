const firebaseConfig = {
    apiKey: "AIzaSyCOCMUWVZR-x3jI-e1v8MS5XRk9T9kQTy4",
    authDomain: "competitive-game.firebaseapp.com",
    databaseURL: "https://competitive-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "competitive-game",
    storageBucket: "competitive-game.appspot.com",
    messagingSenderId: "871281418085",
    appId: "1:871281418085:web:af799a4fdc97c2be7d4b8c",
    measurementId: "G-MDQTEJQ6PC"
};

module.exports = function(app, client){
    var admin = require("firebase-admin");
    admin.initializeApp(); // FIREBASE_CONFIG variable
    // Firebase App (the core Firebase SDK) is always required and
    // must be listed before other Firebase SDKs
    var firebase = require("firebase/app");

    // Add the Firebase products that you want to use
    require("firebase/auth");
    require("firebase/firestore");
    firebase.initializeApp(firebaseConfig);
    // first, define the webpage send
    app.get("/intercon", function(req,res){
        res.sendFile("./intercon.html", {root: __dirname});
    });
    app.get("/INTERCON/LOGIN", function(req, res){
        
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){

    });
}