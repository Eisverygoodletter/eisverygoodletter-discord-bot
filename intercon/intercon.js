const CryptoJS = require("crypto-js");
const admin = require("firebase-admin");
const firebase = require("firebase/app");
const bcrypt = require("bcrypt");
admin.initializeApp(); // FIREBASE_CONFIG variable
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const db = admin.firestore();

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
async function hashAndContinueCreate(username,password, res){
    bcrypt.genSalt(parseInt(password), (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            // check if the username exists in firestore
            const userRef = db.collection("users").doc(username);
            userRef.get().then((docSnapShot)=>{
                // username exists, return that it failed
                if(docSnapShot.exists){
                    res.send(false);
                }
                else{
                    // username doesn't exist, we can try to create one
                    const inputData = {
                        creationDate: admin.firestore.Timestamp.fromDate(new Date()),
                        password: hash.toString(),
                        username: username
                    };
                    // create the new one
                    const result = await db.collection("users").doc(username).set(inputData);
                    res.send(true);
                }
            });
        });
    });
}

module.exports = function(app, client){

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
        
    });
    app.get("/INTERCON/CREATE_ACC", function(req, res){
        const encPassword = req.query.passWord;
        const username = req.query.userName;
        // decrypt password
        const password = decryptPassword(encPassword);
        // hash and continue in async
        hashAndContinueCreate(username,password, res);
    });
}