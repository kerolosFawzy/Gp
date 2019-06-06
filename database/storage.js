var db = require("./conn");


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
    await db.bucket.getFiles({ prefix: 'pic/' }).then((file) => {
        
        console.log(file[0]);
    }).catch((err) => {
        console.log(err);
    });
    return; 
};