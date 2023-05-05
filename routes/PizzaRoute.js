const PizzaController = require("../controllers/PizzaController")
const express = require("express")
const upload = require('../middleware/upload')

const router = express.Router()

router.post("/add", upload.any(),  PizzaController.add)
router.get("/", PizzaController.findAll)
router.put("/:id", PizzaController.update)
router.delete("/:id", PizzaController.del)
router.get("/:id", PizzaController.find)
router.post("/find", PizzaController.findBy)
router.get("/bestseller/find", PizzaController.findBestseller)

module.exports = router;