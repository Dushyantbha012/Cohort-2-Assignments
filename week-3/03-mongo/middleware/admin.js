// Middleware for handling auth
const dbfile = require("../db/index.js")
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.body.username;
    const password = req.body.password;
    try{
        const user = await dbfile.Admin.findOne({
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

module.exports = adminMiddleware;