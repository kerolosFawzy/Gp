var dbRef = require("./conn");

var messagesRef = dbRef.child("messages");

module.exports.pushMessage = message => {
    messagesRef.push(message);
};

// module.exports.updatePost = (postId, post) => {
//   dbRef.ref("posts/" + postId).set(post);
// };

module.exports.removeMessage = (messageId) => {
  dbRef.ref("messages/" + messageId).set(null);
};

module.exports.getPost = (messageId) => {
    dbRef.ref("messages/" + messageId).on('value', function (snap) {
        return snap.val();
  });
};


