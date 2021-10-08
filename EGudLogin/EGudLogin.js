var router = global.express.Router()
var loginCache;
async function findAccountWithToken(token){
    const loginRef = global.db.collection("eGudUsers");
    const snapShot = await loginRef.where(process.env.EGUD_TOKEN_COOKIE_NAME, "==", token).get();
    if(snapShot.empty){
        return false;
    }
    return true;
}
async function placeCookie(req, res){
    res.cookie(process.env.EGUD_LOGIN_REDIRECT_COOKIE_NAME, req.url, {
        secure: true, // well yes
        httpOnly: true, // httponly because why would you need to read this in the browser
        expires: new Date(new Date().getTime + 60 * 60000) // idk what this is it works tho
    })
}
router.use(async function checkLogin (req, res, next){
    
    const clientToken = req.cookies[process.env.EGUD_TOKEN_COOKIE_NAME];
    // check if client has a token
    if (!(clientToken != null && clientToken != undefined)) {
        await placeCookie(req, res);
        res.redirect("/login");
        next();
        return;
    }
    // check if the token is valid
    var findResult = await findAccountWithToken(clientToken);
    if(!findResult){
        await placeCookie(req, res);
        res.redirect("/login");
        next();
        return;
    }
    next();
});