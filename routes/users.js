var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({     code:'-200',     msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 验证用户
router.get('/checkUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    var param = req.query || req.params;
    console.log(param);
// 建立连接 增加一个用户信息
    connection.query(userSQL.check, [param.username,param.password], function(err, result)
    {
      if(err){
        console.log('[CHECKUSER ERROR] - ',err.message);
        return;
      }
      console.log(result);
      // 以json形式，把操作结果返回给前台页面
      if (result.length>0){
        result = {code:"200",msg:result};

      }else{
        result = {code:"-200",msg:result};
      }
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });

  });
});

router.get('/findUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    var param = req.query || req.params;
    console.log(param);
// 建立连接 增加一个用户信息
    connection.query(userSQL.getUserById, [param.userid], function(err, result)
    {
      if(err){
        console.log('[CHECKUSER ERROR] - ',err.message);
        return;
      }
      console.log(result);
      // 以json形式，把操作结果返回给前台页面
      if (result.length>0){
        result = {code:"200",msg:result};

      }else{
        result = {code:"-200",msg:result};
      }
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });

  });
});

// 验证用户
router.get('/checkUserName', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    var param = req.query || req.params;
    console.log(param);
// 建立连接 增加一个用户信息
    connection.query(userSQL.getUserByUserName, [param.username], function(err, result)
    {
      if(err){
        console.log('[CHECKUSER ERROR] - ',err.message);
        return;
      }
      console.log(result);
      // 以json形式，把操作结果返回给前台页面
      if (result.length>0){
        result = {code:"200",isuse:"1",msg:result};

      }else{
        result = {code:"-200",isuse:"0",msg:result};
      }
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });

  });
});





// 验证用户
router.post('/addUser', function(req, res, next){
  // 从连接池获取连接
  console.log('1')
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    var param = req.body;
    console.log(req.body);
// 建立连接 增加一个用户信息
    connection.query(userSQL.add, [param.userid, param.username, param.name, param.password,
                                    param.pic, param.phone, param.adress, param.note,
                                    param.score, param.grade, param.isuse], function(err, result)
    {
      if(err){
        console.log('[CHECKUSER ERROR] - ',err.message);
        return;
      }
      console.log(result);
      // 以json形式，把操作结果返回给前台页面
      if (result.affectedRows>0){
        result = {code:"200",msg:result};

      }else{
        result = {code:"-200",msg:result};
      }
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });

  });
});

// 修改用户
router.post('/updateUser', function(req, res, next){
  // 从连接池获取连接
  console.log('2')
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    var param = req.body;
    console.log(req.body);
// 建立连接 增加一个用户信息
    connection.query(userSQL.update, [param.name, param.phone, param.adress, param.note,param.userid], function(err, result)
    {
      if(err){
        console.log('[updateUser ERROR] - ',err.message);
        return;
      }
      console.log(result);
      // 以json形式，把操作结果返回给前台页面
      if (result.affectedRows>0){
        result = {code:"200",msg:result};

      }else{
        result = {code:"-200",msg:result};
      }
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });

  });
});




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
