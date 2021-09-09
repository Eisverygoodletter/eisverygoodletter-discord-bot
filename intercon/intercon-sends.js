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


    // INFO IN TERMS OF SERVER AND CHANNEL NAMES AND ID *****************************************************************************



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
    /* --- GET/SERVERNAME --- */
    app.post("/INTERCON/GET/SERVERNAME", async(req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        const tokenObj = global.verifyToken(clientToken);
        var returnInfo = null;
        if(tokenObj != undefined){
            const server = client.guilds.cache.get(req.body.serverId);
            const name = server.name;
            returnInfo = {
                succeeded:true,
                returnCode: 200,
                returnText: "success",
                returnData: name,
            };
        }
        else{
            returnInfo = {
                succeeded: false,
                returnCode: 408,
                returnText: "session timeout",
            };
        }
        res.send(returnInfo);
    });
    /* --- GET/CHANNELNAME --- */
    app.post("/INTERCON/GET/CHANNELNAME", async(req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        const tokenObj = global.verifyToken(clientToken);
        var returnInfo = null;
        if(tokenObj != undefined){
            const server = client.guilds.cache.get(req.body.serverId);
            const channel = server.channels.cache.get(req.body.channelId);
            returnInfo = {
                succeeded: true,
                returnCode: 200,
                returnText: "success",
                returnData: channel.name,
            }
        }
        else{
            returnInfo = {
                succeeded:false,
                returnCode: 408,
                returnText: "session timeout"
            }
        }
        res.send(returnInfo);
    });

    /* --- GET/CHANNELMSG --- */
    app.post("/INTERCON/GET/CHANNELMSG", async(req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        const tokenObj = global.verifyToken(clientToken);
        var returnInfo;
        if(tokenObj != undefined){
            if(tokenObj.containsChannel(req.body.serverId, req.body.channelId)){
                // fetch messages
                const server = client.guilds.cache.get(req.body.serverId);
                const channel = server.channels.cache.get(req.body.channelId);
                var messages = await channel.messages.fetch({limit: 100});
                returnInfo = {
                    succeeded: true,
                    returnCode: 200,
                    returnText: "=)",
                    returnData: messages,
                }
            }
            else{
                returnInfo = {
                    succeeded: false,
                    returnCode: 403,
                    returnText: "no access allowed"
                }
            }
        }
        else{
            returnInfo = {
                succeeded:false,
                returnCode: 408,
                returnText: "session timeout",
            }
        }
        res.send(returnInfo);
    });



    // IMAGE INFO *********************************************************************************************************



    app.post("/INTERCON/GET/IMAGE", async (req, res)=>{
        const clientToken = req.cookies[process.env.tokenCookie];
        var tokenObj = global.verifyToken(clientToken);
        if(tokenObj == undefined){
            res.send({
                succeeded: false,
                returnCode: 408,
                returnText: "session timeout: failed to get image",
            })
        }
        else{
            const imagePath = req.body.imagePath;
            const webPath = req.body.webPath;
            /*
            var actualPath = global.path.join(__dirname, process.env.IMAGEPATHNAME, imagePath);
            if(!fs.existsSync(actualPath)){
                // make a request for the image from the discord cdn
                console.log("downloading from cdn: " + webPath);
                global.downloadImageJS.downloadToPath(actualPath, webPath);
            }
            console.log("getting dem file");
            */
            // get the image in base64 encryption
            const base64String = await global.downloadImageJS.getImageBase64(webPath);
            res.send({
                succeeded: true,
                returnCode: 200,
                returnText: "succeeded",
                returnData: base64String,
            });
        }
    });
}