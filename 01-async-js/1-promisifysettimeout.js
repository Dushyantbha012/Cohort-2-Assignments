function wait(n)
{   let p =new Promise(function(resolve){
        setTimeout(function(){
            resolve("hehehehe");
        },n)    
    })
    return p;
}
function print(){console.log("done")}
wait(5000).then(print);


