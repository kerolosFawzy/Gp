var db = require("./conn");
var skillsRef = db
    .dbRef
    .child("skills");
var skills;


module.exports.getSkills = async () => {
    return new Promise((resolve, reject) => {
        db
            .dbRef
            .child("skills")
            .on('value', (snap) => {
                skills = snap.val();
                resolve(skills);
            });
       
    });

}