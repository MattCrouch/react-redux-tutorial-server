const uuid = require("uuid/v4");

const comments = [
  {
    id: "1",
    user_id: "1",
    comment: "This is great",
    top: 12,
    left: 34
  },
  {
    id: "2",
    user_id: "3",
    comment: "This is great",
    top: 42,
    left: 29
  },
  {
    id: "3",
    user_id: "2",
    comment: "This is great",
    top: 82,
    left: 11
  },
  {
    id: "4",
    user_id: "1",
    comment: "This is great",
    top: 66,
    left: 49
  },
  {
    id: "5",
    user_id: "3",
    comment: "This is great",
    top: 9,
    left: 45
  },
  {
    id: "6",
    user_id: "1",
    comment: "This is great",
    top: 23,
    left: 34
  },
  {
    id: "7",
    user_id: "2",
    comment: "This is great",
    top: 89,
    left: 52
  },
  {
    id: "8",
    user_id: "1",
    comment: "This is great",
    top: 13,
    left: 94
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
  return ids.map(id => getComment(id));
}

function getComment(id) {
  return comments.find(comment => comment.id === id);
}

function getPhotos() {
  return photos.map(result => getPhotoData(result));
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

function addComment(photo_id, user_id, comment) {
  const id = uuid();

  comments.push({
    id,
    user_id,
    comment
  });

  const photo = photos.find(photo => photo.id === photo_id);

  photo.comments.push(id);

  return getComment(id);
}

module.exports = {
  getPhotos,
  getPhoto,
  addComment
};
