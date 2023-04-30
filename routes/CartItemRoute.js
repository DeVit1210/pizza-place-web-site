const CartItemController = require('../controllers/CartItemController')
const express = require("express")

const router = express.Router()

router.put("/update", CartItemController.updateQuantity);
router.get("/:id", CartItemController.find);

module.exports = router