const argv = require("minimist")(process.argv.slice(2));

const store = require("./store.js");

const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (argv.slow) {
  console.log("Adding artificial latency...");

  app.use((req, res, next) => {
    setTimeout(next, Math.floor(Math.random() * 3000));
  });
}

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

app.get("/users/:id", (req, res) => {
  const user = store.getUser(req.params.id);

  if (user) {
    return res.json(user);
  }

  return res.status(404).json({});
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
