/**
 * Created by J on 2016/10/8.
 */
var ProductSQL = {
    insert:'INSERT INTO user(uid,userName) VALUES(?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE uid = ? ',
    getProductByuserid:"SELECT * FROM product WHERE userid = ? ORDER BY productid  DESC",
    getProductBysortid:"SELECT * FROM product WHERE sortid = ? ORDER BY productid  DESC",
    deleteProductByid:"DELETE FROM product WHERE productid = ?",
    add:'INSERT INTO product(productid, name, note, date, price, pic, sortid, userid, score, grade, isuse) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    updateScore:"UPDATE product SET score = ? WHERE productid = ?"
};
module.exports = ProductSQL;