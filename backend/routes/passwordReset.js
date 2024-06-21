const express =require('express');
const router = express.Router();
const {sendCode ,verifyCode,sendNewCode}=require('../controllers/forgetPasswordController');


router.post('/',sendCode);
router.post('/verify',verifyCode);
router.get('/send',sendNewCode);


module.exports=router;