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

    console.log(userUid);
    if (userUid) {
        console.log('found UId');
        await this.getUser(userUid);

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
            mUser = snap.val();
            return;
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

            if (user.files.length == 2) {
                this.uploadCv(uid, user.files[0]);

                this.uploadProfilePic(uid, user.files[1]);

            } else {
                this.uploadCv(uid, user.files[0]);
            }

            user.password = null;
            user.files = null;

            usersRef
                .child(uid.toString())
                .set(user, function (error) {
                    if (error) {
                        console.log(error);
                        Error = error;
                    }
                });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage) {
                Error = errorMessage;
                console.log(Error);
            }
        });

    if (Error) {
        console.log("error before return " + Error)
        return Error;
    }
    return null;

};


module.exports.CompanysignUp = async (user) => {
    console.log(user)

    await db
        .firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((logedInUser) => {
            let uid = logedInUser.user.uid;
            if (user.files)
                this.uploadProfilePic(uid, user.files[0]);
            user.password = null;
            user.files = null;

            usersRef
                .child(uid.toString())
                .set(user, function (error) {
                    if (error) {
                        console.log(error);
                        Error = error;
                    }
                });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage) {
                Error = errorMessage;
                console.log(Error);
            }
        });

    if (Error) {
        console.log("error before return " + Error)
        return Error;
    }
    return null;

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

module.exports.uploadProfilePic = async (userId, Picture) => {
    console.log(Picture);

    await db.bucket.upload(Picture.path, {
        destination: "pic/" + userId,
        metadata: {
            contentType: Picture.mimetype,
            cacheControl: 'public, max-age=31536000'
        }
    }, (err, file) => {
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
        return;
    });
};

module.exports.uploadCv = async (userId, Cv) => {
    console.log(Cv.path);
    await db.bucket.upload(Cv.path, {
        destination: "Cv/" + userId,
        metadata: {
            contentType: Cv.mimetype,
            cacheControl: 'public, max-age=31536000'
        }
    }, (err, file) => {
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
        return;
    });
};


// module.exports = {     uid: userUid,     user: mUser };
