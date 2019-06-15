var db = require("./conn");
var usersRef = db
    .dbRef
    .child("users");

let storage = require('./storage');
let userUid;
let mUser;
let Error;

module.exports.login = async (user) => {
    Error = null;
    userUid = null;
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
            var errorMessage = error.message;
            Error = errorMessage;
        });

    if (userUid) {
        console.log(userUid);
        let data;
        data = await this.getUser(userUid);
        if (data) {
            data.uid = userUid;
            return { user: data, err: null };
        }
    }
    return { user: null, err: Error };
}

module.exports.getUser = async (userId) => {
    return new Promise((resolve, reject) => {
        db
            .dbRef
            .child("users")
            .child(userId.toString())
            .on('value', (snap) => {
                mUser = snap.val();
                resolve(mUser);
            });
    });
};

module.exports.signUp = async (user) => {
    Error = null;
    let uid;
    await new Promise((resolve, reject) => {
        db
            .firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(async (logedInUser) => {
                uid = logedInUser.user.uid;
                resolve(uid);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorMessage) {
                    Error = errorMessage;
                }
            });
    });

    if (uid) {
        await storage.uploadCv(uid, user.files[0]);
        await storage.uploadProfilePic(uid, user.files[1]);

        user.cv = await storage.getCvUrl(uid);
        user.img = await storage.getPicUrl(uid);

        user.password = null;
        user.files = null;

        new Promise((resolve, reject) => {
            usersRef
                .child(uid.toString())
                .set(user, function (error) {
                    if (error) {
                        console.log(error);
                        Error = error;
                    }
                    resolve();
                });
        });
    }
    if (Error) {
        console.log("error before return " + Error)
        return Error;
    }
    return null;

};

module.exports.CompanysignUp = async (user) => {
    Error = null;
    let uid;
    await db
        .firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async (logedInUser) => {
            uid = logedInUser.user.uid;
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage) {
                Error = errorMessage;
                console.log(Error);
            }
        });
    if (uid) {
        await storage.uploadProfilePic(uid, user.files[0]);
        user.img = await storage.getPicUrl(uid);

        user.password = null;
        user.files = null;

        new Promise((resolve, reject) => {
            usersRef
                .child(uid.toString())
                .set(user, function (error) {
                    if (error) {
                        console.log(error);
                        Error = error;
                    }
                    resolve();
                });
        });
    }
    if (Error) {
        console.log("error before return " + Error)
        return Error;
    }
    return null;

};

module.exports.userUpdate = (userId, user) => {
    return new Promise((resolve, reject) => {
        usersRef
            .child(userId)
            .update(user);
        resolve();
    });

};

module.exports.userRemove = (userId) => {

    return new Promise((resolve, reject) => {
        db
            .dbRef
            .ref("users/" + userId)
            .set(null);
        resolve();
    });

};


module.exports.getAllUsers = () => {

    return new Promise((resolve, reject) => {
        db
            .dbRef
            .child("users")
            .on('value', (snap) => {
                resolve(snap.val());
            });
    });
};

// return new Promise((resolve, reject) => {});

