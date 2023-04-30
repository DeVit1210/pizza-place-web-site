
function createImage(src, alt, classToApply) {
    let node = document.createElement("img");
    node.classList.add(classToApply);
    node.src = src;
    node.alt = alt;
    return node;
}

function loadPizzaItems(itemType) {
    $.ajax({
        url: "http://localhost:8080/api/pizza/find",
        method: "POST",
        contentType: "application/json",
        data:  JSON.stringify({"itemType": itemType.toLowerCase()}),
        success: (data) => {
            let menu = document.getElementById("full_menu");
            menu.innerHTML = '';
            data.forEach(elem => {
                let card = createItemCardTemplate(elem);
                card.classList.add('fade_in');
                addCardEventListeners(card);
                menu.appendChild(card)
            })
        }
    })
}

function addCardEventListeners(card) {
    card.addEventListener('click', () => {
        const id = document.querySelector('.invisible').textContent;
        console.log(id);
        window.location.href = "../views/item-page.html?id=" + id;
    })
    card.querySelectorAll('.bestseller_sign').forEach(sign => {
        sign.addEventListener('click', () => {
            event.stopPropagation();
            const itemCount = card.querySelector('.item_count')
            if(sign.textContent === '+' && itemCount.textContent !== '10') {
                itemCount.textContent = Number(itemCount.textContent) + 1;
            } else if(sign.textContent === '-' && itemCount.textContent !== '1') {
                itemCount.textContent = Number(itemCount.textContent) - 1;
            }
        })
    })
    card.querySelector('.cart_img').addEventListener('click', () => {
        event.stopPropagation();
        const cartItemData = {
            pizza: card.querySelector('.invisible').textContent,
            dough: 'традиционное',
            diameter: card.querySelector('.pizza_diameter').textContent.split('')[0],
            quantity: card.querySelector('.item_count').textContent,
            weight: card.querySelector('.pizza_weight').textContent.split(' ')[0],
            totalPrice: card.querySelector('.pizza_price').textContent.split(' ')[0]
        }
        $.ajax({
            url: "http://localhost:8080/api/cart/add",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                token: localStorage.getItem('token'),
                item: cartItemData
            }),
            success: (createdItemId) => {
                $.ajax({
                    url: "http://localhost:8080/api/cartItem/" + createdItemId,
                    type: "GET",
                    success: (createdItem) => {
                        $('.cart_items').append(createCartItemTemplate(createdItem))
                        $('.item_count').textContent = '1';
                    }
                })
            },
            error: (message) => {
                console.log(message);
                openPopup();
            }
        })
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    loadPizzaItems("пицца");
})

const menuNavButtons = document.querySelectorAll('.menu_nav_btn');
menuNavButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        loadPizzaItems(button.textContent);
    })
})

menuNavButtons[0].classList.add("active-nav-btn");

menuNavButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        menuNavButtons.forEach(btn => {
            btn.classList.remove("active-nav-btn")
        })
        button.classList.add("active-nav-btn");
    })
})