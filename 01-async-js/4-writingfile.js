const fs = require("fs");
fs.writeFile("proto.txt","hehehhehe",(err)=>
{
    if(err)
    {
        throw err;
    }
    console.log("hehehe");
})