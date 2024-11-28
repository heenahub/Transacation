let currentPage = 1;
let totalPages = 1;

function fetchData() {
    const month = document.getElementById("month").value;
    const search = document.getElementById("search").value;
    
    // Fetch transactions data
    fetch(`/api/transactions?month=${month}&page=${currentPage}&search=${search}`)
        .then(response => response.json())
        .then(data => {
            // Update the transaction table
            const tableBody = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            data.transactions.forEach(transaction => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${transaction.id}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.price}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.dateOfSale}</td>
                `;
            });

            // Update pagination
            totalPages = data.totalPages;
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = currentPage === totalPages;
        });

    // Fetch statistics data
    fetch(`/api/statistics?month=${month}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalSoldItems').textContent = data.totalSoldItems;
            document.getElementById('totalAmount').textContent = data.totalAmount;
            document.getElementById('totalNotSoldItems').textContent = data.totalNotSoldItems;
        });

    // Fetch price range data for the bar chart
    fetch(`/api/price-range?month=${month}`)
        .then(response => response.json())
        .then(data => {
            const chartData = {
                labels: ['101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
                datasets: [{
                    label: 'Number of Items',
                    data: [
                        data['101-200'], data['201-300'], data['301-400'], data['401-500'],
                        data['501-600'], data['601-700'], data['701-800'], data['801-900'], data['901-above']
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };
            
            const ctx = document.getElementById('priceRangeChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        });
}

function changePage(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    fetchData();
}

// Initialize data on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
