var db = require("./conn");
var usersRef = db
    .dbRef
    .child("users");
let userUid;
let mUser;
module.exports.login = async (user) => {

    await db
        .firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            if (user) {
                userUid = user.user.uid;
            }
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);

        });

    await db
        .firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user) {
                userUid = user.uid;
            }
        });
    
    console.log(userUid);
    if (userUid) {
        console.log('found UId');
     this.getUser(userUid);
        return {user:mUser , err: null};
    }
    return {user:null , err:"error "};

}

module.exports.getUser =async (userId) => {
    await db
        .dbRef
        .child("users")
        .child(userId.toString())
        .on('value', (snap) => {
            return mUser = snap.val();
        });
};

module.exports.signUp = (user) => {
    db
        .firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((logedInUser) => {
            let uid = logedInUser.user.uid;
            user.password = null;
            usersRef
                .child(uid.toString())
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
};

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

// module.exports = {     uid: userUid,     user: mUser };