const express = require('express');
const router = express.Router();
const api = require('./controller');
const { route } = require('express/lib/application');
router.get('/getallfile',api.getallfile)
router.post('/file',api.savefile);
router.post('/delete',api.deletefile)
router.get('/apidata/:file',api.getdata);
router.put('/updatedata',api.savedata)
module.exports = router;