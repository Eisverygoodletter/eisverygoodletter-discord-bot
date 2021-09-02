async function downloadToPath(pathName, imageURL){
    return new Promise(resolve => {
        const file = global.fs.createWriteStream(pathName);
        const request = global.https.get(imageURL, function(response){
            response.pipe(file);
            console.log("piping to file :)");
            resolve();
        })
    });
}


module.exports = {
    downloadToPath
}