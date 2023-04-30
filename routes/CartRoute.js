const CartController = require('../controllers/CartController')
const express = require("express")

const router = express.Router()

router.post('/add', CartController.addItem);
router.get('/find', CartController.findCart);
router.delete("/:itemId", CartController.removeItem);

module.exports = router