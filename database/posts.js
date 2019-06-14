var db = require("./conn");
var temp;

module.exports.pushPost = post => {
  return new Promise((resolve, reject) => {
    db.dbRef.child("posts").push(post).then((id) => {
      temp = id.path.pieces_[1];
      resolve(temp);
    });
  });
};

module.exports.updatePost = async (postId, post) => {
  await db.dbRef.child("posts").child(postId).set(post);
};

module.exports.removePost = (postId) => {
  db.dbRef.child("posts").child(postId).set(null);
};

module.exports.getPost = async (postId) => {
  return new Promise((resolve, reject) => {
    db.dbRef.child("posts").child(postId).once('value', (snap) => {
      temp = snap.val();
      resolve(temp);
    });
  });
};


module.exports.getAllPosts = async () => {

  return new Promise((resolve, reject) => {
    db.dbRef.child("posts").once('value', (snap) => {
      temp = snap.val();
      resolve(temp);
    });
  });
};


