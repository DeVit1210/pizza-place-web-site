let pizzaNameActiveBlock = document.querySelector('.active_ref');
let pizzaName = document.getElementById('item_name');
let pizzaDiameter = document.getElementById('item_diameter');
let pizzaDough = document.getElementById('item_dough');
let pizzaWeight = document.getElementById('item_weight');
let pizzaCost = document.getElementById('pizza_cost');
let toppingContainer = document.querySelector('.item_toppings_wrapper')

let totalToppingsCost = 0.0;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
$(document).ready(() => {
    $.ajax({
        url: "http://localhost:8080/api/pizza/" + id,
        type: "GET",
        success: (item) => {
            loadItemPageContent(item)
            addEventListeners(item);
        }
    })
    $.ajax({
        url: "http://localhost:8080/api/toppings",
        type: "GET",
        success: (toppings) => {
            loadToppings(toppings);
        }
    })
})

const sizeButtons = document.querySelectorAll('.item_size');
sizeButtons[1].classList.add('active');
sizeButtons.forEach(sizeButton => {
    sizeButton.addEventListener('click', () => {
        sizeButtons.forEach(but => {
            but.classList.remove('active');
        })
        sizeButton.classList.add('active');
    })
})

const doughTypeButtons = document.querySelectorAll('.item_dough_type');
doughTypeButtons[0].classList.add('active');
doughTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        doughTypeButtons.forEach(btn => {
            btn.classList.remove('active');
        })
        button.classList.add('active');
    })
})

function loadItemPageContent(item) {
    pizzaNameActiveBlock.textContent = item.name;
    pizzaName.textContent = item.name;
    pizzaDiameter.textContent = String(item.configuration.medium.diameter);
    pizzaDough.textContent = "традиционное тесто";
    pizzaWeight.textContent = String(item.configuration.medium.weight);
    pizzaCost.textContent = String(item.configuration.medium.price);
}

function loadToppings(toppings) {
    console.log(toppings)
    toppings.forEach(topping => {
        const toppingCard = createToppingTemplate(topping);
        toppingCard.addEventListener('click', () => {
            const toppingCost = Number(toppingCard.children[2].textContent);
            const currentPizzaCost = Number(pizzaCost.textContent);
            if(toppingCard.classList.contains('active')) {
                toppingCard.classList.remove('active')
                pizzaCost.textContent = String(currentPizzaCost - toppingCost);
                totalToppingsCost -= toppingCost
            } else {
                toppingCard.classList.add('active')
                pizzaCost.textContent = String(currentPizzaCost + toppingCost);
                totalToppingsCost += toppingCost;
            }
        })
        toppingContainer.appendChild(toppingCard)
    })
}

function createToppingTemplate(topping) {
    let block = document.createElement('div');
    block.classList.add('topping');
    let image = document.createElement('img');
    image.src = topping.image
    image.alt = "topping-image"
    block.appendChild(image);
    let name = document.createElement('p');
    name.classList.add('topping_name')
    name.textContent = topping.name
    block.appendChild(name)
    let price = document.createElement('p');
    price.classList.add('topping_cost');
    price.textContent = topping.price;
    block.appendChild(price);
    return block;
}

function addEventListeners(item) {
    $('#traditional_dough').on('click', () => {
        pizzaDough.textContent = "традиционное тесто";
    })
    $('#thin_dough').on('click', () => {
        pizzaDough.textContent = "тонкое тесто";
    })
    $('#small_size').on('click', () => {
        changeProperties(item.configuration.small)
    })
    $('#middle_size').on('click', () => {
        changeProperties(item.configuration.medium);
    })
    $('#large_size').on('click', () => {
        changeProperties(item.configuration.large);
    })
}

function changeProperties(configuration) {
    pizzaDiameter.textContent = String(configuration.diameter);
    pizzaWeight.textContent = String(configuration.weight);
    pizzaCost.textContent = String(configuration.price + totalToppingsCost);
}
$('.item_add_cart_button').on('click', () => {
    const cartItem = {
        pizza: id,
        dough: pizzaDough.textContent,
        size: pizzaDiameter.textContent,
        quantity: 1,
        weight: pizzaWeight.textContent,
        totalPrice: pizzaCost.textContent
    }
    $.ajax({
        url: "http://localhost:8080/api/cart/add",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            token: localStorage.getItem('token'),
            item: cartItem
        }),
        success: () => {
            window.location.href = "../views/menu.html"
        }
    })
})
