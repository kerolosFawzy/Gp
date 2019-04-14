var db = require("./conn");
var usersRef = db
    .dbRef
    .child("users");

module.exports.login = (user) => {
    let newUser = '';
    db
        .firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            newUser = user.user.uid;
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    return newUser;
}

module.exports.signUp = (user) => {
    db
        .firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((logedInUser) => {
            let uid = logedInUser.user.uid;
            user.password = null;
            usersRef
                .child(uid)
                .set(user, function (error) {
                    if (error) {
                        console.log(error)
                    } 
                });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage) {
                console.log(errorMessage);
            }
        });
}

// module.exports.userPush = user => {     user.password = null;
// usersRef.push(user); };

module.exports.userUpdate = (userId, user) => {
    db
        .dbRef
        .ref("users/" + userId)
        .set(user);
};

module.exports.userRemove = (userId) => {
    db
        .dbRef
        .ref("users/" + userId)
        .set(null);
};

module.exports.getUser = (userId) => {
    db
        .dbRef
        .ref("users/" + userId)
        .on('value', function (snap) {
            return snap.val();
        });
};
