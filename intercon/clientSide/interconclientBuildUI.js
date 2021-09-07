
async function buildUI(){
    const serverListResp = await getPost("/INTERCON/GET/SERVERLIST", {});
    if(serverListResp.succeeded == false){
        alert("failed to get server list. Error " + serverListResp.returnCode + ", reason: " + serverListResp.returnText);
        location.reload();
    }
    else{
        const allowedList = serverListResp.returnData;
        // get list of icon urls
        const iconList = (await getPost("/INTERCON/GET/SERVERICON", {})).returnData;
        var addedServerIcons = [];
        console.log(iconList);
        for(let i = 0; i < allowedList.length; i++){
            if(!addedServerIcons.includes(allowedList[i].serverId)){
                addedServerIcons.push(allowedList[i].serverId);
                var newButton = document.createElement("button");
                var newIcon = iconList.find((element) => element.serverId === allowedList[i].serverId).icon;
                var actualIcon = document.createElement("img");
                //actualIcon.src = newIcon;
                //console.log(newIcon);
                // newIcon is the url to the discord image. We need to send this request to the server
                // and get the image from there
                const sendInfo = {
                    webPath: newIcon,
                    imagePath: allowedList[i].serverId.toString() + ".jpg",
                }
                const dataScheme = (await getPost("/INTERCON/GET/IMAGE", sendInfo));
                console.log(dataScheme);
                actualIcon.src = dataScheme.returnData;
                $("#sidebarGroup").append(newButton);
                newButton.append(actualIcon);
                // set button stats
                newButton.classList.add("rounded-circle");
                newButton.style.position = "absolute";
                newButton.style.left = "15%";
                // set image stats
                actualIcon.classList.add("rounded-circle");
                actualIcon.style.width = "5vw";
                actualIcon.style.height = "5vw";
                let remberInfo = allowedList[i].serverId;
                newButton.onclick = ()=>{generateChannelUI(remberInfo)}
            }
        }
    }
}
