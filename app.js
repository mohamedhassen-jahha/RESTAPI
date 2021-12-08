require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/dbConnect");
const express = require("express");

const app = express();

app.use(express.json());
connectDB();

app.use("/", require("./Routes/user"));
app.use("*", (req, res) => {
  res.send("404 - PAGE NOT FOUND");
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err
    ? console.log("err=", err)
    : console.log(`Server running on port ${PORT}`);
});
