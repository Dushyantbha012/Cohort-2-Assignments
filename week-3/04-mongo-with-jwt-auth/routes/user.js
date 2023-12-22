const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const jwtpass = "dushyant"
const {z,zoderr}= require("zod");
const dbfile = require("../db/index")
const check = z.object({
    username:z.string(),
    password:z.string().min(8)
})

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const entry={
        username:req.body.username,
        password:req.body.password,
        courses : []
    }
    try{
        const validatedentry = check.parse(entry);
        const userfind = await dbfile.Admin.findOne({username:entry.username});
        if(userfind) return res.send("User Already Exists");
        else{
            const newUser = new dbfile.Admin(entry);
            await newUser.save();
            res.send("Admin Created Successfully")
        }
    }
    catch(err)
    {
        return res.sendStatus(679);
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const entry ={
        username:req.body.username,
        password:req.body.password
    }
    const user = await dbfile.Admin.findOne({
        $and:[
            {'username':entry.username},
            {'password':entry.password}
        ]
    })
    if(user){
        return res.send(jwt.sign(entry,jwtpass));
    }
    else{
        res.send("Create an account")
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const length = await dbfile.Course.countDocuments({},{hint:"_id_"});
    let courses = [];
    for(let i=1;i<=length;i++)
    {
        let course = await dbfile.Course.findOne({id:i});
        let temp = [{course}];
        courses = courses.concat(temp);
    }
    res.send(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const founduser = await dbfile.User.findOne({username:req.body.username})
    const temp = [parseInt(req.params.courseId,10)];
    const list = founduser.courses.concat(temp);
    await dbfile.User.updateOne({username:req.body.username},{$set:{courses:list}});
    res.send("Course Added Successfully")
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = req.body.username;
    const courselist = (await dbfile.User.findOne({username:user})).courses;
    let courses = [];
    for(let i=0;i<courselist.length;i++)
    {
        let course = await dbfile.Course.findOne({id:courselist[i]});
        let temp = [{course}];
        courses=courses.concat(temp);
    }
    res.send(courses);
});
module.exports = router;