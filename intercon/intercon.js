const CryptoJS = require("crypto-js");
const admin = require("firebase-admin");
const firebase = require("firebase/app");
const bcrypt = require("bcrypt");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
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

// decryption algorithm is shown here cuz there's no reason to hide it. It exists on the client side
function decryptPassword(encPassword){
    const today = new Date().toLocaleDateString();
    const password = CryptoJS.AES.decrypt(encPassword, today).toString(CryptoJS.enc.Utf8);
    return password;
}

// the hashing salt is hidden in the env vars, because it 
async function hashAndContinue(username,password){
    bcrypt.genSalt((parseInt(process.env.HASHING_SALT) + parseInt(process.env.HASHING_SALT) % password.length), (err, salt)=>{
        console.log(err);
        bcrypt.hash(password, salt, (err, hash)=>{
            console.log(err);
            console.log(hash);
            console.log(salt);
        });
    });
}

module.exports = function(app, client){
    admin.initializeApp(); // FIREBASE_CONFIG variable
    // Firebase App (the core Firebase SDK) is always required and
    // must be listed before other Firebase SDKs

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
        const password = decryptPassword(encPassword);
        // hash and continue in an async function
        hashAndContinue(username, password);
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){
        const encPassword = req.query.passWord;
        const username = req.query.userName;
        // decrypt password
        const password = decryptPassword(encPassword);
    });
}