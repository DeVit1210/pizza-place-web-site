const express = require('express')
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser')
const cors = require('cors')


const pizzaRouter = require('./routes/PizzaRoute')
const userRouter = require('./routes/UserRoute')
const cartRouter = require('./routes/CartRoute')
const orderRouter = require('./routes/OrderRoute')
const toppingRouter = require('./routes/ToppingRoute')
const cartItemRouter = require('./routes/CartItemRoute')

mongoose.connect('mongodb://127.0.0.1:27017/pizza-db');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log("Database connection established!");
})

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());

app.use("/api/pizza", pizzaRouter)
app.use('/api/user', userRouter)
app.use("/api/cart", cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/toppings', toppingRouter);
app.use('/api/cartItem', cartItemRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


