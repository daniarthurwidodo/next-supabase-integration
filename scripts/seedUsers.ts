import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for admin access
// Using the local Supabase configuration
const supabase = createClient(
  'http://127.0.0.1:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
);

// Function to generate random names
function generateRandomName(): string {
  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
    'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
    'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra',
    'Donald', 'Donna', 'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
    'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah', 'Timothy', 'Dorothy'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
  ];
  
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${randomFirstName} ${randomLastName}`;
}

// Function to generate random email
function generateRandomEmail(name: string): string {
  const domains = ['example.com', 'mail.com', 'test.org', 'demo.net', 'sample.io'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const namePart = name.toLowerCase().replace(/\s+/g, '.');
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${namePart}.${randomNumber}@${randomDomain}`;
}

export async function seedUsers(count: number = 50) {
  console.log(`Seeding ${count} random users...`);
  
  const results = [];
  
  // Create users in batches to avoid overwhelming the server
  for (let i = 0; i < count; i++) {
    try {
      const fullName = generateRandomName();
      const email = generateRandomEmail(fullName);
      const password = 'Password123!'; // Default password for all random users
      
      // Sign up the user
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName
        }
      });

      if (error) {
        // If user already exists, that's okay - we'll skip it
        if (error.code === 'email_exists') {
          console.log(`User ${email} already exists, skipping...`);
          results.push({ email: email, success: false, error: 'User already exists' });
        } else {
          console.error(`Error creating user ${email}:`, error.message);
          results.push({ email: email, success: false, error: error.message });
        }
      } else {
        console.log(`Successfully created user ${email}`);
        results.push({ email: email, success: true, data });
      }
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (err) {
      console.error(`Unexpected error creating user:`, err.message);
      results.push({ email: `user-${i}`, success: false, error: err.message });
    }
  }
  
  // Count successful creations
  const successfulCreations = results.filter(r => r.success).length;
  console.log(`\nSeeding complete. Successfully created ${successfulCreations} out of ${count} users.`);
  
  return results;
}

// If running directly (not imported), execute the seed function
if (require.main === module) {
  const args = process.argv.slice(2);
  const count = args.length > 0 ? parseInt(args[0], 10) : 50;
  
  seedUsers(count)
    .then(results => {
      console.log('Seeding process completed.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}