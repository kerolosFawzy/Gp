var db = require("./conn");
var temp;

module.exports.pushPost = post => {
  console.log(post);
  db.dbRef.child('posts').push(post);
};

module.exports.updatePost = async (postId, post) => {
  await db.dbRef.child("posts").child(postId).set(post);
};

module.exports.removePost = (postId) => {
  db.dbRef.child("posts").child(postId).set(null);
};

module.exports.getPost = async (postId) => {

  await db.dbRef.child("posts").child(postId).on('value', function (snap) {
    temp = snap.val();
    return;
  });

  return temp;
};


module.exports.getAllPosts = async (postId) => {

  await db.dbRef.child("posts").on('value', function (snap) {
    temp = snap.val();
    return;
  });
  return temp;
};


