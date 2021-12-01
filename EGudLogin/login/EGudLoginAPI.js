const bcrypt = require("bcrypt");
var router = global.express.Router();
router.post("login-with-username", async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // hash the password
        const hashedPassword = bcrypt.hash(password, process.env.HASHINGSALT);

    } catch (error) {
        console.log(error);
    }
});



module.exports = router;