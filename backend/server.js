require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose")
const helmet = require("helmet")
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./routes/user')
const statusRouter = require('./routes/status')
const app = express();

//  Security Middleware
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize({ replaceWith: '_' }));

//  Mongoose Config
mongoose.set("strictQuery", false);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT || 4000, () => {
            console.log("db connected and Server running on port", process.env.PORT || 4000);
          });
    }).catch(err=>{
        console.log("ERROR in db connection" ,err);
})

app.use("/api/user",userRouter)
app.use("/api/status",statusRouter)



process.env