
function pingServer(){
    $.post({
        traditional:true,
        url: baseURL + "/INTERCON/PING-TOKEN",
        contentType:"application/json",
        data: JSON.stringify(null),
        dataType: "json",
        success: (response)=>{
            console.log(response);
            if(response.succeeded == false){
                alert("Error " + response.returnCode + ", reason: " + response.returnText);
                return false;
            }
            return true; // return true when succeeded
        }
    })
}