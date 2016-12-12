/**
 * Created by J on 2016/10/8.
 */
var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var sortSQL = require('../db/sortsql');
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

// 获取个人商品信息
router.get('/', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
// 建立连接 增加一个用户信息
        connection.query(sortSQL.queryAll,  function(err, result)
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

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;