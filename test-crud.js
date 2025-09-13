const API_BASE_URL = 'http://localhost:3000/api';

async function testCRUDOperations() {
  console.log('Testing CRUD operations...\n');

  // Test 1: Create a user
  console.log('1. Creating a user...');
  const createUserResponse = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: 'Test User',
      email: 'test@example.com',
    }),
  });

  const createdUser = await createUserResponse.json();
  console.log('Created user:', createdUser);

  if (!createUserResponse.ok) {
    console.log('Failed to create user');
    return;
  }

  const userId = createdUser.id;
  console.log('User ID:', userId);

  // Test 2: Get all users
  console.log('\n2. Getting all users...');
  const getAllUsersResponse = await fetch(`${API_BASE_URL}/users`);
  const allUsers = await getAllUsersResponse.json();
  console.log('All users count:', allUsers.total);

  // Test 3: Get user by ID
  console.log('\n3. Getting user by ID...');
  const getUserResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
  const user = await getUserResponse.json();
  console.log('User:', user);

  // Test 4: Update user
  console.log('\n4. Updating user...');
  const updateUserResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: 'Updated Test User',
      avatar_url: 'https://example.com/avatar.jpg',
    }),
  });

  const updatedUser = await updateUserResponse.json();
  console.log('Updated user:', updatedUser);

  // Test 5: Delete user
  console.log('\n5. Deleting user...');
  const deleteUserResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  const deleteResult = await deleteUserResponse.json();
  console.log('Delete result:', deleteResult);

  console.log('\nCRUD operations test completed!');
}

testCRUDOperations().catch(console.error);