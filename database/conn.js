var firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

var config = {
    apiKey: "AIzaSyBc_myd7VPOGA2Uk65Bmk8Vgf81GfKUmd4",
    authDomain: "gp-project-9231d.firebaseapp.com",
    databaseURL: "https://gp-project-9231d.firebaseio.com",
    projectId: "gp-project-9231d",
    storageBucket: "gp-project-9231d.appspot.com",
    messagingSenderId: "756048925389"
};

firebase.initializeApp(config);

var storage = require('@google-cloud/storage')

var bucket = storage.bucket("gs://gp-project-9231d.appspot.com");
var dbRef = firebase
    .database()
.ref();




module.exports = {
    dbRef: dbRef,
    firebase: firebase
};
