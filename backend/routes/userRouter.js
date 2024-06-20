const express =require('express');
const {autMiddleware}= require('../middleware/authMiddleware')

const router=express.Router();
const  {createUser ,getUser ,loginUser}= require('../controllers/userController');

router.post('/',createUser);
router.get('/me',autMiddleware, getUser);
router.post('/login',loginUser);


module.exports=router;