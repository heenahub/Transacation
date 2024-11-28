document.getElementById('transaction-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Get form values
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const message = document.getElementById('message').value;
  
    // Basic validation
    if (!sender || !receiver || isNaN(amount) || amount <= 0) {
      alert('Please fill out all fields with valid values.');
      return;
    }
  
    // Simulate transaction processing
    simulateTransaction(sender, receiver, amount, message);
  });
  
  function simulateTransaction(sender, receiver, amount, message) {
    // Simulating a delay for processing the transaction
    setTimeout(() => {
      const responseMessage = `Transaction Successful!<br>From: ${sender}<br>To: ${receiver}<br>Amount: $${amount.toFixed(2)}<br>Message: ${message || 'No message'}`;
      
      // Display response message
      document.getElementById('response-message').innerHTML = responseMessage;
    }, 2000); // 2-second delay to simulate processing time
  }
  