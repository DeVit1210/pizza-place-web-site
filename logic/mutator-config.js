function configureMutator() {
    const targetNode = document.querySelector('.cart_items');
    const config = { childList: true };
    const cartTotalPrice = document.getElementById('cart_total_price');
    cartTotalPrice.textContent = '0.00';
    const callback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedNode = mutation.addedNodes[0];
                const currentPrice = Number(cartTotalPrice.textContent);
                let newPrice = 0;
                if(addedNode) {
                    console.log("addedNode: ", addedNode)
                    const addedItemQuantity = Number(addedNode.querySelector(".item_count").textContent);
                    const addedItemPrice = getItemPrice(addedNode.querySelector('.order_price')) * addedItemQuantity;
                    console.log(addedItemPrice)
                    newPrice = String((currentPrice + addedItemPrice).toFixed(2));
                } else if(mutation.removedNodes.length === 1) {
                    const removedNode = mutation.removedNodes[0];
                    const removedItemQuantity = Number(removedNode.querySelector(".item_count").textContent);
                    console.log("removedNode: ", removedNode)
                    const removedItemPrice = getItemPrice(removedNode.querySelector('.order_price')) * removedItemQuantity;
                    newPrice = String((currentPrice - removedItemPrice).toFixed(2));
                } else {
                    console.log("removedNodes: ", mutation.removedNodes);
                    newPrice = "0.00";
                }
                cartTotalPrice.textContent = newPrice;
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

configureMutator();


function getItemPrice(priceBlock) {
    return Number(priceBlock.textContent.split(' ')[0]);
}