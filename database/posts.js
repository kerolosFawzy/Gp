var db = require("./conn");




var temp;
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

module.exports.getPost = async (postId) => {
  console.log("in database ");

  await db.dbRef.child("posts").child(postId).on('value', function (snap) {
    temp = snap.val();
    return;
  });
  return temp;
};


