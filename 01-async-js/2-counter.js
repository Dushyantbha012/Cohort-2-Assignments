function timer(t)
{
    console.log(t);
    setTimeout(function()
    {
        timer(t+1);
    },1000);
}
timer(0);