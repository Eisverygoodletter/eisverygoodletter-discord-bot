function downloadToPath(pathName, imageURL){
    const file = global.fs.createWriteStream(pathName);
    const request = global.https.get(imageURL, function(response){
        response.pipe(file);
        console.log("piping to file :)");
    })
}


module.exports = {
    downloadToPath
}