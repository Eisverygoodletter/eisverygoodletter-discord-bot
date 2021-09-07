async function generateChannelUI(info){
    // first, get a new channel/server list from INTERCON/GET/SERVERLIST
    const result = await getPost("/INTERCON/GET/SERVERLIST", {});
    // check if result succeeds
    if(result.succeeded == false){
        alert("error " + result.returnCode + ", reason: " + result.returnText);
        location.reload();
        return;
    }
    // clear entire current channel list
    $("#channelbarGroup").html("");
    // get a list of the required channelIds
    var channelIdList = [];
    for(let i = 0; i < result.returnData.length; i++){
        if(result.returnData[i].serverId == info){
            channelIdList.push(result.returnData[i].channelId);
        }
    }
    // get list of channel names
    var channelNames = [];
    for(let i = 0; i < channelIdList.length; i++){
        const res = await getPost("/INTERCON/GET/CHANNELNAME", {serverId: info, channelId: channelIdList[i]});
        if(res.succeeded == false){
            alert("oof");
            break;
        }
        channelNames.push(res.returnData);
    }
    // generate elements for each channel name
    // also, link them to the loadChannel function
    for(let i = 0; i < channelNames.length; i++){
        var element = document.createElement("button");
        element.textContent = "#" + channelNames[i];
        element.classList.add("btn");
        element.classList.add("btn-dark");
        $("#channelbarGroup").append(element);
        let rember = {serverId: info, channelId: channelIdList[i]};
        element.onclick = ()=>{loadChannelUI(rember);};
    }
}