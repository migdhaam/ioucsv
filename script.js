function addIOU() {
    const item = document.getElementById('item').value;
    const total = document.getElementById('total').value;
    const currency = document.getElementById('currency').value;
    const date = document.getElementById('date').value;

    if (item && total && date) {
        const tableBody = document.getElementById('iouBody');
        const newRow = document.createElement('tr');

        const itemCell = document.createElement('td');
        itemCell.textContent = item;
        newRow.appendChild(itemCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = total;
        newRow.appendChild(totalCell);

        const currencyCell = document.createElement('td');
        currencyCell.textContent = currency;
        newRow.appendChild(currencyCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        newRow.appendChild(dateCell);

        tableBody.appendChild(newRow);

        updateTotalIOU();
        clearFields();
    }
}

function updateTotalIOU() {
    let totalMvrIou = 0;
    let totalUsdIou = 0;

    const rows = document.querySelectorAll('#iouBody tr');

    rows.forEach(row => {
        const currency = row.querySelector('td:nth-child(3)').textContent;
        const total = parseFloat(row.querySelector('td:nth-child(2)').textContent);

        if (currency === 'MVR') {
            totalMvrIou += total;
        } else if (currency === 'USD') {
            totalUsdIou += total;
        }
    });

    document.getElementById('totalMvrIou').textContent = totalMvrIou.toFixed(2);
    document.getElementById('totalUsdIou').textContent = totalUsdIou.toFixed(2);
}

function clearFields() {
    document.getElementById('item').value = '';
    document.getElementById('total').value = '';
    document.getElementById('currency').value = 'MVR';
    document.getElementById('date').value = '';
}

function clearIOUs() {
    const tableBody = document.getElementById('iouBody');
    tableBody.innerHTML = '';
    updateTotalIOU();
}

function exportCSV() {
    const rows = document.querySelectorAll('#iouBody tr');
    const csvContent = [];

    // Header row
    csvContent.push('Item,Total,Currency,Date');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [
            cells[0].textContent,
            cells[1].textContent,
            cells[2].textContent,
            cells[3].textContent
        ];
        csvContent.push(rowData.join(','));
    });

    // Add total MVR and USD IOU to CSV content
    csvContent.push(`\nTotal MVR IOU:,,${document.getElementById('totalMvrIou').textContent},`);
    csvContent.push(`Total USD IOU:,,${document.getElementById('totalUsdIou').textContent},`);

    // Create CSV content
    const csvString = csvContent.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iou_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
