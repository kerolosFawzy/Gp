var dbRef = require("./conn");

var postsRef = dbRef.child("posts");

module.exports.pushPost = post => {
  postsRef.push(post);
};

module.exports.updatePost = (postId, post) => {
  dbRef.ref("posts/" + postId).set(post);
};

module.exports.removePost = (postId) => {
  dbRef.ref("posts/" + postId).set(null);
};

module.exports.getPost = (postId) => {
    dbRef.ref("posts/" + postId).on('value', function (snap) {
        return snap.val();
  });
};


