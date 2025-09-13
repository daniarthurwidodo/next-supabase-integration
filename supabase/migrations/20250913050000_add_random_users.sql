-- Temporarily disable the trigger to prevent it from overriding our data
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create 50 auth users and corresponding public users
DO $$
DECLARE
  user_data RECORD;
  users_data text := '
    [
      {"name": "Alice Johnson", "email": "alice.johnson@example.com", "seed": "alice"},
      {"name": "Bob Smith", "email": "bob.smith@example.com", "seed": "bob"},
      {"name": "Carol Williams", "email": "carol.williams@example.com", "seed": "carol"},
      {"name": "David Brown", "email": "david.brown@example.com", "seed": "david"},
      {"name": "Emma Davis", "email": "emma.davis@example.com", "seed": "emma"},
      {"name": "Frank Miller", "email": "frank.miller@example.com", "seed": "frank"},
      {"name": "Grace Wilson", "email": "grace.wilson@example.com", "seed": "grace"},
      {"name": "Henry Moore", "email": "henry.moore@example.com", "seed": "henry"},
      {"name": "Isabella Taylor", "email": "isabella.taylor@example.com", "seed": "isabella"},
      {"name": "Jack Anderson", "email": "jack.anderson@example.com", "seed": "jack"},
      {"name": "Katherine Thomas", "email": "katherine.thomas@example.com", "seed": "katherine"},
      {"name": "Liam Jackson", "email": "liam.jackson@example.com", "seed": "liam"},
      {"name": "Maya White", "email": "maya.white@example.com", "seed": "maya"},
      {"name": "Noah Harris", "email": "noah.harris@example.com", "seed": "noah"},
      {"name": "Olivia Martin", "email": "olivia.martin@example.com", "seed": "olivia"},
      {"name": "Peter Thompson", "email": "peter.thompson@example.com", "seed": "peter"},
      {"name": "Quinn Garcia", "email": "quinn.garcia@example.com", "seed": "quinn"},
      {"name": "Rachel Martinez", "email": "rachel.martinez@example.com", "seed": "rachel"},
      {"name": "Samuel Robinson", "email": "samuel.robinson@example.com", "seed": "samuel"},
      {"name": "Tessa Clark", "email": "tessa.clark@example.com", "seed": "tessa"},
      {"name": "Ulysses Rodriguez", "email": "ulysses.rodriguez@example.com", "seed": "ulysses"},
      {"name": "Victoria Lewis", "email": "victoria.lewis@example.com", "seed": "victoria"},
      {"name": "William Lee", "email": "william.lee@example.com", "seed": "william"},
      {"name": "Ximena Walker", "email": "ximena.walker@example.com", "seed": "ximena"},
      {"name": "Yuki Hall", "email": "yuki.hall@example.com", "seed": "yuki"},
      {"name": "Zara Allen", "email": "zara.allen@example.com", "seed": "zara"},
      {"name": "Aaron Young", "email": "aaron.young@example.com", "seed": "aaron"},
      {"name": "Bella King", "email": "bella.king@example.com", "seed": "bella"},
      {"name": "Cameron Wright", "email": "cameron.wright@example.com", "seed": "cameron"},
      {"name": "Diana Lopez", "email": "diana.lopez@example.com", "seed": "diana"},
      {"name": "Ethan Hill", "email": "ethan.hill@example.com", "seed": "ethan"},
      {"name": "Fiona Scott", "email": "fiona.scott@example.com", "seed": "fiona"},
      {"name": "Gabriel Green", "email": "gabriel.green@example.com", "seed": "gabriel"},
      {"name": "Hannah Adams", "email": "hannah.adams@example.com", "seed": "hannah"},
      {"name": "Ian Baker", "email": "ian.baker@example.com", "seed": "ian"},
      {"name": "Julia Gonzalez", "email": "julia.gonzalez@example.com", "seed": "julia"},
      {"name": "Kevin Nelson", "email": "kevin.nelson@example.com", "seed": "kevin"},
      {"name": "Luna Carter", "email": "luna.carter@example.com", "seed": "luna"},
      {"name": "Marcus Mitchell", "email": "marcus.mitchell@example.com", "seed": "marcus"},
      {"name": "Nora Perez", "email": "nora.perez@example.com", "seed": "nora"},
      {"name": "Oscar Roberts", "email": "oscar.roberts@example.com", "seed": "oscar"},
      {"name": "Penelope Turner", "email": "penelope.turner@example.com", "seed": "penelope"},
      {"name": "Quincy Phillips", "email": "quincy.phillips@example.com", "seed": "quincy"},
      {"name": "Ruby Campbell", "email": "ruby.campbell@example.com", "seed": "ruby"},
      {"name": "Sebastian Parker", "email": "sebastian.parker@example.com", "seed": "sebastian"},
      {"name": "Thea Evans", "email": "thea.evans@example.com", "seed": "thea"},
      {"name": "Uriel Edwards", "email": "uriel.edwards@example.com", "seed": "uriel"},
      {"name": "Violet Collins", "email": "violet.collins@example.com", "seed": "violet"},
      {"name": "Wesley Stewart", "email": "wesley.stewart@example.com", "seed": "wesley"},
      {"name": "Xandra Sanchez", "email": "xandra.sanchez@example.com", "seed": "xandra"}
    ]
  ';
  user_uuid uuid;
BEGIN
  -- Loop through each user in the JSON data
  FOR user_data IN
    SELECT * FROM json_populate_recordset(null::record, users_data::json) AS (name text, email text, seed text)
  LOOP
    -- Generate a unique UUID for this user
    user_uuid := gen_random_uuid();
    
    -- Create auth user first
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
    ) VALUES (
      user_uuid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      user_data.email,
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
    
    -- Then create public user with proper data
    INSERT INTO users (id, full_name, email, avatar_url) VALUES (
      user_uuid,
      user_data.name,
      user_data.email,
      'https://api.dicebear.com/7.x/avataaars/svg?seed=' || user_data.seed
    )
    ON CONFLICT (id) DO NOTHING;
  END LOOP;
END $$;

-- Re-enable the trigger for future auth user creations
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();