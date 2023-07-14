let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
require("dotenv").config();
let app = express();
// const PORT = 5000;
let { userRouter } = require("./routers/userRouter.js");
let router = require("./routers/router.js");
let cors = require("cors");

//MIDDLEWARES

app.use(cors());
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));

//To connect the routes to the express application
app.use(userRouter);
app.use(router);
// app.use("/task", router);

//DB connection
const db = process.env.MONGO_URI;

let PORT = process.env.PORT || 5000;
mongoose
  .connect(
    db
    // "mongodb+srv://loganayaki:MERNpassword123@recipes.xynjrvw.mongodb.net/recipes?retryWrites=true&w=majority"
    // { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected to db + ");
    console.log(db);
  });

//At the end of the file
app.listen(PORT, () => console.log("Connected to port"));
