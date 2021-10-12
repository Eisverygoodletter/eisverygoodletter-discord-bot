var router = global.express.Router();
var path = require("path");


async function sendLogin(req, res){
    res.sendFile(path.resolve("../client/login.html"), {__dirname});
}

router.get("/", sendLogin);

module.exports = router;