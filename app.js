const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to db 👍👍..")
    const port = 3000;
    app.listen(port, console.log(`Server listening on port ${port}💃💃!!`));
  } catch (error) {}
};

start()
