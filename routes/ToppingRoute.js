const express = require('express');
const ToppingController = require('../controllers/ToppingController')

const router = express.Router()

router.get("/", ToppingController.findAll)
router.post("/add", ToppingController.add)

module.exports = router;