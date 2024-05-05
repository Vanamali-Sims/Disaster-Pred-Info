const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser } = require("../controllers/userController");
const { signup, login, protect, forgotPassword } = require("../controllers/authController");


router.post('/signup',signup);
router.post('/login',login);
router.post('/forgotpassword',forgotPassword);
router.route('/')
    .patch(protect,updateUser)
    .delete(protect,deleteUser)

router.get('/:id',getUser);

module.exports = router;