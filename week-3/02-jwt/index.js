const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const {z,zodError} = require("zod");

const check =z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

function signJwt(_username, _password) {
    try{
        check.parse({email:_username,password: _password});
        const payload = {
            username: _username,
            password: _password,
        };
        return jwt.sign(payload,jwtPassword);
    }
    catch{
        return null;
    }
}

function verifyJwt(token) {
    try{
        const decode = jwt.verify(token,jwtPassword)
        return true
    }
    catch(err)
    {
        return false;
    }
}

function decodeJwt(token) {
    try{
        const decode = jwt.decode(token);
        if(decode) return true;
        else return false;
    }
    catch(err)
    {
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
