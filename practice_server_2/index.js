const express = require("express");
const {z, ZodError } = require('zod');
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const e = require("express");
const jwtpass = "dushyant";

mongoose.connect("mongodb+srv://mainhibtaunga:mainhibtaunga%401@cluster0.emmqofc.mongodb.net/");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB')
});

//defining schema for entries in database
const User = mongoose.model("User",{
    name:String,
    email:String,
    username:String,
    password:String
})

//defining schema's of input in zod for verification
const emailschema = z.string().email();
const usernameschema = z.string();
const passschema = z.string().min(8);
const nameschema = z.string();

//checking if email already in use
async function userExists(entryemail,res)
{
    try
    {
        const result = await User.findOne({email: entryemail});
        return result !== null;
    }
    catch(error)
    {
        return res.status(400).send("Eroor while Accessing DataBase");
    }
}

//checking if username already in use
async function userNameExists(entryusername,res){
    try
    {
        const result = await User.findOne({username: entryusername});
        return result !==null;
    }
    catch(error)
    {
        return res.status(400).send("Eroor while Accessing DataBase");
    }

}

//starting express app
const app = express();
app.use(express.json());


app.post("/signup",async (req,res)=>
{   const UserEntry = {
    "entryemail" : req.body.email,
    "entryusername" : req.body.username,
    "entrypass" : req.body.password,
    "entryname" : req.body.name
    }
    
    //check if all the entries are of specific types or not using zod
    try {
        const validateEmail = emailschema.parse(UserEntry.entryemail);
        const validateusername = usernameschema.parse(UserEntry.entryusername);
        const validatedpass = passschema.parse(UserEntry.entrypass);
        const validatedname = nameschema.parse(UserEntry.entryname);
    } catch (error) {
        if (error instanceof ZodError) {
          return res.send("Wrong Data Entered")
        } else {
          return res.status(420).send("Something Went Wrong");
        }
      }

    // checking email and username already in use or not
    try {
        if (await userExists(UserEntry.entryemail,res)) {
            return res.status(400).send("User Already Exists");
        }
        if (await userNameExists(UserEntry.entryusername,res)) {
            return res.status(400).send("User Name Already Exists");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }

    //creating user and saving to database using mongoose
    const entryUser = User(UserEntry);

    const authkey = jwt.sign(UserEntry,jwtpass);

    entryUser.save().then((saveddoc)=>{
        if(entryUser==saveddoc) return res.status(200).json({
            "msg":"Account Created",
            "AuthKey":authkey.toString()
        });
        else return res.status(420).send("not able to save");
    })

})

//function to check if email exists and if exists matches the password

async function signIn(_email,_password,res){
    try {
        const docs = await User.find({
          $and: [
            { email: _email },
            { password: _password },
          ],
        });
      
        if (docs.length === 0) {
          // No user found
          return false;
        }
      
        // User found
        return true;
      } catch (error) {
        // Handle specific errors
        if (error instanceof mongoose.Error.CastError) {
          // Handle cast error (e.g., invalid ObjectId)
          res.status(400).send('Invalid input');
        } else {
          // Handle other errors
          res.status(500).send('Internal server error');
        }
      }
}

async function mainsignin(email,password,res)
{  
    const UserEntry = {
        "entryemail" : email,
        "entrypass" : password,
        }
        //check if all the entries are of specific types or not using zod
        try {
            const validateEmail = emailschema.parse(UserEntry.entryemail);
            const validatedpass = passschema.parse(UserEntry.entrypass);
        } catch (error) {
            if (error instanceof ZodError) {
              return res.send("Wrong Data Entered")
            } else {
              return res.sendStatus(420).send("Something Went Wrong");
            }
          }
    if(!userExists(email,res))
    {
        return res.status(420).send("Please Register. User doesn't Exists");
    }
    if(signIn(UserEntry.entryemail,UserEntry.entrypass,res))
    {
        return res.status(200).send("Signed In");
    }
    else
    {
        return res.send(204).send("Password entered is incorrect")
    }
}

app.get("/signin",async (req,res)=>{
    
    if(req.body.authkey==="NA")
    {
        mainsignin(req.body.email,req.body.password,res);
    }
    else
    {
        const authkey = req.body.authkey;
        jwt.verify(authkey,jwtpass,(error,decoded)=>{
            if(error){
                return res.status(429).send("Unable to verify key");
            }
            else{
                const email = decoded.entryemail;
                const pass = decoded.entrypass;
                mainsignin(email,pass,res);
            }

        })

    }

})

app.listen(3000);


