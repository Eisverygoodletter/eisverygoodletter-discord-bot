currentServerId = null;
currentChannelId = null;
knownAuthorIds = {};
async function loadChannelUI(info){
    var send = info;
    send.msgAmount = 100;
    const reply = await getPost("/INTERCON/GET/CHANNELMSG", send);
    if(reply.succeeded == false){
        handleReplyFail(reply);
        return;
    }
    var messages = reply.returnData;
    // clean up the chat first
    $("#textList").html("");
    console.log(messages);
    // turn them into understandable html elements
    for(let i = messages.length - 1; i >= 0; i--){
        var element = document.createElement("a");
        element.href = "#";
        element.classList.add("border", "list-group-item", "list-group-action", "disabled", "bg-dark");
        // get username
        var currentUsername = "placeholder";
        //console.log(messages[i]);
        if(!(messages[i].authorID in knownAuthorIds)){
            const res = await getPost("/INTERCON/GET/AUTHORNAME", {authorId: messages[i].authorID});
            currentUsername = res.returnData;
            knownAuthorIds[messages[i].authorID] = currentUsername;
        }
        else{
            currentUsername = knownAuthorIds[messages[i].authorID];
        }
        console.log("username");
        console.log(currentUsername);
        element.textContent = currentUsername + ": " + messages[i].content;
        $("#textList").append(element);
    }
    $("#textList").scrollTop($("#textList")[0].scrollHeight);
    currentServerId = info.serverId;
    currentChannelId = info.channelId;
}

async function sendMsg(msg){
    console.log(msg);
    if(currentServerId != null && currentChannelId != null){
        // send the message
        var sendInfo = {
            serverId: currentServerId,
            channelId: currentChannelId,
            msg: msg,
        }
        const res = await getPost("/INTERCON/SET/CHANNELSEND", sendInfo);
        console.log(res);
        loadChannelUI(sendInfo);
    }
}

$(document).ready(()=>{
    $("#sendText").on("keyup", (e)=>{
        if(e.key === "Enter" || e.keyCode === 13){
            const sendText = $("#sendText").val();
            $("#sendText").val(" ");
            sendMsg(sendText);
        }
    });
});