/**
 * Created by J on 2016/10/8.
 */
var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/productsql');
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
router.get('/userProducts', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
// 建立连接 增加一个用户信息
        connection.query(userSQL.getProductByuserid, [param.userid], function(err, result)
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

// 获取个人商品信息
router.get('/sortProducts', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
// 建立连接 增加一个用户信息
        connection.query(userSQL.getProductBysortid, [param.sortid], function(err, result)
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

// 删除产品
router.get('/deleteProducts', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);

        // 建立连接 增加一个用户信息
        connection.query(userSQL.deleteProductByid, [param.productid], function(err, result)
        {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return;
            }
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

// 验证用户
router.post('/addProducts', function(req, res, next){
    // 从连接池获取连接
    console.log('1')
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.body;
        console.log(req.body);
// 建立连接 增加一个用户信息
        connection.query(userSQL.add, [param.productid, param.name, param.note, param.date,
            param.price, param.pic, param.sortid, param.userid,
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

// 修改评级
router.post('/updateScore', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.body;
        console.log(req.body);
// 建立连接 增加一个用户信息
        connection.query(userSQL.updateScore, [param.score, param.productid], function(err, result)
        {
            if(err){
                console.log('[updateScore ERROR] - ',err.message);
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
