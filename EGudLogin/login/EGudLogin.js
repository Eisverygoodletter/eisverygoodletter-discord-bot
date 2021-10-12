var router = global.express.Router();
var path = require("path");


async function sendLogin(req, res){
    res.sendFile("client/login.html", {root: __dirname});
}

router.get("/", sendLogin);

module.exports = router;