import express from "express";
import path from "path";
import mongoose from "mongoose";
import { name } from "ejs";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbname: "backend",
  })
  .then(() => console.log("Database connected"))
  .catch(() => console.log(e));

//schema
const msgschema = new mongoose.Schema({
  name: String,
  email: String,
});

//model==collection(messages)
const message = new mongoose.model("Message", msgschema);

const app = express();
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: "true" }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.get("/users", (req, res) => {
  res.json({ users });
});
app.post("/", async (req, res) => {
  const { name, email } = req.body;
  await message.create({ name, email });
  res.redirect("/success");
});

//server
app.listen(5000, () => {
  console.log("Server is running...!");
});
