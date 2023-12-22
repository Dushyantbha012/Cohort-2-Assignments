const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://dushyantbha012:Moderndps%401@cluster0.emmqofc.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    courses : {
        type: [Number], // Array of strings
        default: [],    // Default value is an empty array
      }
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    courses : {
        type: [Number], // Array of strings
        default: [],    // Default value is an empty array
      }
});

const CourseSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description : String,
    price : Number,
    imageLink : String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}