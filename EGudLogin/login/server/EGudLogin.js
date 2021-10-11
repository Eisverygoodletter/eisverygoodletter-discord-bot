var router = global.express.Router();


async function sendLogin(req, res){
    res.sendFile("../client/login.html");
}

router.get("/", sendLogin);

module.exports = router;