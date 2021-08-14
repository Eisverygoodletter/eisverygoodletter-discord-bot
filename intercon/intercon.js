

module.exports = function(app, client){
    // first, define the webpage send
    app.get("/intercon", function(req,res){
        res.sendFile("./intercon/intercon.html", {root: __dirname});
    });
    app.get("/INTERCON/LOGIN", function(req, res){
        
    })
}