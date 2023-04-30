const PizzaController = require("../controllers/PizzaController")
const express = require("express")

const router = express.Router()

router.post("/add", PizzaController.add)
router.get("/", PizzaController.findAll)
router.put("/:id", PizzaController.update)
router.delete("/:id", PizzaController.del)
router.get("/:id", PizzaController.find)
router.post("/find", PizzaController.findBy)

module.exports = router;