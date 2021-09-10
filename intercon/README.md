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
from client - server side, the password is encrypted in AES. The encryption key is the current date. Example:
```javascript
const password = "cool password"
let today = new Date().toLocaleDateString();
const encPassword = CryptoJS.AES.encrypt(password, today).toString();
```
bcrypt is used on the serverside to hash the passwords before sending them into the database.\
The hashing salt is in the environmental variables and nobody remembers what it is

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
    const token = res.returnData;
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
note: name is slightly inaccurate\
does not take in any parameters\
returns an array of objects in the form of 
```javascript
{
    serverId, // number
    channelId // number
}
```
note that serverIds can repeat if there are multiple channels allowed in the same server.
<details>
<summary>Example</summary>

```javascript
// use getPost
const res = await getPost("/INTERCON/GET/SERVERLIST", {});
// check if succeeded
if(res.succeeded){
    // remember, everything is in returnData
    const list = res.returnData;
    for(let i = 0; i < list.length; i++){
        // going through the list and logging the channel
        // and server ids (note they are not names)
        console.log(list[i].serverId);
        console.log(list[i].channelId);
    }
}
```
</details>

- ## /INTERCON/GET/SERVERICON
used to get the icon of the list of servers the client is allowed\ 
returns a list of objects with\
requires no parameters\
```javascript
{
    icon, // a web link for the icon in the discord cdn.
    serverId // a number
}
```
note that this request is often used in conjunction with `/INTERCON/GET/SERVERLIST`. The objects they send out both contain the `serverId` property (as with all new requests that return a list of data).
It is also often used with `/INTERCON/GET/IMAGE` to get the base64 string representation of the image
<details>
<summary>Example</summary>

```javascript
const res = await getPost("/INTERCON/GET/SERVERICON", {});
if(res.succeeded){
    const list = res.returnData;
    for(let i = 0; i < list.length; i++){
        // create an img element
        var imgElement = document.createElement("img");
        // get icon base64 string
        const resp = await getPost("/INTERCON/GET/IMAGE", {webPath: list[i].icon});
        if (resp.succeeded) {
            imgElement.src = resp.returnData;
            // always remember to append the element after creating it.
            someContainerElement.append(imgElement);
        }
    }
}
```
</details>

- ## /INTERCON/GET/SERVERNAME
gets the name of a server from the provided serverId\
required parameter is  `serverId`\
often used in conjunction with `/INTERCON/GET/SERVERLIST` for getting the server names from the id provided in the list.
<details>
<summary>Example</summary>

```javascript
// get a list of server names
var res = await getPost("/INTERCON/GET/SERVERLIST", {});
// check for success
if(res.succeeded == false){
    return
}
// get list from server list (has repeats)
const list = res.returnData;
// do it yourself, just make the list unique
const unrepeatingList = uniqifyList(list);
// the array we will store our names in
var serverNameList = [];
for(let i = 0; i < unrepeatinglist.length; i++){
    // do a post request for each server id
    res = await getPost("/INTERCON/GET/SERVERNAME", {serverId: list[i].serverId});
    if(res.succeeded){
        // add it to the list if request succeeds
        serverNameList.push(res.returnData);
    }
}
// log it
console.log(serverNameList);
```
</details>

- ## /INTERCON/GET/CHANNELNAME
works exactly the same way as `/INTERCON/GET/SERVERNAME`\
requires two parameters: `serverId` and `channelId`\
returns a string

- ## /INTERCON/GET/CHANNELMSG
returns an array of **raw** discord message objects.
required parameters: `serverId`, `channelId`, and `msgAmount`
due do this being an array of **raw** discord `message` objects,\
it is likely that some objects like the `author` property, which is a\
`get` function will be removed when being stringified in JSON

- ## /INTERCON/GET/IMAGE
returns the base64 string representation of the image.
requires `webPath`.
Although you can normally just directly request the discord cdn for a message,\
this method of getting the image keeps your connections consistent as you are\
only trying to access data from 1 server.

