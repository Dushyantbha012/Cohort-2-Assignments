//modified easy level problem to medium one
let second1 = (new Date()).getTime();
let min =0;
let hour=0;
setInterval(()=>
{
    let second2 = (new Date()).getTime();
    let second = Math.floor((second2-second1)/1000)
    if(second==60)
    {
        second1=second2;
        second=0;
        min++;
    }
    if(min==60)
    {
        min=0;
        hour++;
    }
    console.log(hour+" : "+min+" : "+second);
},1000)