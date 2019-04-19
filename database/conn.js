const firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBc_myd7VPOGA2Uk65Bmk8Vgf81GfKUmd4",
    authDomain: "gp-project-9231d.firebaseapp.com",
    databaseURL: "https://gp-project-9231d.firebaseio.com",
    projectId: "gp-project-9231d",
    storageBucket: "gp-project-9231d.appspot.com",
    messagingSenderId: "756048925389"
};

firebase.initializeApp(config);

var dbRef = firebase
    .database()
    .ref();

// var storage = firebase.storage();
// var storageRef = storage.ref('profileImages');


module.exports = {
    dbRef: dbRef,
    firebase: firebase
};
