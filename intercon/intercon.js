const CryptoJS = require("crypto-js");
//const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const firebase = require("firebase");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};
firebase.initializeApp(firebaseConfig); // FIREBASE_CONFIG variable
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const db = firebase.firestore();



// decryption algorithm is shown here cuz there's no reason to hide it. It exists on the client side
function decryptPassword(encPassword){
    const today = new Date().toLocaleDateString();
    const password = CryptoJS.AES.decrypt(encPassword, today).toString(CryptoJS.enc.Utf8);
    return password;
}

// the hashing salt is hidden in the env vars, because it 
async function hashAndContinueCreate(username,password, res){
    bcrypt.genSalt(parseInt(password), async (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            // check if the username exists in firestore
            const userRef = db.collection("users").doc(username);
            userRef.get().then(async (docSnapShot)=>{
                // username exists, return that it failed
                if(docSnapShot.exists){
                    res.send(false);
                }
                else{
                    // username doesn't exist, we can try to create one
                    const inputData = {
                        creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
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
    // first, define the webpage send
    app.get("/intercon", function(req,res){
        res.sendFile("./intercon.html", {root: __dirname});
    });
    app.get("/interconclient.js", function(req, res){
        res.sendFile("./interconclient.js", {root: __dirname});
    })
    app.post("/INTERCON/LOGIN", function(req, res){
        const encPassword = req.body.passWord;
        const username = req.body.userName;
        console.log(username);
        console.log(encPassword);
        // decrypt password
        const password = decryptPassword(encPassword);
        
    });
    app.post("/INTERCON/CREATE_ACC", function(req, res){
        const encPassword = req.body.passWord;
        const username = req.body.userName;
        console.log(username);
        console.log(encPassword);
        // decrypt password
        const password = decryptPassword(encPassword);
        // hash and continue in async
        hashAndContinueCreate(username,password, res);
    });
}