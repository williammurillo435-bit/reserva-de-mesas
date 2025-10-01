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
    document.getElementById('reserveButton').addEventListener('click', reserveTable);
    document.getElementById('reportButton').addEventListener('click', generateReport);
});

function renderTables(){
    const availableTablesDiv = document.getElementById('availableTables');
    const occupiedTablesDiv = document.getElementById('occupiedTables');

    availableTablesDiv.innerHTML = '';
    occupiedTablesDiv.innerHTML = '';

    availableTables.forEach(table => {
        const tableDiv  = document.createElement('div');
        tableDiv.className = 'table';
        tableDiv.innerHTML = `<img src="miImagen.jpg" alt="Mesa ${table.number}"><div class="table-name">Mesa ${table.number}</div>`;

        if(!table.reserved){
            const reserveButton = document.createElement('button');
            reserveButton.className = 'button';
            reserveButton.textContent = 'Reservar';
            reserveButton.onclick = () => reserveTableByNumber(table.number);
            tableDiv.appendChild(reserveButton);
        }
        availableTablesDiv.appendChild(tableDiv);
    });

    occupiedTables.forEach(table => { 
        const tableDiv  = document.createElement('div');
        tableDiv.className = 'table';
        tableDiv.innerHTML = `<img src="miImagen.jpg" alt="Mesa ${table.number}"><div class="table-name">Mesa ${table.number}</div>`;
        const releaseButton = document.createElement('button');
        releaseButton.className = 'button';
        releaseButton.textContent = 'Liberar';
        releaseButton.onclick = () => releaseTable(table.number);
        tableDiv.appendChild(releaseButton);
        occupiedTablesDiv.appendChild(tableDiv);
    });
}

function reserveTable(){
    const customerName = document.getElementById('customerName').value.trim();
    const tableNumber = parseInt(document.getElementById('tableNumber').value);

    if(!customerName || isNaN(tableNumber) || tableNumber < 1 || tableNumber > availableTables.length){

        alert('Por favor, ingrese un nombre válido y un número de mesa válido.');
        return;
    }
    const table = availableTables.find(t => t.number === tableNumber);
    if(table && !table.reserved){
        table.reserved = true;
        occupiedTables.push({ number: table.number, customer: customerName });
        renderTables();
        document.getElementById('customerName').value = '';
        document.getElementById('tableNumber').value = '';
    
    }else{
        alert('La mesa ya está reservada o no existe');
    }
}

function reserveTableByNumber(tableNumber){
    const customerName = document.getElementById('customerName').value.trim();

    if(!customerName){
        alert('Por favor, ingrese un nombre válido');
        return;
    }

    const table = availableTables.find(t => t.number === tableNumber);
    if(table && !table.reserved){
        table.reserved = true;
        occupiedTables.push({ number: table.number, customer: customerName });
        renderTables();
        document.getElementById('customerName').value = '';
    }else{
        alert('La mesa ya está reservada o no existe');
    }
}

function releaseTable(tableNumber){
    const index = occupiedTables.findIndex(t => t.number === tableNumber);
    if(index !== -1){
        const table = occupiedTables[index];
        availableTables.find(t => t.number === table.number).reserved = false;
        occupiedTables.splice(index, 1);
        renderTables();
    }
}

function generateReport(){
    const reportOutput = document.getElementById('reportOutput');
    reportOutput.textContent = 'reporte de Reservas:\n\n';

    occupiedTables.forEach(table => {
        reportOutput.textContent += `Mesa ${table.number} - Reservada por: ${table.customer}\n`;
    });

    if(occupiedTables.length === 0){
        reportOutput.textContent += 'No hay reservas actuales.';
    }
}
renderTables();
