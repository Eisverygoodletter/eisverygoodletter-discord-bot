var router = global.express.Router();
var path = require("path");


async function sendLogin(req, res){
    res.sendFile("client/login.html", {root: __dirname});
}
router.get("/", sendLogin);

async function sendLoginCSS(req, res){
    res.sendFile("client/loginClient.css", {root: __dirname});
}
router.get("/loginClient.css", sendLoginCSS);

async function sendLoginJS(req, res){
    res.sendFile("client/loginClient.js", {root: __dirname});
}
router.get("/loginClient.js", sendLoginJS);

async function sendGetPostJS(req, res){
    res.sendFile("client/getPost.js", {root: __dirname});
}
router.get("/getPost.js", sendGetPostJS);

module.exports = router;