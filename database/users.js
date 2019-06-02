var db = require("./conn");
var usersRef = db
    .dbRef
    .child("users");
let userUid;
let mUser;
let Error;


module.exports.login = async (user) => {
    Error = "Error Undefined";
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
            Error = errorMessage;
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
        return { user: mUser, err: null };
    }
    return { user: null, err: Error };

}

module.exports.getUser = async (userId) => {
    await db
        .dbRef
        .child("users")
        .child(userId.toString())
        .on('value', (snap) => {
            return mUser = snap.val();
        });
};

module.exports.signUp = async (user) => {
    console.log(user)

    await db
        .firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((logedInUser) => {
            let uid = logedInUser.user.uid;
            console.log(uid);

            user.password = null;
            usersRef
                .child(uid.toString())
                .set(user, function (error) {
                    console.log(error)
                });
            console.log('before upload');
            uploadProfilePic(uid, user.profile_pic);
            uploadCv(uid, user.cv);
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
    db.dbRef
        .ref("users/" + userId)
        .set(null);
};

module.exports.uploadProfilePic = async (userId, picPath) => {
    await db.bucket.upload(picPath, {
        destination: "pic/" + userId,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    }, (err, file) => {
        return;
    });
};

module.exports.uploadCv = async (userId, cvPath) => {
    await db.bucket.upload(cvPath, {
        destination: "cv/" + userId,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    }, (err, file) => {
        return;
    });
};
// module.exports = {     uid: userUid,     user: mUser };