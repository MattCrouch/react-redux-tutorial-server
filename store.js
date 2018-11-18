const uuid = require("uuid/v4");

const comments = [
  {
    id: "1",
    user_id: "1",
    comment: "The shadow is my favourite bit",
    top: 37,
    left: 54
  },
  {
    id: "2",
    user_id: "3",
    comment: "She is so cute!",
    top: 70,
    left: 68
  },
  {
    id: "3",
    user_id: "2",
    comment: "Try and get more of the sky in next time",
    top: 9,
    left: 92
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
    src: "/gallery-photos/dog-sun.jpg",
    user_id: "1",
    comments: ["1", "2", "3"]
  },
  {
    id: "2",
    src: "/gallery-photos/eiffel-tower.jpg",
    user_id: "2",
    comments: []
  },
  {
    id: "3",
    src: "/gallery-photos/laser-wave.jpg",
    user_id: "1",
    comments: []
  },
  {
    id: "4",
    src: "/gallery-photos/qe-bridge.jpg",
    user_id: "3",
    comments: []
  },
  {
    id: "5",
    src: "/gallery-photos/queens-house.jpg",
    user_id: "2",
    comments: []
  },
  {
    id: "6",
    src: "/gallery-photos/rhodes-coastline.jpg",
    user_id: "2",
    comments: []
  },
  {
    id: "7",
    src: "/gallery-photos/southbank-theatre.jpg",
    user_id: "2",
    comments: []
  },
  {
    id: "8",
    src: "/gallery-photos/tree-lights.jpg",
    user_id: "2",
    comments: []
  },
  {
    id: "9",
    src: "/gallery-photos/woolwich-tunnel.jpg",
    user_id: "2",
    comments: []
  }
];

const users = [
  {
    id: "1",
    name: "Matt"
  },
  {
    id: "2",
    name: "Gary"
  },
  {
    id: "3",
    name: "Lauren"
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
    // Deep clone comment object
    const clone = JSON.parse(JSON.stringify(comment));

    delete clone.photo_id;

    clone.user = getUser(clone.user_id);

    delete clone.user_id;

    return clone;
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

function addComment(photo_id, user_id, comment, left, top) {
  const id = uuid();

  comments.push({
    id,
    user_id,
    comment,
    left,
    top
  });

  const photo = photos.find(photo => photo.id === photo_id);

  if (photo) {
    photo.comments.push(id);
  }

  const newComment = getComment(id);

  newComment.photo_id = photo_id;

  return newComment;
}

module.exports = {
  addComment,
  getPhotos,
  getPhoto,
  getUser
};
