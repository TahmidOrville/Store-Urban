import express from 'express'
import {authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile} from '../controllers/userController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

const router= express.Router()
 
router.post('/login', authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.post('/register',registerUser)
router.route('/').get(protect,admin,getUsers)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)







export default router; 