// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAqW6EthB_kuR0kkd8G5hH0kfFy3yuXDI",
    authDomain: "eisverygoodletter-discord-bot.firebaseapp.com",
    projectId: "eisverygoodletter-discord-bot",
    storageBucket: "eisverygoodletter-discord-bot.appspot.com",
    messagingSenderId: "969560919680",
    appId: "1:969560919680:web:ed45b38a2305ffb69ee065",
    measurementId: "G-J2BNJB4MKF"
};

module.exports = function(app, client){
    var CryptoJS = require("crypto-js");
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
    app.get("/interconclient.js", function(req, res){
        res.sendFile("./interconclient.js", {root: __dirname});
    })
    app.get("/INTERCON/LOGIN", function(req, res){
        const encPassword = req.query.passWord;
        const username = req.query.userName;
        // decrypt password
        const today = new Date().toLocaleDateString();
        const password = CryptoJS.AES.decrypt(encPassword, today).toString(CryptoJS.enc.Utf8);
        console.log(encPassword, password);
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){
        const encPassword = req.query.passWord;
        const username = req.query.userName;
    });
}