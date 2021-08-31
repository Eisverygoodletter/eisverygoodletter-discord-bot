async function downloadToPath(pathName, imageURL){
    return new Promise(resolve => {
        const file = global.fs.createWriteStream(pathName);
        const request = global.http.get(imageURL, function(response){
            response.pipe(file);
            resolve();
        })
    });
}


module.exports = {
    downloadToPath
}