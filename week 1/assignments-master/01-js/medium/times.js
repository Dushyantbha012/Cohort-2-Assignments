/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    let currentdate = new Date();
    let inmin = currentdate.getMinutes();
    let insec = currentdate.getSeconds();
    let inmil = currentdate.getMilliseconds(); 
    let sum=0;
    for(let i=1;i<=n;i++) sum = sum+n;
    let fmin = currentdate.getMinutes();
    let fsec = currentdate.getSeconds();
    let fmil = currentdate.getMilliseconds();
    let output = (fmin-inmin)*(60000)+(fsec-insec)*(1000)+(fmil-inmil);
    return output;
}