# intercon.js server documentation
the server relies on POST requests for pretty much everything. It also uses Express js's JSON middleware. the CORS policy is also used.
## The return standard
All functions made in the intercon module return an object like this:
```javascript
{
    succeeded: true, // a bool
    returnCode: 200, // 403 if user doesn't exist
    returnText: "succeeded" // a string for error message
    returnData: // this only exists if the request succeeds
}
```
Here is a function that is commonly used on the client side to get their values 
```javascript
const baseURL = "https://eisverygoodletter-discord-bot.herokuapp.com";
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
};
```
an example of using this would be 
```javascript
const res = await getPost("/INTERCON/GET/CHANNELNAME",{serverId: 12345, channelId: 12345});
if(res.succeeded){
    const channelname = res.returnData;
}
else{
    alert("error:" + res.returnCode + "reason:" + res.returnText);
}
```

# the password encryption standard
from client - server side, it is encrypted in AES. The encryption key is the current date. Example:
```javascript
const password = "cool password"
let today = new Date().toLocaleDateString();
const encPassword = CryptoJS.AES.encrypt(password, today).toString();
```

## list of all POST requests allowed
- ## /INTERCON/LOGIN
takes in an object with a `passWord` and a `userName` property.
and sets a cookie with the token for this session. Example:
<details>
<summary>Example</summary>

```javascript
const encPassword = "already encrypted password"
const username = "username"
const res = await getPost("/INTERCON/LOGIN",{userName: username, passWord: encPassword});
if (res.succeeded) {
    const token = res.returnData
}
```
</details>

- ## /INTERCON/CREATE_ACC
takes in an object with a `passWord` and a `userName` property. Works exactly the same way with the same return value as `/INTERCON/LOGIN`. no example provided here (see above)

- ## /INTERCON/PING-TOKEN
A ping that refreshes the Token. This needs to be called every 15 seconds to refresh the token, or the token will become invalid.

<details>
<summary>Example</summary>

```javascript
const res = await getPost("/INTERCON/PING-TOKEN",{});
if(res.succeeded == false){
    alert("failed to ping!");
    location.reload();
}
```
</details>

- ## /INTERCON/GET/SERVERLIST
note: name is slightly inaccurate
returns an array 

## list of all file GET requests allowed
figure it out yourself