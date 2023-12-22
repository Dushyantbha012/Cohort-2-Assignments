const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {z,zoderr}= require("zod");
const dbfile = require("../db/index")
const check = z.object({
    username:z.string(),
    password:z.string().min(8)
})

// Admin Routes
router.post('/signup', async (req, res) => {
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

router.post('/courses', async (req, res) => {
    let id= await dbfile.Course.countDocuments({}, { hint: "_id_" });
    id++;
    const entry = {
        id:id,
        title:req.body.title,
        description:req.body.description,
        price:parseInt(req.body.price),
        image:req.body.imageLink
    }
    const newCourse = dbfile.Course(entry);
    await newCourse.save();
    const founduser = await dbfile.Admin.findOne({username:req.body.username})
    const temp = [id];
    const list = founduser.courses.concat(temp);
    await dbfile.Admin.updateOne({username:req.body.username},{$set:{courses:list}});
    res.send("Course Created Successfully, Course Id is "+id)
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const user = req.body.username;
    const courselist = (await dbfile.Admin.findOne({username:user})).courses;
    let courses = [];
    for(let i=0;i<courselist.length;i++)
    {
        let coursetemp = await dbfile.Course.findOne({id:courselist[i]});
        let temp = [{coursetemp}];
        courses = courses.concat(temp);
    }
    res.send(courses);
});

module.exports = router;