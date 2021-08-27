// jquery allowed in here
const baseURL = "https://eisverygoodletter-discord-bot.herokuapp.com";
var username = null;
var ID = null;

async function getPost(url, data){
    return new Promise(resolve => {
        $.post({
            traditional:true,
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: (response) =>{
                resolve(response);
            }
        })
    });
}

async function buildUI(){
    const serverListResp = await getPost("INTERCON/GET/SERVERLIST", {});
    if(serverListResp.succeeded == false){
        alert("failed to get server list. Error " + serverListResp.returnCode + ", reason: " + serverListResp.returnText);
        location.reload();
    }
    else{
        const allowedList = serverListResp.data;
        // get list of icon urls
        const iconList = (await getPost("INTERCON/GET/SERVERICON"), {}).data;
        console.log(allowedList);
        console.log(iconList);
    }
}

function createAccount(username, encPassword){
    // create a new account
    console.log("requesting for creating a new account");
    $.post({
        traditional: true,
        url: baseURL + "/INTERCON/CREATE_ACC",
        contentType: "application/json",
        data:JSON.stringify({userName: username, passWord: encPassword}),
        dataType: "json",
        success: (response)=>{
            console.log(response);
            if(response.succeeded === true){
                const token = response.token; // note that token MUST NOT BE IN PUBLIC SCOPE AND MUST NOT BE SHOWN
                // token will act as a password for the current section. It is to be protected by the https protocol
                return token;
            }
            else{
                alert("failed to create account. Error " + response.returnCode.toString() + ", reason: " + response.returnText);
                //alert("this page will now be reloaded.");
                location.reload();
                return false;
            }
        }
    });
}

function loginAccount(username, encPassword){
    $.post({
        traditional: true,
        url: baseURL + "/INTERCON/LOGIN",
        contentType: "application/json",
        data: JSON.stringify({userName: username, passWord: encPassword}),
        dataType: "json",
        success: (response)=>{
            console.log(response);
            if(response.succeeded == true){
                const token = response.token;
                return token;
            }
            else{
                alert("failed to login to account. Error " + response.returnCode.toString() + ", reason: " + response.returnText);
                location.reload();
            }
        }
    })
}
var globalPingIntervalId = null;

$(document).ready(function(){
    // put all code in here
    $("#loginModal").modal("show");
    $("#login").click(function(){
        if($("#modalUsernameInput").val() == ""){
            alert("error: you need to put in a username");
        }
        else if($("#modalPasswordInput").val() == ""){
            alert("error: you need to put in a password");
        }
        else{
            // close BOX
            $("#loginModal").modal("hide");
            username = $("#modalUsernameInput").val();
            const password = $("#modalPasswordInput").val(); //hashing will be done on serverside
            // code put here is exposed to the public and the hashing algorithm / salt will be known
            // a basic encryption will be added so that hackers can't just wireshark with no effort
            let today = new Date().toLocaleDateString();
            const encPassword = CryptoJS.AES.encrypt(password, today).toString(); // encryption using today's date
            var token;
            if($("#modalNewInput").is(":checked")){
                token = createAccount(username, encPassword);
                buildUI();
                //console.log(token);
            }
            else{
                // login to the old account
                console.log("requesting for log in...");
                token = loginAccount(username, encPassword);
                buildUI();
            }
            // clean this function off
            $("#login").onclick = null;
            //$("#loginModal").modal("hide"); // destruction of the modal
            
            // activate ping interval
            globalPingIntervalId = setInterval(pingServer, 15000);
        }
    });
})