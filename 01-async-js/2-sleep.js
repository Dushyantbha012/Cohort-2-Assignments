function sleep(t)
{
    let initial = (new Date()).getTime();
    let final = (new Date()).getTime();
    while(final-initial<t)
    {
        final=(new Date()).getTime();
    }
}
console.log("start");
sleep(2000);
console.log("end");