const express = require('express')
const { registerUser,getAllUsers, getUserById, updateProfile, loginUser, logoutUser, followUser, unfollowUser } = require('./usercontroller')
const { authUser, roleAccess } = require('../../middleware/authmiddleware')

const router = express.Router()
router.route('/').get(getAllUsers).post(registerUser)
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route('/:id').get(getUserById)
router.route('/:id/follow').post(followUser)
router.route('/unfollow/:id').post(unfollowUser)
router.route('/update').put(authUser, roleAccess(["user"]), updateProfile)
module.exports = router