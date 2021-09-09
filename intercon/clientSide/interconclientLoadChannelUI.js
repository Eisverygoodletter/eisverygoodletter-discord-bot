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
        element.textContent = messages[i].author + ": " + messages[i].content;
        $("#textList").append(element);
    }
    $("#textList").scrollTop($("#textList")[0].scrollHeight);
}

async function sendMsg(event){
    console.log($("#sendText").val());
}

$(document).ready(()=>{
    $("#sendText").on("keyup", (e)=>{
        if(e.key === "Enter" || e.keyCode === 13){
            const sendText = $("#sendText").val();
            $("#sendText").val(" ");
        }
    });
});