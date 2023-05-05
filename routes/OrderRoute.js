const express = require('express');
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.post("/create", OrderController.create)
router.get("/find", OrderController.findByUserId);
router.get('/findToday', OrderController.findByDate);
router.get('/', OrderController.findAll)

module.exports = router;