var db = require("./conn");
let baseUrl = 'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/pic%2F';


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
        baseUrl = baseUrl + userId + '?alt=media&token=' + token;
    }).catch((err) => {
        console.log(err.message);
    });
    console.log(baseUrl);

    return baseUrl;
};