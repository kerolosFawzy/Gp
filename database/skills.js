var db = require("./conn");
var skillsRef = db
    .dbRef
    .child("skills");
var skills; 


module.exports.getSkills = async () => {
    await skillsRef.on('value', (snap) => {
        skills = snap.val();
        return;
    });
    return skills;
}