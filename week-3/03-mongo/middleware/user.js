const dbfile = require("../db/index.js")
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.body.username;
    const password = req.body.password;
    try{
        const user = await dbfile.User.findOne({
            $and:[
                {'username':username},
                {'password':password}
            ]
        })
        if(user) return next();
        return res.sendStatus(404);
    }catch{
        return res.sendStatus(404);
    }
}

module.exports = userMiddleware;