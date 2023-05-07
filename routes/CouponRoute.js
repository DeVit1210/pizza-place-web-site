const express = require('express');
const CouponController = require('../controllers/CouponController');

const router = express.Router();

router.post('/add', CouponController.add);
router.get('/:id', CouponController.find);
router.get("/", CouponController.findByUser);
router.get("/find/all", CouponController.findAll)
router.post('/apply', CouponController.apply)
router.delete('/:id', CouponController.del);

module.exports = router;