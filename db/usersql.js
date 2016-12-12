/**
 * Created by J on 2016/10/8.
 */
var UserSQL = {
    insert:'INSERT INTO user(uid,userName) VALUES(?,?)',
    queryAll:'SELECT * FROM user',

    getUserByUserName:'SELECT * FROM user WHERE username = ? ',
    getUserById:'SELECT * FROM user WHERE userid = ? ',
    check:"SELECT * FROM user WHERE username = ? AND password = ?",
    add:'INSERT INTO user(userid, username, name, password, pic, phone, adress, note, score, grade, isuse) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    update:"UPDATE user SET name = ?,phone = ?,adress = ?,note = ? WHERE userid = ?"
};
module.exports = UserSQL;