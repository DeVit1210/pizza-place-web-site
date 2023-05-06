const express = require('express')
const AddressController = require('../controllers/AddressController')

const router = express.Router();

router.post("/add", AddressController.add);
router.post("/update", AddressController.update);

module.exports = router;

