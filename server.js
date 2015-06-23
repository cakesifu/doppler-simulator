import express from "express";

let app = express();

app.use("/assets", express.static(".dist"));
app.use("/", express.static("static"));

app.listen(3000, function(err) {
  if (err) {
    console.error("Something went terribly wrong", err);
    return;
  }

  console.log("Open browser to: http://127.0.0.1:3000/");
});
