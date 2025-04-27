document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // prevent form from reloading the page
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');
  
    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  
    // Validate inputs
    if (!name || !email || !password) {
      messageDiv.textContent = 'Please fill in all fields.';
      messageDiv.classList.add('error');
      return;
    }
  
    try {
      const response = await fetch('https://mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        // Assuming API gives a readable error message in the response body
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }
  
      const data = await response.json();
  
      messageDiv.textContent = 'Registration successful! Welcome, ' + data.name;
      messageDiv.classList.add('success');
  
      // Optionally, reset the form
      document.getElementById('registrationForm').reset();
  
    } catch (error) {
      console.error(error);
      messageDiv.textContent = error.message || 'Something went wrong!';
      messageDiv.classList.add('error');
    }
  });
  