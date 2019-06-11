var db = require("./conn");
let basePicUrl = 'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/pic%2F';
let baseCvUrl = 'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/cv%2F';


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


module.exports.getPicUrl = async (userId) => {
    await db.bucket.getFiles({ prefix: 'pic/' + userId }).then((file) => {
        var token = file[0][0].metadata.metadata.firebaseStorageDownloadTokens;
        basePicUrl = basePicUrl + userId + '?alt=media&token=' + token;
    }).catch((err) => {
        console.log(err.message);
    });
    console.log(basePicUrl);

    return basePicUrl;
};

module.exports.getCvUrl = async (userId) => {
    await db.bucket.getFiles({ prefix: 'cv/' + userId }).then((file) => {
        var token = file[0][0].metadata.metadata.firebaseStorageDownloadTokens;
        baseCvUrl = baseCvUrl + userId + '?alt=media&token=' + token;
    }).catch((err) => {
        console.log(err.message);
    });
    console.log(baseCvUrl);

    return baseCvUrl;
};