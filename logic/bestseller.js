$.ajax({
    url: "http://localhost:8080/api/pizza/bestseller",
    type: "GET",
    success: (item) => {
        $('#bestseller_name').text(item.name);
        $('#bestseller_price').text(item.configuration.medium.price);
    }
})
