const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserRouter = require("./routers/UserRouter.js");
const ProductRouter = require("./routers/ProductRouter.js");
const OrderRouter = require("./routers/OrderRouter.js");

// configure app
const app = express();

// port
const PORT = process.env.PORT || 5000;

// configure cors
app.use(cors());

// configure dot env
dotenv.config({
  path: "./.env",
});

// get data from request body
app.use(express.json({ limit: "5mb" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// DATA BASE CONNECTION
mongoose
  .connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1); // end the process
  });

// ROUTERS
app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING SUCCESSFULLY");
});
