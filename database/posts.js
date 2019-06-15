var db = require("./conn");
var temp;
var bool;
module.exports.pushPost = post => {
  return new Promise((resolve, reject) => {
    db.dbRef.child("posts").push(post).then((id) => {
      temp = id.path.pieces_[1];
      resolve(temp);
    });
  });
};


module.exports.updatePost = async (postId, post) => {
  await db.dbRef.child("posts").child(postId).update(post);
};

module.exports.removePost = (postId) => {
  db.dbRef.child("posts").child(postId).set(null);
};

module.exports.getPost = async (postId) => {
  return await new Promise((resolve, reject) => {
    db.dbRef.child("posts").child(postId).on('value', (snap) => {
      temp = snap.val();
      resolve(temp);
    });
  });
};

module.exports.getApply = async (postId) => {
  return await new Promise((resolve, reject) => {
    db.dbRef.child("posts").child(postId).child('applied').on('value', (snap) => {
      resolve(snap.val());
    });
  });
};

module.exports.apply = async (postId, id) => {
  bool = null;
  temp = await this.getApply(postId);
  console.log(temp);

  if (temp) {
    for (i = 0; i < temp.length; i++) {
      var applied = temp[i];
      if (applied == id) {
        bool = true;
        break;
      }
    }
  } else {
    db.dbRef.child("posts").child(postId).child('applied').set([id]);
    return 'Now You apllied for this jop';

  }


  if (bool) {
    return 'You Applied before';
  } else {
    if (temp.length >= 1) {
      temp.push(id);
      db.dbRef.child("posts").child(postId).child('applied').set(temp);
    } else {
      db.dbRef.child("posts").child(postId).child('applied').set([id]);
    }

    return 'Now You apllied for this jop';
  }
};


module.exports.getAllPosts = async () => {

  return await new Promise((resolve, reject) => {
    db.dbRef.child("posts").on('value', (snap) => {
      resolve(snap.val());
    });
  });
};

module.exports.getAllHrPosts = async (id) => {

  return await new Promise(async (resolve, reject) => {
    let data = await this.getAllPosts();
    let final = [];
    var result = [];
    for (var i in data)
      result.push([i, data[i]]);

    for (i = 0; i < result.length; i++) {
      var post = result[i][1];
      if (post.id == id) {
        final.push(result[i]);
      }
    }
    resolve(final);
  });
};


