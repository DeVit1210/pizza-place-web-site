const express = require('express');
const UserController = require('../controllers/UserController')

const router = express.Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post("/change-password", UserController.changePassword)
router.get("/", UserController.findAll)
router.get("/find", UserController.findByUsername)

module.exports = router;