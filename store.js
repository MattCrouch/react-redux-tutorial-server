const uuid = require("uuid/v4");

const comments = [
  {
    id: "1",
    user_id: "1",
    comment: "This is great"
  },
  {
    id: "2",
    user_id: "3",
    comment: "This is great"
  },
  {
    id: "3",
    user_id: "2",
    comment: "This is great"
  },
  {
    id: "4",
    user_id: "1",
    comment: "This is great"
  },
  {
    id: "5",
    user_id: "3",
    comment: "This is great"
  },
  {
    id: "6",
    user_id: "1",
    comment: "This is great"
  },
  {
    id: "7",
    user_id: "2",
    comment: "This is great"
  },
  {
    id: "8",
    user_id: "1",
    comment: "This is great"
  }
];

const photos = [
  {
    id: "1",
    src: "/",
    user_id: "1",
    comments: ["1", "2", "4"]
  },
  {
    id: "2",
    src: "/",
    user_id: "2",
    comments: ["8"]
  },
  {
    id: "3",
    src: "/",
    user_id: "1",
    comments: ["3", "5"]
  },
  {
    id: "4",
    src: "/",
    user_id: "3",
    comments: ["6", "7"]
  },
  {
    id: "5",
    src: "/",
    user_id: "2",
    comments: []
  }
];

const users = [
  {
    id: "1",
    name: "Barry"
  },
  {
    id: "2",
    name: "Gary"
  },
  {
    id: "3",
    name: "Larry"
  }
];

function getComments(ids) {
  return ids.map(id => comments.find(comment => comment.id === id));
}

function getPhotos() {
  // Deep clone photos object
  const results = JSON.parse(JSON.stringify(photos));

  const populated = results.map(result => getPhotoData(result));

  return populated;
}

function getPhotoData(photo) {
  // Deep clone photos object
  const result = JSON.parse(JSON.stringify(photo));

  result.user = getUser(result.user_id);
  delete result.user_id;

  result.comments = getComments(result.comments).map(comment => {
    delete comment.photo_id;

    comment.user = getUser(comment.user_id);

    delete comment.user_id;

    return comment;
  });

  return result;
}

function getPhoto(id) {
  const photo = photos.find(photo => photo.id === id);

  return getPhotoData(photo);
}

function getUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  getPhotos,
  getPhoto
  // addComment
};
