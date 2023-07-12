const express = require("express");
require("dotenv").config();
require("./config/database");


const app = express();
const port = process.env.PORT;
const usersRouter = require("./routes/userRoute")
const todolistRouter = require("./routes/todolistRoute")

app.use(express.json());
app.use("/api/users", usersRouter)
app.use("/api/todolist", todolistRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})