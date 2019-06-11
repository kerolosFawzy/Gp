module.exports.checkSession = (req) => {
    var bool;

    if (req.session.uid) {
        bool = req.session.user;
    }

    return bool;
}
module.exports.checkHr = (user) => {
    var bool;

    if (user.role == 3) {
        bool = true;
    }
    else
        bool = false;

    return bool;
}
