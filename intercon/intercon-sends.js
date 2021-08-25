
module.exports = function (app, client){
    app.post("/INTERCON/PING-TOKEN", (req, res)=>{
        console.log(req.cookies);
        var returnInfo;
        returnInfo = {
            succeeded: true,
            returnCode: 200,
            returnText: "success"
        };
        res.send(returnInfo);
    });
}