const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user.js")
const PORT = 3000;
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.json())
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});