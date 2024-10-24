const express = require('express')
const { createCategory, readCategory } = require('../category/categoryController')
const { authUser, roleAccess } = require('../../middleware/authmiddleware')

const router = express.Router()

router.route('/cat').post(authUser, roleAccess(["admin"]),createCategory).get(readCategory)
module.exports = router