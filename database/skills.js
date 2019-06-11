var db = require("./conn");
var skillsRef = db
    .dbRef
    .child("skills");
var skills;


module.exports.getSkills = async () => {
    await db
        .dbRef
        .child("skills")
        .on('value', (snap) => {
            skills = snap.val();
            return;
        });
    return skills;
}