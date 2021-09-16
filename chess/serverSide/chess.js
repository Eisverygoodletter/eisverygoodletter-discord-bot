// use angular js & express.router

var express = require("express.js");
var router = express.Router();

router.get("/", async (req,res)=>{
    res.send("no chess");
});


module.exports = router;