const store = require("./store.js");

const express = require("express");
const app = express();

app.get("/", (req, res) => res.json(store.getPhotos()));

app.get("/photo/:photo_id", (req, res) =>
  res.json(store.getPhoto(req.params.photo_id))
);

app.listen(3001, () => console.log("Example app listening on port 3001!"));
