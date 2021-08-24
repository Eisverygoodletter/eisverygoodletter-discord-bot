const CryptoJS = require("crypto-js");
//const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const firebase = require("firebase");
const crypt = require("crypto");
const { sensitiveHeaders } = require("http2");
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


// tokening
global.tokenIdCounter = 0;
class tokenData{
    checkExist(){
        if(this.pinged == false){
            // destroy itself
            clearInterval(this.intervalNum);
            global.tokenList.splice(global.tokenList.indexOf(this), 1);
            console.log("destroying token data: ");
            console.log(this);
        }
        else{
            this.pinged = false;
        }
    }
    constructor(token, username){
        this.token = token;
        this.username = username;
        this.id = global.tokenIdCounter;
        global.tokenIdCounter += 1;
        this.pinged = false;
        // start a setTimeout function to check if it should still exist after 1 minute
        this.intervalNum = setInterval(this.checkExist, 1000 * 10);
    }
}

global.tokenList = [];



// decryption algorithm is shown here cuz there's no reason to hide it. It exists on the client side
function decryptPassword(encPassword){
    const today = new Date().toLocaleDateString();
    const password = CryptoJS.AES.decrypt(encPassword, today).toString(CryptoJS.enc.Utf8);
    return password;
}

async function produceToken(username){
    var token = crypt.randomBytes(69).toString("hex"); // lol 69 funny number
    return token;
}

// the hashing salt is hidden in the env vars, because it 
async function hashAndContinueCreate(username,password, res){
    bcrypt.genSalt(parseInt(password), async (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            // check if the username exists in firestore
            const userRef = db.collection("users").doc(username);
            userRef.get().then(async (docSnapShot)=>{
                // username exists, return that it failed
                var retContent = {};
                if(docSnapShot.exists){
                    retContent.succeeded = false;
                    retContent.returnCode = 403; // forbidden.
                    retContent.returnText = "username already exists";
                    retContent.token = null;
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
                    console.log(result);
                    retContent.succeeded = true;
                    retContent.returnCode = 200;
                    retContent.returnText = "succeeded";
                    retContent.token = await produceToken(username);
                    res.cookie("tokenCookie", retContent.token, {
                        secure: true,
                        httpOnly: true,
                        expires: new Date(new Date().getTime + 60 * 60000),
                    })
                    var storeToken = new tokenData(retContent.token, username);
                    global.tokenList.push(storeToken);
                }
                res.send(retContent);
            });
        });
    });
}

async function hashAndContinueLogin(username, password, res){
    const userRef = db.collection("users").doc(username);
    userRef.get().then(async (docSnapShot)=> {
        var retContent = {};
        if(docSnapShot.exists){
            var data = docSnapShot.data();
            var testHash = data.password;
            const success = await bcrypt.compare(password, testHash);
            if(!success){
                retContent.succeeded = false;
                retContent.returnCode = 403;
                retContent.returnText = "password or username was wrong";
                retContent.token = "null";
            }
            else{
                // succeeded. Allow login
                retContent.succeeded = true;
                retContent.returnCode = 200;
                retContent.returnText = "succeeded";
                retContent.token = await produceToken(username);
                res.cookie("tokenCookie", retContent.token, {
                    secure: true,
                    httpOnly: true,
                    expires: new Date(new Date().getTime + 60 * 60000),
                })
                var storeToken = new tokenData(retContent.token, username);
                global.tokenList.push(storeToken);
            }
        }
        else{
            retContent.succeeded = false;
            retContent.returnCode = 403;
            retContent.returnText = "user did not exist";
            retContent.token = null;
        }
        res.send(retContent);
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
        hashAndContinueLogin(username, password, res);
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
    require("./intercon-sends.js")(app, client);
}