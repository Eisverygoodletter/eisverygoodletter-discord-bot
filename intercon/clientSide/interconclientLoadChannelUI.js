async function loadChannelUI(info){
    const reply = await getPost("/INTERCON/GET/CHANNELMSG");
    if(reply.succeeded == false){
        handleReplyFail(reply);
        return;
    }
    var messages = reply.returnData;
    // turn them into understandable html elements
    console.log(messages);
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