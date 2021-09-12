
function pingServer(){
    $.post({
        traditional:true,
        url: baseURL + "/INTERCON/PING-TOKEN",
        contentType:"application/json",
        data: JSON.stringify({}),
        dataType: "json",
        success: (response)=>{
            if(response.succeeded == false){
                alert("Error " + response.returnCode + ", reason: " + response.returnText);
                return false;
            }
            return true; // return true when succeeded
        }
    })
    if(currentServerId != null && currentChannelId != null){
        loadChannelUI({channelId: currentChannelId, serverId: currentServerId});
    }
}