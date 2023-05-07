const express = require('express');
const ToppingController = require('../controllers/ToppingController')
const upload = require('../middleware/upload')

const router = express.Router()

router.get("/", ToppingController.findAll)
router.post("/add", upload.any(), ToppingController.add)
router.delete("/:id", ToppingController.del)
router.get('/:id', ToppingController.findOne)
router.put('/:id', ToppingController.update)

module.exports = router;