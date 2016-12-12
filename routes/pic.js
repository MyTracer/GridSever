/**
 * Created by J on 2016/10/12.
 */
var express = require('express');
var router = express.Router();
var file_ctrl = require('../controller/filectrl')
/**上传文件*/
router.post('/upload',file_ctrl.upload);
router.get('/download',file_ctrl.download);
module.exports = router;