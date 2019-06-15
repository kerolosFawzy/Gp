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


module.exports.searchFilter = (posts, jobtype, position, jopRole) => {
    return new Promise((resolve, reject) => {
        var result = [];
        var selected = [];
        var finalResult = [];
        for (var i in posts)
            result.push([i, posts[i]]);

        if (position) {
            for (i = 0; i < result.length; i++) {
                if (result[i][1].country == position)
                    selected.push(result[i]);
            }
        } else {
            selected = result;
        }

        if (jobtype) {
            for (i = 0; i < selected.length; i++) {
                if (selected[i][1].jobtype == jobtype)
                    finalResult.push(selected[i]);
            }
        } else {
            finalResult = selected;
        }

        resolve(finalResult);
    });

}
