function waitOneSecond() {
    let p = new Promise(function(resolve)
    {
        setTimeout(resolve,1000);
    })
    return p;
}

function waitTwoSecond() {
    let p = new Promise(function(resolve)
    {
        setTimeout(resolve,2000);
    })
    return p;
}

function waitThreeSecond() {
    let p = new Promise(function(resolve)
    {
        setTimeout(resolve,3000);
    })
    return p;
}

function calculateTime() {
    let initial =(new Date()).getTime()
    Promise.all([waitOneSecond(),waitTwoSecond(),waitThreeSecond()]).then(function()
    {
        let final = (new Date()).getTime();
        console.log(final-initial);
    })
}
calculateTime();