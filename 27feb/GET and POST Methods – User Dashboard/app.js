const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');
const messageDiv = document.getElementById('message');

const apiURL = 'https://mockapi.io/users'; // Replace with your real Mock API endpoint

// Fetch and display all users
async function fetchUsers() {
  userList.innerHTML = 'Loading users...';
  try {
    const response = await fetch(apiURL);
    const users = await response.json();

    if (users.length === 0) {
      userList.innerHTML = '<p>No users found.</p>';
      return;
    }

    userList.innerHTML = '';
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
      userList.appendChild(userDiv);
    });
  } catch (error) {
    console.error(error);
    userList.innerHTML = '<p class="error">Failed to load users.</p>';
  }
}

// Handle form submission
userForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  messageDiv.textContent = '';
  messageDiv.className = 'message';

  if (!name || !email) {
    messageDiv.textContent = 'Please fill all fields.';
    messageDiv.classList.add('error');
    return;
  }

  try {
    // First, check if email already exists
    const existingUsersResponse = await fetch(apiURL);
    const existingUsers = await existingUsersResponse.json();
    const emailExists = existingUsers.some(user => user.email === email);

    if (emailExists) {
      messageDiv.textContent = 'Email already exists. Please use a different one.';
      messageDiv.classList.add('error');
      return;
    }

    // If email is unique, add the new user
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) {
      throw new Error('Failed to add user.');
    }

    const newUser = await response.json();

    messageDiv.textContent = 'User added successfully!';
    messageDiv.classList.add('success');

    // Clear form
    userForm.reset();

    // Update user list dynamically
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = `<strong>${newUser.name}</strong><br>${newUser.email}`;
    userList.appendChild(userDiv);

  } catch (error) {
    console.error(error);
    messageDiv.textContent = error.message || 'Something went wrong!';
    messageDiv.classList.add('error');
  }
});

// Initial fetch
fetchUsers();
