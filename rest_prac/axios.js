async function fetchItems() {
    try {
        const response = await axios.get('api.php');
        const items = response.data;
        const itemList = document.getElementById('item-list');

        itemList.innerHTML = '';
        items.forEach(item => {
            const row = itemList.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = item.id;
            cell2.textContent = item.name;
            cell3.textContent = item.description;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => handleDeleteButtonClick(item.id));
            cell4.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function handleAddItemFormSubmit(event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;

    try {
        await axios.post('api.php', { name: itemName, description: itemDescription });

        fetchItems();

        alert('Item added successfully!');
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

async function handleUpdateItemFormSubmit(event) {
    event.preventDefault();

    const itemId = document.getElementById('updateItemId').value;
    const itemName = document.getElementById('updateItemName').value;
    const itemDescription = document.getElementById('updateItemDescription').value;

    try {
        await axios.put(`api.php?id=${itemId}`, { name: itemName, description: itemDescription });

        fetchItems();

        alert('Item updated successfully!');
    } catch (error) {
        console.error('Error updating item:', error);
    }
}


async function handleDeleteButtonClick(itemId) {
    const isConfirmed = confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
        try {
            await axios.delete(`api.php?id=${itemId}`);

            fetchItems();

            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
}

fetchItems();

document.getElementById('addItemForm').addEventListener('submit', handleAddItemFormSubmit);
document.getElementById('updateItemForm').addEventListener('submit', handleUpdateItemFormSubmit);

const myTabs = new bootstrap.Tab(document.getElementById('listTab'));
myTabs.show();