var dbRef = require("./conn");

var hrsRef = dbRef.child("hr");

module.exports.pushHR = HR => {
    hrsRef.push(HR);
};

module.exports.updateHR = (HRId, HR) => {
  dbRef.ref("hr/" + HRId).set(HR);
};

module.exports.removeHR = (HRId) => {
  dbRef.ref("hr/" + HRId).set(null);
};

module.exports.getHR = (HRId) => {
    dbRef.ref("hr/" + HRId).on('value', function (snap) {
        return snap.val();
  });
};


