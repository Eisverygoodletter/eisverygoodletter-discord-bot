var router = global.express.Router();
var loginCache;
async function findAccountWithToken(token) {
    const loginRef = global.db.collection("eGudUsers");
    const snapShot = await loginRef.where(process.env.EGUD_TOKEN_COOKIE_NAME, "==", token).get();
    if (snapShot.empty) {
        return false;
    }
    return true;
}
async function placeLoginRedirectCookie(req, res) {
    res.cookie(process.env.EGUD_LOGIN_REDIRECT_COOKIE_NAME, req.url, {
        secure: true, // well yes
        httpOnly: true, // httponly because why would you need to read this in the browser
        expires: new Date(new Date().getTime + 60 * 60000) // idk what this is it works tho
    })
}
async function checkLogin(req, res, next) {
    console.log("url: ");
    console.log(req.url);
    const url = req.url;
    if (url.includes("/login") || req.url.endsWith(".js") || req.url.endsWith(".css")) {
        return next();
    }
    const clientToken = req.cookies[process.env.EGUD_TOKEN_COOKIE_NAME];

    // check if client has a token
    if (!(clientToken != null && clientToken != undefined)) {
        await placeLoginRedirectCookie(req, res);
        res.redirect("/game/login");
        return;
    }
    // check if the token is valid

    const findResult = await findAccountWithToken(clientToken);
    if (!findResult) {
        await placeLoginRedirectCookie(req, res);
        res.redirect("/game/login");
        return;
    }

    return next();
}
router.use(checkLogin);

// actual routing stuff
router.use("/login", require("./login/EGudLogin.js"));


module.exports = router;