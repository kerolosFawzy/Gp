var dbRef = require("./conn");

var usersRef = dbRef.child("users");

module.exports.userPush = user => {
  usersRef.push(user);
};

module.exports.userUpdate = (userId, user) => {
  dbRef.ref("users/" + userId).set(user);
};

module.exports.userRemove = (userId) => {
  dbRef.ref("users/" + userId).set(null);
};

module.exports.getUser = (userId) => {
    dbRef.ref("users/" + userId).on('value', function (snap) {
        return snap.val();
  });
};


