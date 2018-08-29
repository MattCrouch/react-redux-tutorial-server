const store = require("./store.js");

const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/photos", (req, res) => res.json(store.getPhotos()));

app.get("/photos/:photo_id", (req, res) => {
  res.json(store.getPhoto(req.params.photo_id));
});

app.post("/comments", (req, res) => {
  const comment = store.addComment(
    req.body.photo_id,
    req.body.user_id,
    req.body.comment
  );

  return res.json(comment);
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
