baseURL = "https://eisverygoodletter-discord-bot.herokuapp.com"
async function getPost(url, data) {
    return new Promise(resolve => {
        $.post({
            traditional: true,
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: (response) => {
                resolve(response);
            }
        })
    });
}