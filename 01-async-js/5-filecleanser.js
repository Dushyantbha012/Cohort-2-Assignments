function cleanser(text)
{
    let len= text.length;
    let output = "";
    for(let i=0;i<len;i++)
    {
        if(!((i==0&&text[0]==' ')||(text[i]==' '&&text[i-1]==' ')))
        {
            output=output+text[i];
        }
    }
    if(output[output.length-1]==' ') output = output.slice(0,output.length-1);
    output =output+".";
    return output;
}
const fs = require("fs");
fs.readFile("proto.txt","utf-8",function (err,data)
{   
    let output = cleanser(data);
    fs.writeFile("proto.txt",output,function (err)
    {
        if(err)
        {
            throw err;
        }
        console.log("Cleansed");
    })
})