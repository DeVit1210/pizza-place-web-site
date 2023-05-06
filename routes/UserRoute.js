const express = require('express');
const UserController = require('../controllers/UserController')
const Validator = require('../middleware/validation-middleware')

const router = express.Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post("/change-password", UserController.changePassword)
router.get("/", UserController.findAll)
router.get("/find", UserController.findByUsername)
router.get('/check', UserController.check)
router.post('/update', UserController.update)

module.exports = router;