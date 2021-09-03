
async function getImageBase64(imageURL){
    return new Promise(resolve => {
        global.https.get(imageURL, (resp)=>{
            resp.setEncoding("base64");
            var ret = "data:" + resp.headers["content-type"] + ";base64,";
            resp.on("data", (data) => {ret += data});
            resp.on("end", ()=>{
                resolve(ret);
            });
        }).on("error", (e)=>{
            console.log(e);
            resolve('empty');
        });
    });
}


module.exports = {
    downloadToPath,
    getImageBase64
}