const express = require('express');
const CouponController = require('../controllers/CouponController');

const router = express.Router();

router.post('/add', CouponController.add);
router.get('/:id', CouponController.find);
router.get("/", CouponController.findAll);
router.post('/apply', CouponController.apply)

module.exports = router;