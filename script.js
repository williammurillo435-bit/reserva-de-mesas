const availableTables = [
    { number: 1, reserved: false },
    { number: 2, reserved: false },
    { number: 3, reserved: false },
    { number: 4, reserved: false },
    { number: 5, reserved: false },
    { number: 6, reserved: false },
    { number: 7, reserved: false },
    { number: 8, reserved: false },
    { number: 9, reserved: false },
    { number: 10, reserved: false },
    { number: 11, reserved: false },
    { number: 12, reserved: false },
];

const occupiedTables = [];

document.addEventListener('DOMContentLoaded', () => {
    renderTables();
    document.getElementById('reserverButton').addEventListener('click', reserveTable);
    document.getElementById('ReportButton').addEventListener('click', generateReport);
});

function renderTables() {
    const availableTablesDiv = document.getElementById('availableTables');
    const occupiedTablesDiv = document.getElementById('occupiedTables');

    availableTablesDiv.innerHTML = '';
    occupiedTablesDiv.innerHTML = '';

    availableTables.forEach(table => {
        const tableDiv = document.createElement('div');
        tableDiv.className = 'table';
        tableDiv.innerHTML = `<img src="miImagen.jpg" alt="Mesa ${table.number}"><div class="table-name">Mesa ${table.number}</div>`;

        const reserverButton = document.createElement('button');
        reserverButton.className = 'button';
        reserverButton.textContent = 'Reservar';
        reserverButton.onclick = () => reserveTableByNumber(table.number);
        tableDiv.appendChild(reserverButton);

        availableTablesDiv.appendChild(tableDiv);
    });

    occupiedTables.forEach(table => {
        const tableDiv = document.createElement('div');
        tableDiv.className = 'table';
        tableDiv.innerHTML = `<img src="miImagen.jpg" alt="Mesa ${table.number}">
            <div class="table-name">Mesa ${table.number}</div>
            <div>Fecha: ${table.date}</div>
            <div>Hora: ${table.time}</div>
            <div>Cliente: ${table.customer}</div>`;

        const releaseButton = document.createElement('button');
        releaseButton.className = 'button';
        releaseButton.textContent = 'Eliminar Reserva';
        releaseButton.onclick = () => releaseTable(table.number, table.date, table.time);
        tableDiv.appendChild(releaseButton);

        occupiedTablesDiv.appendChild(tableDiv);
    });
}

function reserveTable() {
    const customerName = document.getElementById('customerName').value.trim();
    const tableNumber = parseInt(document.getElementById('numeroMesa').value);
    const date = document.getElementById('fecha').value;
    const time = document.getElementById('hora').value;

    if (!customerName || isNaN(tableNumber) || tableNumber < 1 || tableNumber > availableTables.length || !date || !time) {
        alert('Por favor ingresa todos los datos correctamente.');
        return;
    }

    const existing = occupiedTables.find(t => t.number === tableNumber && t.date === date && t.time === time);

    if (existing) {
        alert('Ya hay una reserva para esa mesa en esa fecha y hora.');
        return;
    }

    occupiedTables.push({
        number: tableNumber,
        customer: customerName,
        date: date,
        time: time
    });

    renderTables();
    document.getElementById('customerName').value = '';
    document.getElementById('numeroMesa').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    }

function reserveTableByNumber(tableNumber) {
    const customerName = prompt(`¿Quién desea reservar la mesa ${tableNumber}?`);
    const date = prompt("¿Qué fecha? (Formato: AAAA-MM-DD)");
    const time = prompt("¿A qué hora? (Formato: HH:MM)");

    if (customerName && customerName.trim() !== '' && date && time) {
        const existing = occupiedTables.find(t => t.number === tableNumber && t.date === date && t.time === time);

        if (existing) {
            alert('Ya hay una reserva para esa mesa en esa fecha y hora.');
        } else {
            occupiedTables.push({
                number: tableNumber,
                customer: customerName.trim(),
                date: date,
                time: time
            });
            renderTables();
        }
    } else {
        alert("Datos inválidos.");
    }
}

function releaseTable(tableNumber) {
    const index = occupiedTables.findIndex(t => t.number === tableNumber);
    if (index !== -1) {
        const table = occupiedTables[index];
        availableTables.find(t => t.number === table.number).reserved = false;
        occupiedTables.splice(index, 1);
        renderTables();
    }
}

function generateReport() {
    const reportOutput = document.getElementById('ReportOutput');
    reportOutput.textContent = 'Reporte de Reservas Actuales:\n\n';

    occupiedTables.forEach(table => {
        reportOutput.textContent += `Mesa ${table.number} - Reservada por ${table.customer} el día ${table.date} a las ${table.time}\n`;
    });

    if (occupiedTables.length === 0) {
        reportOutput.textContent += 'No hay reservas actuales.';
    }
}