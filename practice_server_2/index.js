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
async function userExists(entryemail)
{
    try
    {
        const result = await User.findOne({email: entryemail});
        return result !== null;
    }
    catch(error)
    {
        throw error;
    }
}

//checking if username already in use
async function userNameExists(entryusername){
    try
    {
        const result = await User.findOne({username: entryusername});
        return result !==null;
    }
    catch(error)
    {
        throw error;
    }

}

//starting express app
const app = express();
app.use(express.json());


app.post("/signup",async (req,res)=>
{   const entryemail = req.body.email;
    const entryusername = req.body.username;
    const entrypass = req.body.password;
    const entryname = req.body.name;
    
    //check if all the entries are of specific types or not using zod
    try {
        const validateEmail = emailschema.parse(entryemail);
        const validateusername = usernameschema.parse(entryusername);
        const validatedpass = passschema.parse(entrypass);
        const validatedname = nameschema.parse(entryname);
    } catch (error) {
        if (error instanceof ZodError) {
          return res.send("Wrong Data Entered")
        } else {
          return res.sendStatus(420);
        }
      }

    // checking email and username already in use or not
    try {
        if (await userExists(entryemail)) {
            return res.status(400).send("User Already Exists");
        }iamdoge
        if (await userNameExists(entryusername)) {
            return res.status(400).send("User Name Already Exists");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }

    //creating user and saving to database using mongoose
    const entryUser = User({
        email:entryemail,
        username:entryusername,
        password:entrypass,
        name:entryname
    });

    entryUser.save().then((saveddoc)=>{
        if(entryUser==saveddoc) res.status(200).send("saved");
        else res.status(420).send("not able to save");
    })

})

app.listen(3000);


