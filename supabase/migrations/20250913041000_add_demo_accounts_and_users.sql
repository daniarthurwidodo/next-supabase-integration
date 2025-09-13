-- Temporarily disable the trigger to prevent it from overriding our data
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create auth users for admin demo accounts first
INSERT INTO auth.users (
  id, 
  instance_id, 
  aud, 
  role, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  created_at, 
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin1@example.com',
    crypt('demopassword123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin2@example.com',
    crypt('demopassword123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
ON CONFLICT (id) DO NOTHING;

-- Add public users records with proper names and avatars
INSERT INTO users (id, full_name, email, avatar_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Admin User 1', 'admin1@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1'),
  ('22222222-2222-2222-2222-222222222222', 'Admin User 2', 'admin2@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin2')
ON CONFLICT (id) DO NOTHING;

-- Re-enable the trigger for future auth user creations
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Since users table requires foreign key to auth.users, we'll skip the display-only users for now
-- The two admin accounts above are sufficient for demonstration