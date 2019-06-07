var db = require("./conn");




module.exports.pushPost = post => {
  console.log('income code'+post);
  db.dbRef.child("posts").push(post);
  console.log('done');
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


