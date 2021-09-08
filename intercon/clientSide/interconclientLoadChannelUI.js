async function loadChannelUI(info){
    
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