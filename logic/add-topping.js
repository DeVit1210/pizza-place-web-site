const $toppingsContentContainer = $('.toppings_content_container')

const $addToppingsButton = $('#add_toppings');
const $deleteToppingsButton = $('#delete_toppings');
const $editToppingsButton = $('#edit_toppings');
const $showToppingsButton = $('#show_toppings');

$addToppingsButton.on('click', () => {
    $toppingsContentContainer.empty();
    $toppingsContentContainer.load('../views/admin-templates/add-topping-form.html')
})

$editToppingsButton.on('click', () => {
    $toppingsContentContainer.empty();
    $toppingsContentContainer.load('../views/admin-templates/update-topping-form.html')
})

$deleteToppingsButton.on('click', () => {
    $toppingsContentContainer.empty();
    $toppingsContentContainer.load('../views/admin-templates/delete-topping-form.html')
})

$showToppingsButton.on('click', () => {
    $toppingsContentContainer.empty();
    const table = $('<table>')
    const thead = $('<thead>')
    const headers = ['Id', 'Название', 'Цена'];
    headers.forEach(header => {
        thead.append($('<th>').text(header))
    })
    table.append(thead);
    const tbody = $('<tbody>');
    table.append(tbody);
    $toppingsContentContainer.append(table);
    $.ajax({
        url: "http://localhost:8080/api/toppings",
        type: "GET",
        success: toppings => {
            console.log(toppings)
            toppings.forEach(topping => {
                const tr = $('<tr>');
                tr.append($('<td>')).text(topping._id)
                tr.append($('<td>').text(topping.name))
                tr.append($('<td>').text(topping.price))
                tbody.append(tr);
            })
        }
    })
})