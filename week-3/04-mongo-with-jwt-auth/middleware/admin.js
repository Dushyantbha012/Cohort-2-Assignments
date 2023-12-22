// Middleware for handling auth
const dbfile = require("../db/index")
const jwt = require("jsonwebtoken")
const jwtpass = "dushyant"
async function adminMiddleware(req, res, next) {
    try{
        const token = req.body.auth;
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
        const decode = jwt.verify(token,jwtpass)
        const user = await dbfile.Admin.findOne({$and:[
            {'username':decode.username},{'password':decode.password}
        ]})
        if(!user) return res.status(404).send("User Not Found, Please create an Account")
        req.body.username = decode.username.toString();
        next()
    }
    catch{
        res.send("Not Verified")
    }
}

module.exports = adminMiddleware;