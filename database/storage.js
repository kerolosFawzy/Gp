var db = require("./conn");
let basePicUrl = 'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/pic%2F';
let baseCvUrl = 'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/Cv%2F';


module.exports.uploadProfilePic = async (userId, Picture) => {

    return new Promise((res, rej) => {
        db.bucket.upload(Picture.path, {
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
            res();
        });
    });
};

module.exports.uploadCv = async (userId, Cv) => {
    return new Promise((res, rej) => {
        db.bucket.upload(Cv.path, {
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
            res();
        });
    });
};


module.exports.getPicUrl = async (userId) => {
    return new Promise((resolve, rej) => {
        db.bucket.getFiles({ prefix: 'pic/' + userId }).then((file) => {
            // console.log(file[0][0]);
            //  var token = file[0][0].metadata.metadata.firebaseStorageDownloadTokens;
            basePicUrl = basePicUrl + userId + '?alt=media&token=' + '0ac44c73-7d8a-464d-8891-a0409d423386';
            resolve(basePicUrl);

        }).catch((err) => {
            console.log(err.message);
        });
        console.log(basePicUrl);
    });

};

module.exports.getCvUrl = async (userId) => {

    return new Promise((resolve, rej) => {
        db.bucket.getFiles({ prefix: 'Cv/' + userId }).then((file) => {
            //   var token = file[0][0].metadata.firebaseStorageDownloadTokens;
            baseCvUrl = baseCvUrl + userId + '?alt=media&token=' + '0ac44c73-7d8a-464d-8891-a0409d423386';
            resolve(baseCvUrl);

        }).catch((err) => {
            console.log(err.message);
        });
        console.log(baseCvUrl);
    });
};