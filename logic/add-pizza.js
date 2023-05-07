$addItemContentContainer = $(".add_item_content_container");
$addItemsButton = $('#add_items')
$showItemsButton = $('#show_items')
$deleteItemsButton = $('#delete_items')
$editItemsButton = $('#update_items')

$addItemsButton.on('click', () => {
    $addItemContentContainer.empty();
    $addItemContentContainer.load('../views/admin-templates/add-item-form.html');
})

$showItemsButton.on('click', () => {
    $addItemContentContainer.empty();
    console.log($addItemContentContainer)
    const table = $('<table>')
    const thead = $('<thead>')
    const headers = ['Название', 'Ингредиенты', 'Цена', 'Вес', 'Тип'];
    headers.forEach(header => {
        thead.append($('<th>').text(header))
    })
    console.log(thead.get(0));
    table.append(thead);
    const tbody = $('<tbody>');
    table.append(tbody);
    $addItemContentContainer.append(table);
    $.ajax({
        url: "http://localhost:8080/api/pizza",
        type: "GET",
        success: items => {
            items.forEach(item => {
                const tr = $('<tr>');
                tr.attr('data-id', item._id)
                tr.append($('<td>').text(item.name))
                tr.append($('<td>').text(item.ingredients))
                tr.append($('<td>').text(
                    [item.configuration.small.price, item.configuration.medium.price, item.configuration.large.price]
                        .join(" - ")
                ))
                tr.append($('<td>').text(
                    [item.configuration.small.weight, item.configuration.medium.weight, item.configuration.large.weight]
                        .join(" - ")
                ))
                tr.append($('<td>').text(item.itemType))
                tbody.append(tr);
            })
        }
    })
})

$deleteItemsButton.on('click', () => {
    $addItemContentContainer.empty();
    $addItemContentContainer.load('../views/admin-templates/delete-item-form.html');
})

$editItemsButton.on('click', () => {
    $addItemContentContainer.empty();
    $addItemContentContainer.load('../views/admin-templates/update-item-form.html')
})