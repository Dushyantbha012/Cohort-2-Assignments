const dbfile = require("../db/index")
const jwt = require("jsonwebtoken")
const jwtpass = "dushyant"
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    const token = req.body.auth;
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try{
        const decode = jwt.verify(token,jwtpass)
        const user = await dbfile.User.findOne({$and:[
            {'username':decode.username},{'password':decode.password}
        ]})
        if(!user) return res.status(404).send("User Not Found, Please create an Account")
        req.body.username = decode.username.toString();
        next()
    }
    catch(err)
    {
        return res.send("Not Verified");
    }
}

module.exports = userMiddleware;
