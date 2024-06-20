const express =require('express');
const router=express.Router();
const {getGoal ,createGoal ,deleteGoal ,updateGoal }  =require('../controllers/goalController');
const {autMiddleware} =require('../middleware/authMiddleware');

router.route('/').get(autMiddleware,getGoal).post(autMiddleware,createGoal);
router.route('/:id').delete(autMiddleware,deleteGoal).put(autMiddleware,updateGoal);

module.exports=router;