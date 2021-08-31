global.verifyToken = function(token){
    var tokenObj = global.tokenList.find((element)=> element.token == token);
    return tokenObj;
}



module.exports = function (app, client){
    /* --- PING-TOKEN --- */
    app.post("/INTERCON/PING-TOKEN", async (req, res)=>{
        //console.log(req.cookies);
        const clientToken = req.cookies[process.env.tokenCookie];
        var returnInfo;
        if(global.verifyToken(clientToken) != undefined){
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
                returnCode: 408,
                returnText: "token doesnt exist. Session timeout",
            };
        }
        res.send(returnInfo);
    });
    /* --- GET/SERVERLIST --- */
    app.post("/INTERCON/GET/SERVERLIST", async (req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        var returnInfo = null;
        const tokenObj = global.verifyToken(clientToken);
        if(tokenObj != undefined){
            returnInfo = {
                succeeded:true,
                returnCode: 200,
                returnText: "success",
                returnData: tokenObj.allowedList, // this is a getter function. no brackets
            }
        }
        else{
            returnInfo = {
                succeeded:false,
                returnCode: 408,
                returnText: "token doesn't exist. Session timeout"
            }
        }
        res.send(returnInfo);
    });
    /* --- GET/SERVERICON --- */
    app.post("/INTERCON/GET/SERVERICON", async (req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        const tokenObj = global.verifyToken(clientToken);
        var returnInfo = null;
        if(tokenObj != undefined){
            returnInfo = {
                succeeded: true,
                returnCode: 200,
                returnText: " success",
                returnData: tokenObj.iconList,
            }
        }
        else{
            returnInfo = {
                succeeded: false,
                returnCode: 408,
                returnText: "session timeout",
            }
        }
        res.send(returnInfo);
    });
    app.post("/INTERCON/GET/IMAGE/:imagePath/:webPath", async (req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        var tokenObj = global.verifyToken(clientToken);
        if(tokenObj != undefined){
            res.send({
                succeeded: false,
                returnCode: 408,
                returnText: "session timeout",
            })
        }
        else{
            const imagePath = req.params.imagePath;
            const webPath = req.params.webPath;
            var actualPath = global.path.join(__dirname, process.env.IMAGEPATHNAME, imagePath);
            if(fs.existsSync(actualPath)){
                // make a request for the image from the discord cdn
                await global.downloadImageJS.downloadToPath(actualPath, webPath);
            }
            // get the image in base64 encryption
            const base64String = globla.fs.readFileSync(actualPath, "base64");
            res.send({
                succeeded: true,
                returnCode: 200,
                returnText: "succeeded",
                returnCode: base64String,
            });
        }
    });
}