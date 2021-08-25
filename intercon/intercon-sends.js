
module.exports = function (app, client){
    app.post("/INTERCON/PING-TOKEN", async (req, res)=>{
        //console.log(req.cookies);
        const clientToken = req.cookies[process.env.tokenCookie];
        // check if such a token exists in the global
        const tokenExist = global.tokenList.some((element) => element.token == clientToken);
        var returnInfo;
        if(tokenExist){
            var tokenObj = global.tokenList.find((element) => element.token == clientToken);
            tokenObj.pinged = true;
            returnInfo = {
                succeeded: true,
                returnCode: 200,
                returnText: "success"
            };
        }
        else{
            returnInfo = {
                succeeded: false,
                returncode: 418,
                returnText: "token doesnt exist. Session timeout",
            };
        }
        res.send(returnInfo);
    });
}