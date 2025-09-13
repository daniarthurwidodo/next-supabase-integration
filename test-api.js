const { createClient } = require('@supabase/supabase-js');

async function testApiEndpoint() {
  try {
    // Test the API endpoint directly
    const response = await fetch('http://localhost:3000/api/users?page=1&limit=10');
    const data = await response.json();
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing API endpoint:', error);
  }
}

testApiEndpoint();